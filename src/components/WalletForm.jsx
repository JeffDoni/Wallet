import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, requestAPI, submitEdit, submitForm } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  editeForm = async () => {
    const { dispatch } = this.props;
    console.log('oi');
    const { value, currency, method, tag, description } = this.state;
    const obj = {
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(submitEdit({ obj }));
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;

    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const exchangeRates = await requestAPI();
    const obj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(submitForm(obj));
  };

  handleExpense = () => {
    const { editor } = this.props;
    if (editor) {
      return this.editeForm();
    }
    return this.handleClick();
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valor">
            {' '}
            Valor
            <input
              type="text"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((e, index) => (
              <option value={ e } key={ index }>{e}</option>
            ))}
          </select>
          <select
            name="method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >

            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            id="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          onClick={ this.handleExpense }
          type="button"
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa'}

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
  currencies: state.wallet.currencies,
  expenses: {
    value: state.wallet.expenses.value,
    currency: state.wallet.expenses.currency,
    method: state.wallet.currencies.method,
    tag: state.wallet.expenses.tag,
    description: state.wallet.expenses.description,
  },

});

WalletForm.propTypes = {
  editor: PropTypes.bool.isRequired,
  currencies: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
