/* tslint:disable:no-unused-variable */
import { MovimientosComponent } from './movimientos.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';

import { Movimiento } from './../modelos/movimiento';
import { DatosService } from './../datos.service';
import { DatosServiceMock } from './../../testing/DatosServiceMock';

describe('MovimientosComponent', () => {
  const movimiento: Movimiento = new Movimiento(new Date(), 0, 1, 1);
  let fixture: ComponentFixture<MovimientosComponent>;
  let component: MovimientosComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovimientosComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(MovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(el.textContent).toContain('Alta y visualización de tus ingresos y gastos');
  });

  it('should have a route to /movimientos/nuevo', () => {
    const aTags = fixture.debugElement.queryAll(By.css('a'));
    expect(aTags[0].attributes['routerLink']).toBe('/movimientos/nuevo');
  });

  it('should have a route to /movimientos/lista', () => {
    const aTags = fixture.debugElement.queryAll(By.css('a'));
    expect(aTags[1].attributes['routerLink']).toBe('/movimientos/lista');
  });
});
