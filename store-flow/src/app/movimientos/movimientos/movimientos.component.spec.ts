/* tslint:disable:no-unused-variable */

import * as movimientosIndex from './../index';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MovimientosComponent', () => {
  let component: movimientosIndex.MovimientosComponent;
  let fixture: ComponentFixture<movimientosIndex.MovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(movimientosIndex.movimientosTestConfig)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(movimientosIndex.MovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
