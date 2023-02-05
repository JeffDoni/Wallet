import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpenses } from '../redux/actions';

class Table extends Component {
  handleClick = (param) => {
    const { dispatch, expenses } = this.props;
    const deleteId = expenses.filter((e) => Number(e.id) !== Number(param));
    dispatch(deleteExpense(deleteId));
  };

  handleEdite = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
    console.log(id);
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

          { expenses && expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr>
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
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdite(expense.id) }
                    type="button"
                  >
                    Editar

                  </button>
                  <button
                    onClick={ () => this.handleClick(expense.id) }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir

                  </button>
                </td>

              </tr>
            </tbody>
          ))}

        </table>
      </div>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf,
  dispatch: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
