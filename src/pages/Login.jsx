import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    disableBtn: true,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validation);
  };

  validation = () => {
    const { email, senha } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const limit = 6;
    const password = senha.length >= limit;
    this.setState({
      disableBtn: !(regexEmail.test(email) && password),
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    return dispatch(actionUser(email));
  };

  render() {
    const { email, senha, disableBtn } = this.state;

    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
          name="email"
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ senha }
          name="senha"
        />
        <button
          onClick={ this.handleClick }
          disabled={ disableBtn }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
