import { UserData } from './../shared/model/data.class';

export class UserStoreServiceMock {

  public logIn(user, token) {

  }

  public logOut(user, token) {

  }

  public getProfile(): UserData {
    let userData: UserData = new UserData();
    userData.user = 'testUser';
    userData.token = 'eyJhbGciOiJIUzI1NiIsInR9';
    userData.isLogged = false;
    return userData;
  }
}