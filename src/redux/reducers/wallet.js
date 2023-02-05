import { WALLET_CURRENCIES, SUBMIT_FORM, DELETE, EDITE, EDITESUMBIT } from '../actions';

const STATE_INICIAL = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  edit: {},
  total: 0,
  toEdit: false,

};

function user(state = STATE_INICIAL, action) {
  switch (action.type) {
  case WALLET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),

    };
  case SUBMIT_FORM:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE:
    return { ...state, expenses: action.payload };
  case EDITE:
    return { ...state, idToEdit: action.payload, editor: true };
  case EDITESUMBIT:
    return {
      ...state,
      expenses: state.expenses.reduce((acc, curr) => {
        if ((curr.id === state.idToEdit)) {
          return [...acc, { ...curr, ...action.payload.obj }];
        }
        return [...acc, curr];
      }, []),
      // expenses: state.expenses
      //   .map((e) => {
      //     if (e.id === state.idToEdit) {
      //       return { ...e, ...action.payload.obj };
      //     } return e;
      //   }),

      editor: false,

    };

  default:
    return state;
  }
}

export default user;
