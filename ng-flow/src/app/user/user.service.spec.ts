import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { RouterMock } from './../shared/testing/RouterMock';
import { TestBed } from '@angular/core/testing';
import { UserData } from './../shared/model/data.class';
import { UserService } from './user.service';
import { UserStoreService } from './../shared/user-store.service';
import { UserStoreServiceMock } from './../shared/testing/UserStoreServiceMock';

describe('UserService', () => {
  let userService: UserService;
  let userStoreServiceMock: UserStoreService;
  let routerMock: Router;
  let mockBackend: MockBackend;
  let credentials, fakeToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserStoreService, useValue: new UserStoreServiceMock() },
        { provide: Router, useValue: new RouterMock() },
        {
          provide: Http,
          useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [
            MockBackend, BaseRequestOptions
          ]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
    userService = TestBed.get(UserService);
    userStoreServiceMock = TestBed.get(UserStoreService);
    routerMock = TestBed.get(Router);
    mockBackend = TestBed.get(MockBackend);
  });

  beforeEach(() => {
    credentials = {
      email: 'testUser',
      password: 'testPassword'
    };
    fakeToken = 'eyJhbGciOiJIkpXVCJ9';
  });

  it('should register a user', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(fakeToken)
      })));
    });

    spyOn(routerMock, 'navigate').and.callThrough();
    spyOn(userStoreServiceMock, 'logIn').and.callThrough();
    userService.postUser$(credentials).subscribe();
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    expect(userStoreServiceMock.logIn).toHaveBeenCalled();
  });

  it('should login a user', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(fakeToken)
      })));
    });

    spyOn(routerMock, 'navigate').and.callThrough();
    spyOn(userStoreServiceMock, 'logIn').and.callThrough();
    userService.postSesion$(credentials).subscribe();
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    expect(userStoreServiceMock.logIn).toHaveBeenCalled();
  });

  it('should call getProfile from UserStoreService', () => {
    spyOn(userStoreServiceMock, 'getProfile').and.callThrough();
    userService.getProfile();
    expect(userStoreServiceMock.getProfile).toHaveBeenCalled();
  });
});
