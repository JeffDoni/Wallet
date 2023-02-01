import { USER } from '../actions/index';

const STATE_INICIAL = {
  user: {
    email: '',
  },
};

function user(state = STATE_INICIAL, action) {
  switch (action.type) {
  case USER:
    return {
      email: action.payload,

    };

  default:
    return state;
  }
}

export default user;
