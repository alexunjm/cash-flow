import { LoginAction } from '../store/actions/user.actions';
import { UserState } from '../store/reducers/user.reducer';
import { CrudService } from './../shared/crud.service';
import { UserData } from './../shared/model/data.class';
import { UserStoreService } from './../shared/user-store.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
/**
 * CRUD and custom logic related to users
 * */
export class UserService extends CrudService {

  constructor(private userStoreService: UserStoreService, http: Http, private router: Router, private store: Store<UserState>) {
    super(http);
    this.apiEndPoint = 'pub/usuarios';
    this.store.select(s => s).subscribe(d => console.log(d));
  }

  /**
   * Sends credentials to de API and stores the result
   * */
  public postSesion$(credenciales) {
    return this.http
      .post('pub/sesiones', credenciales)
      .map(r => {
        const token = r.json();
        this.userStoreService.logIn({email: credenciales.email }, token);
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
        //this.userStoreService.logIn({email: credenciales.email }, token);
        this.router.navigate(['']);
      });
  }

  /**
   * Refresh the current user profile
   * */
  public getProfile(): UserData {
    return this.userStoreService.getProfile();
  }

}
