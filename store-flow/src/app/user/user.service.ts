import { GlobalState } from '../store/global-state.class';
import { LoginAction } from '../store/actions/user.actions';
import { UserState } from '../store/reducers/user.reducer';
import { CrudService } from './../shared/crud.service';
import { UserData } from './../shared/model/data.class';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
/**
 * CRUD and custom logic related to users
 * */
export class UserService extends CrudService {

  constructor(http: Http, private router: Router, private store: Store<GlobalState>) {
    super(http);
    this.apiEndPoint = 'pub/usuarios';
    this.store.select(s => s.userReducer).subscribe(d => console.log(d));
  }

  /**
   * Sends credentials to de API and stores the result
   * */
  public postSesion$(credenciales) {
    return this.http
      .post('pub/sesiones', credenciales)
      .map(r => {
        const token = r.json();
        const loginAction: LoginAction = new LoginAction({ email: credenciales.email, isLogged: true, token: token });
        this.store.dispatch(loginAction);
        this.router.navigate(['']);
      });
  }

  /**
   * Sends credentials to de API and stores the result
   * */
  public postUser$(credenciales) {
    return this.http
      .post('pub/usuarios', credenciales)
      .map(r => {
        const token = r.json();
        const loginAction: LoginAction = new LoginAction({ email: credenciales.email, isLogged: true, token: token });
        this.store.dispatch(loginAction);
        this.router.navigate(['']);
      });
  }

}
