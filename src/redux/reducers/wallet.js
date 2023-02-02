import { WALLET_CURRENCIES, ADD_EXPENSES, SUBMIT_FORM } from '../actions';

const STATE_INICIAL = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  total: 0,

};

function user(state = STATE_INICIAL, action) {
  switch (action.type) {
  case WALLET_CURRENCIES:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),

    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],

    };
  case SUBMIT_FORM:
    return { ...state, expenses: [...state.expenses, action.payload] };

  default:
    return state;
  }
}

export default user;
