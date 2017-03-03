/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasaComponent } from './casa.component';

describe('CasaComponent', () => {
  let component: CasaComponent;
  let fixture: ComponentFixture<CasaComponent>;

  // no utilizamos un beforeEach asíncrono ya
  // que al utilizar webpack el template se
  // añadirá al componente antes de que Angular
  // intente acceder a él
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CasaComponent
      ]
    });
    fixture = TestBed.createComponent(CasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould render an h3 tag', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(el.textContent).toContain('Bienvenido a tu casa.');
  });
});
