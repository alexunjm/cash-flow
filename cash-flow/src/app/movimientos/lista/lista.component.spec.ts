import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Movimiento } from './../modelos/movimiento';
import { ListaComponent } from './lista.component';
import { DatosService } from './../datos.service';
import { DatosServiceMock } from './../../testing/DatosServiceMock';

describe('ListaComponent', () => {
  const movimiento: Movimiento = new Movimiento(new Date(), 0, 1, 1);
  let fixture: ComponentFixture<ListaComponent>;
  let component: ListaComponent;
  let datosService: DatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListaComponent
      ],
      providers: [
        { provide: DatosService, useValue: new DatosServiceMock() }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    datosService = fixture.debugElement.injector.get(DatosService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovimientos$', () => {
    spyOn(datosService, 'getMovimientos$').and.callThrough();
    component.ngOnInit();
    expect(datosService.getMovimientos$).toHaveBeenCalled();
  });

  it('should render one movimiento', () => {
    fixture.detectChanges();
    const tr: DebugElement[] = fixture.debugElement.queryAll(By.css('tbody'));
    const td: DebugElement[] = fixture.debugElement.queryAll(By.css('td'));
    expect(tr.length).toBe(1);
    expect(td.length).toBe(6);
  });
});
