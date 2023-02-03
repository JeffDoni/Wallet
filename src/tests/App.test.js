import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '123456';
// const INVALID_EMAIL = 'invalid-email';
// const INVALID_PASSWORD = '12345';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('tests for App component', () => {
  it('Ir do componente Login para o componente Wallet quando clicado no botão enter', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(history.location.pathname).toBe('/carteira');
  });

  it('O componente Wallet faz uma requisição para a API que retorna um array com as moedas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    const url = 'https://economia.awesomeapi.com.br/json/all';

    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  });
});
