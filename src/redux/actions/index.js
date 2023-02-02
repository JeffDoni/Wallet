export const USER = 'USER';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';

export const actionUser = (email) => (
  {
    type: USER,
    payload: email,
  }
);

// export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrencies = (data) => ({ type: WALLET_CURRENCIES, payload: data });

export function fetchAPI() {
  return async (dispatch) => {
    try {
    //   dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(getCurrencies(data));
    } catch (error) {
      console.log(error);
    }
  };
}
