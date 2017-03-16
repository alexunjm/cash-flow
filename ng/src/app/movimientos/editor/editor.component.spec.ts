import 'rxjs/add/observable/of';

import * as movimientosIndex from './../index';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DatosService } from './../datos.service';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/* tslint:disable:no-unused-variable */

describe('EditorComponent', () => {
  let component: movimientosIndex.EditorComponent;
  let fixture: ComponentFixture<movimientosIndex.EditorComponent>;
  let datosService: DatosService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(movimientosIndex.movimientosTestConfig)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(movimientosIndex.EditorComponent);
    component = fixture.componentInstance;
    datosService = fixture.debugElement.injector.get(DatosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovimientoBy_Id$', () => {
    spyOn(datosService, 'getMovimientoBy_Id$').and.callThrough();
    component.ngOnInit();
    expect(datosService.getMovimientoBy_Id$).toHaveBeenCalledWith('1');
  });

  it('should render movimiento', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.query(By.css('code')).nativeElement;
    expect(el.textContent).toContain('fecha');
    expect(el.textContent).toContain('importe');
    expect(el.textContent).toContain('tipo');
    expect(el.textContent).toContain('categoria');
  });

});
