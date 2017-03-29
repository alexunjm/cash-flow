import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';

import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserData } from './model/data.class';
import { UserStoreService } from './user-store.service';

@Injectable()
/**
 * A custom extension to replace the framework CrudService
 * Allows the configuration of headers for every Request
 * Catches all responses given the oportunity to run common logic
 * */
export class HttpService extends Http {
  /** should come from environmet configuration files */
  public apiProxyUrl = 'http://localhost:3030/api/';
  // public apiUrl: string = 'api/';
  private authorization = '';

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    private userStore: UserStoreService
  ) {
    super(backend, defaultOptions);
    this.userStore
      .getDataObservable()
      .subscribe((data: UserData) => this.authorization = 'Basic ' + data.token);
  }

  /**
   * Rewrites de base method and performs common actions with every request
   * The current request may be a string or an object
   * If it is astring it should have options
   * */
  request(request: string | Request, options: RequestOptionsArgs = { headers: new Headers() }): Observable<Response> {
    // configures request url and headers
    if (typeof request === 'string') {
      request = this.getProxyUrl(request);
      this.setHeaders(options);
    } else {
      request['url'] = this.getProxyUrl(request['url']);
      this.setHeaders(request);
    }
    // catch any errors receibed
    const observableRequest = super
      .request(request, options)
      .catch(this.onCatch())
      .finally(this.onFinally());
    // the request is an observable, after config it must continue
    return observableRequest;
  }

  /**
   * Transforms the url to call de cors proxy
   */
  private getProxyUrl(currentUrl) {
    if (!currentUrl.includes('/assets/')) {
      return this.apiProxyUrl + currentUrl;
    } else {
      return currentUrl;
    }
  }

  /**
   * Interceptor to write header info in every request
   * */
  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    const headers = objectToSetHeadersTo.headers;
    headers.set('Authorization', this.authorization);
  }

  /**
   * Interceptor for any kind of error receibed form the API
   * */
  private onCatch() {
    return (res: Response) => {
      // Security errors
      if (res.status === 401 || res.status === 403 || res.status === 0) {
        // ask user for credentials
        this.router.navigate(['user/login']);
      }
      // To Do: other common actions to http errors
      return Observable.throw(res);
    };
  }

  private onFinally() {
    return () => console.log('end');
  }

}
