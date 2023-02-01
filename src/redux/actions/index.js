export const USER = 'USER';

export const actionUser = (email) => (
  {
    type: USER,
    payload: email,
  }
);
