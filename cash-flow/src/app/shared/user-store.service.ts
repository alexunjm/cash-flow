import { DataStoreService } from './data-store.service';
import { Injectable } from '@angular/core';
import { UserData } from './model/data.class';

@Injectable()
/**
 * A service to hold User data
 * Performs operations against a local store
 * Comunicates with the app trought Observabales
 * */
export class UserStoreService extends DataStoreService {

  constructor() {
    super('user-data', {
      isLogged: false,
      token: '',
      user: null,
    });
  }

  /** Saves and notifies that a user has been logged in  */
  public logIn(user, token) {
    super.setData({ user: user, token: token, isLogged: true });
  }
  /** Saves and notifies that a user has been logged out  */
  public logOut(user, token) {
    super.setData({ user: null, token: null, isLogged: false });
  }
  /**
   * Gets the profile for the current user
   * Needs improvement to actually get fresh data from server
   */
  public getProfile(): UserData {
    // To Do: refresh form API and persist
    return super.getData();
  }
}
