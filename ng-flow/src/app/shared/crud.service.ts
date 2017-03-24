import { Injectable, Output } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
/**
 * A base service to perform CRUD operations against a REST API
 * Should be extended
 * */
export class CrudService {
  public apiEndPoint = '';

  constructor(protected http: Http) { }

  /** Reads the full list of items */
  get(): Observable<any> {
      return this.http
          .get(this.apiEndPoint);
  }

  /** Reads a list of items that matches a search term */
  getBySearchTerm(searchTerm: string): Observable<any> {
      // Not restfull at the moment
      return this.http
          .get(this.apiEndPoint + '/list/search?typedText=' + searchTerm);
  }

  /** Reads an item by its primary key */
  getById(id: string): Observable<any> {
      return this.http
          .get(this.apiEndPoint + '/' + id);
  }

  /** Saves or creates a new item */
  save(item: any): Observable<any> {
    if (item.id) {
      return this.put(item.id, item);
    } else {
      return this.post(item);
    }
  };
  /** Create */
  post(item: any): Observable<any> {
      return this.http
          .post(this.apiEndPoint, item);
  };
  /** Update */
  put(id: string, item: any): Observable<any> {
      return this.http
          .post(this.apiEndPoint + '/' + id, item);
  };

  /** Delete */
  delete(id: string): Observable<any> {
      return this.http
          .delete(this.apiEndPoint + '/' + id);
  };
}
