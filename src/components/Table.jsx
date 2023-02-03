import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleClick = (param) => {
    const { dispatch, expenses } = this.props;
    const deleteId = expenses.filter((e) => Number(e.id) !== Number(param));
    dispatch(deleteExpense(deleteId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>

              <th>Tag</th>

              <th>Método de pagamento</th>

              <th>Valor</th>

              <th>Moeda</th>

              <th>Câmbio utilizado</th>

              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}

                </td>
                <td>Real</td>
                <td>
                  <button
                    onClick={ () => this.handleClick(expense.id) }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir

                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
