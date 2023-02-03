import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '123456';
const INVALID_EMAIL = 'invalid-email';
const INVALID_PASSWORD = '12345';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Teste o Login', () => {
  it('Teste se existe um input para email e senha e um botao para acessar', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByText(/email/i);
    const senha = screen.getByText(/senha/i);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  it('O botão inicia desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();
  });
  it('o botão enviar só é ativado quando o e-mail e as senhas são válidos', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByText(/email/i);
    const password = screen.getByText(/senha/i);
    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(password, INVALID_PASSWORD);
    expect(btn).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT));
    userEvent.clear(screen.getByTestId(PASSWORD_INPUT));

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
  });
  it('O e-mail inserido na página Login aparece na página Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText(VALID_EMAIL)).toBeInTheDocument();
  });
});
