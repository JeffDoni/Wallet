import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';

class Header extends Component {
  state = {
    total: 0.00,
  };

  calculate = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((sum, { value, currency, exchangeRates }) => {
        const { ask } = exchangeRates[currency];
        return sum + Number(value) * Number(ask);
      }, 0);
    }
  };

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <header>
        <img src={ logo } alt="logo-header" />
        <div className="moeda">
          <span>Total de despesas:</span>
          <span
            data-testid="total-field"
          >
            {this.calculate() ? this.calculate().toFixed(2) : total.toFixed(2)}

          </span>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <p data-testid="email-field">{email}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
