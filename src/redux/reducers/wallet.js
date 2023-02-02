import { WALLET_CURRENCIES } from '../actions';

const STATE_INICIAL = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,

};

function user(state = STATE_INICIAL, action) {
  switch (action.type) {
  case WALLET_CURRENCIES:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),

    };

  default:
    return state;
  }
}

export default user;
