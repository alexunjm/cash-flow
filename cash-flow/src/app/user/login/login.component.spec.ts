import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserServiceMock } from './../../testing/UserServiceMock';
import { UserService } from './../user.service';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let userServiceMock: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: UserService, useValue: new UserServiceMock() }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userServiceMock = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    let header: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(header.textContent).toContain('Por favor identifícate');
  });

  it('should call alRegistrar()', () => {
    spyOn(component, 'alRegistrar').and.callThrough();
    let button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    button.click();
    expect(component.alRegistrar).toHaveBeenCalled();
  });

  it('should call postUser$() from alRegistrar()', () => {
    spyOn(userServiceMock, 'postUser$').and.callThrough();
    let button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    button.click();
    expect(userServiceMock.postUser$).toHaveBeenCalled();
  });

  it('should call alEntrar()', () => {
    spyOn(component, 'alEntrar').and.callThrough();
    let button = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    button.click();
    expect(component.alEntrar).toHaveBeenCalled();
  });

  it('should call postSesion$() from alEntrar()', () => {
    spyOn(userServiceMock, 'postSesion$').and.callThrough();
    let button = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    button.click();
    expect(userServiceMock.postSesion$).toHaveBeenCalled();
  });
});