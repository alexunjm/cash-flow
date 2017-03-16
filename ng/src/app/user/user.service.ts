import { CrudService } from './../shared/crud.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from './../shared/model/data.class';
import { UserStoreService } from './../shared/user-store.service';

@Injectable()
/**
 * CRUD and custom logic related to users
 * */
export class UserService extends CrudService {

  constructor(private userStoreService: UserStoreService, http: Http, private router: Router) {
    super(http);
    this.apiEndPoint = 'pub/usuarios';
  }

  /**
   * Sends credentials to de API and stores the result
   * */
  public postSesion$(credenciales) {
    return this.http
      .post('pub/sesiones', JSON.stringify(credenciales))
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
      .post('pub/usuarios', JSON.stringify(credenciales))
      .map(r => {
        const token = r.json();
        this.userStoreService.logIn({email: credenciales.email }, token);
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
