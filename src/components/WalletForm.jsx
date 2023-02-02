import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select name="" id="" data-testid="currency-input">
          {currencies.map((e, index) => (
            <option value={ e } key={ index }>{e}</option>
          ))}
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
