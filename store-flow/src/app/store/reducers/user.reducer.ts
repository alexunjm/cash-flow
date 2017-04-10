import * as userActions from '../actions/user.actions';

export interface UserState {
  email: string;
  isLogged: boolean;
  token: string;
};

const initialState: UserState = {
  email: '',
  isLogged: false,
  token: ''
};

export function reducer(state = initialState, action: userActions.Actions): UserState {
  switch (action.type) {
    case userActions.ActionTypes.LOGIN: {
      const loginAction = <userActions.LoginAction>action;
      return {
        email: loginAction.payload.email,
        isLogged: true,
        token: loginAction.payload.token
      };
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
