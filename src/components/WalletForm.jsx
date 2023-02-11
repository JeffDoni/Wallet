import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenses, fetchAPI, requestAPI, submitForm } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    id: 0,
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  componentDidUpdate() {
    const { edit, editor } = this.props;
    const { id } = this.state;
    if (editor && id !== edit.id) {
      this.setState({
        id: edit.id,
        value: edit.value,
        description: edit.description,
        currency: edit.currency,
        method: edit.method,
        tag: edit.tag,
        exchangeRates: edit.exchangeRates,
      });
    }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  addExpense = async () => {
    const { dispatch, expenses } = this.props;
    const elements = await requestAPI();
    this.setState({
      id: expenses.length,
      exchangeRates: elements,
    }, () => {
      dispatch(submitForm(this.state));
      const inicialState = {
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        id: 0,
      };
      this.setState({ ...inicialState });
    });
  };

  editExpense = async () => {
    const { dispatch, idToEdit } = this.props;
    const elements = await requestAPI();
    this.setState({
      id: idToEdit,
      exchangeRates: elements,
    }, () => dispatch(editExpenses(this.state)));
  };

  handleExpense = async () => {
    const { editor } = this.props;
    if (editor) {
      this.editExpense();
      return;
    }
    this.addExpense();
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div className="wallet-form">
        <form>
          <label htmlFor="description">
            {' '}
            Descrição da despesa

            <input
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="tag">
            {' '}
            Categoria da despesa
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
          </label>
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
          <label htmlFor="currency">
            {' '}
            Moeda
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
          </label>

          <label htmlFor="method">
            Metódo de pagamento
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
          </label>
        </form>

        <button
          onClick={ this.handleExpense }
          type="button"
          className="container-button"

        >
          { editor === true ? 'Editar despesas' : 'Adicionar despesas'}

        </button>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  expenses: PropTypes.shape({
    length: PropTypes.number,
  }),
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
  edit: state.wallet.edit,

});

export default connect(mapStateToProps)(WalletForm);
