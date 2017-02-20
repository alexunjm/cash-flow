/* tslint:disable:no-unused-variable */
import { inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { Movimiento } from './../modelos/movimiento';
import { By } from '@angular/platform-browser';

import { EditorComponent } from './editor.component';
import { DatosService } from './../datos.service';
import { DatosServiceMock } from './../../testing/DatosServiceMock';
import { ActivatedRouteMock } from './../../testing/ActivatedRouteMock';

describe('EditorComponent', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let component: EditorComponent;
  let datosService: DatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent
      ],
      // especificamos el mock que se le va a inyectar al
      // componente
      // se le inyecta un objeto totalmente diferente al
      // declarado, es decir, un clon de datosServiceMock,
      // por lo que cualquier cambio realizado sobre el stub
      // no tendrá efecto en el servicio inyectado.
      providers: [
        { provide: DatosService, useValue: new DatosServiceMock() },
        { provide: ActivatedRoute, useValue: new ActivatedRouteMock(Observable.of({ id: 1 })) }
      ]
    })
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    datosService = fixture.debugElement.injector.get(DatosService);
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
    let el: HTMLElement = fixture.debugElement.query(By.css('code')).nativeElement;
    expect(el.textContent).toContain('fecha');
    expect(el.textContent).toContain('importe');
    expect(el.textContent).toContain('tipo');
    expect(el.textContent).toContain('categoria');
  });
});
