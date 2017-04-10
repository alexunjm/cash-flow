import { Action } from '@ngrx/store';
import { User } from '../models/user.class';
import { type } from '../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  LOGIN:           type('[User Login]'),
  LOGOUT:          type('[User Logout]')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: User) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginAction
  | LogoutAction;
