/* tslint:disable:no-unused-variable */

import * as movimientosIndex from './../index';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ListaComponent', () => {
  let component: movimientosIndex.ListaComponent;
  let fixture: ComponentFixture<movimientosIndex.ListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(movimientosIndex.movimientosTestConfig)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(movimientosIndex.ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
