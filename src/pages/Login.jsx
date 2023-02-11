import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUser } from '../redux/actions';
import img from '../images/logo.png';
import '../styles/Login.css';

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
      <div className="login">
        <img src={ img } alt="logo" className="logo " />

        <form action="" className="container-login">
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            name="email"
            placeholder="E-mail"
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ senha }
            name="senha"
            placeholder="Senha"
          />
          <button
            onClick={ this.handleClick }
            disabled={ disableBtn }
            className={ disableBtn ? 'disableBtn' : 'enableBtn' }
          >
            Entrar

          </button>
        </form>
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
