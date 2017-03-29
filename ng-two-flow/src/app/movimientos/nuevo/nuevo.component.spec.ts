import * as movimientosIndex from './../index';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Movimiento } from './../modelos/movimiento';

/* tslint:disable:no-unused-variable */

describe('NuevoComponent', () => {
  let component: movimientosIndex.NuevoComponent;
  let fixture: ComponentFixture<movimientosIndex.NuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(movimientosIndex.movimientosTestConfig)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(movimientosIndex.NuevoComponent);
    component = fixture.componentInstance;
    component.movimiento = new Movimiento(new Date(), 0, 1, 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
