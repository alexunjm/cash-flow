import * as userActions from '../actions/user.actions';

export interface UserState {
  email: string;
  isLogged: boolean;
  token: string;
};

const initialState: UserState = <UserState> JSON.parse(localStorage.getItem('userState')) || {
  email: '',
  isLogged: false,
  token: ''
};

export function reducer(state = initialState, action: userActions.Actions): UserState {
  switch (action.type) {
    case userActions.ActionTypes.LOGIN: {
      const loginAction = <userActions.LoginAction>action;
      const newState = {
        email: loginAction.payload.email,
        isLogged: true,
        token: loginAction.payload.token
      };
      console.log('before');
      localStorage.setItem('userState', JSON.stringify(newState));
      console.log('after');
      return newState;
    }
    case userActions.ActionTypes.LOGOUT: {
      return {
        email: '',
        isLogged: false,
        token: ''
      };
    }
    default: {
      return state;
    }
  }
}
