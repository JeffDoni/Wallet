export const USER = 'USER';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const DELETE = 'DELETE';
export const EDITE = 'EDITE';
export const EDITESUMBIT = ' EDITESUBMIT';

export const actionUser = (email) => (
  {
    type: USER,
    payload: email,
  }
);

// export const requestAPI = () => ({ type: REQUEST_API });
export const addExpenses = (value) => ({ type: ADD_EXPENSES, payload: value });

export const editExpenses = (list) => ({ type: EDITE, payload: list });
export const submitEdit = (id) => ({ type: EDITESUMBIT, payload: id });

export const getCurrencies = (data) => ({ type: WALLET_CURRENCIES, payload: data });

export const submitForm = (obj) => ({
  type: SUBMIT_FORM,
  payload: obj,
});

export const deleteExpense = (param) => ({
  type: DELETE,
  payload: param,
});
export const requestAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};

export function fetchAPI() {
  return async (dispatch) => {
    try {
    //   dispatch(requestAPI());
      const data = await requestAPI();
      dispatch(getCurrencies(data));
    } catch (error) {
      console.log(error);
    }
  };
}
