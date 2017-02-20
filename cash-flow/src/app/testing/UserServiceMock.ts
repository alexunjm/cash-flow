import { Observable } from 'rxjs/Observable';
import { Response, ResponseOptions } from '@angular/http';
import { UserData } from './../shared/model/data.class';

export class UserServiceMock {
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  public postSesion$(credenciales) {
    let options = new ResponseOptions({
      status: 200,
      body: this.token
    });
    return Observable.of(new Response(options));
  }

  public postUser$(credenciales) {
    let options = new ResponseOptions({
      status: 201,
      body: this.token
    });
    return Observable.of(new Response(options));
  }

  public getProfile(): UserData {
    let user: UserData = new UserData();
    user.user = 'testingUser';
    user.token = this.token;
    user.isLogged = false;
    return user;
  }

}