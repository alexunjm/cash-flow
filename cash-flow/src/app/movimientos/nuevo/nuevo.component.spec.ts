import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { NuevoComponent } from './nuevo.component';
import { Movimiento } from './../modelos/movimiento';
import { DatosService } from './../datos.service';
import { DatosServiceMock } from './../../testing/DatosServiceMock';

describe('NuevoComponent', () => {
  let fixture: ComponentFixture<NuevoComponent>;
  let component: NuevoComponent;
  let datosService: DatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        NuevoComponent
      ],
      providers: [
        { provide: DatosService, useValue: new DatosServiceMock() }
      ]
    });
    fixture = TestBed.createComponent(NuevoComponent);
    component = fixture.componentInstance;
    datosService = fixture.debugElement.injector.get(DatosService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNuevoMovimiento', () => {
    spyOn(datosService, 'getNuevoMovimiento').and.callThrough();
    component.ngOnInit();
    expect(datosService.getNuevoMovimiento).toHaveBeenCalled();
  });

  it('should call getTiposMovimiento$', () => {
    spyOn(datosService, 'getTiposMovimiento$').and.callThrough();
    component.ngOnInit();
    expect(datosService.getTiposMovimiento$).toHaveBeenCalled();
  });

  it('should call getCategorias$', () => {
    spyOn(datosService, 'getCategorias$').and.callThrough();
    component.ngOnInit();
    expect(datosService.getCategorias$).toHaveBeenCalled();
  });

  it('should call getCategoriasPorTipo', () => {
    spyOn(datosService, 'getCategoriasPorTipo').and.callThrough();
    component.ngOnInit();
    expect(datosService.getCategoriasPorTipo).toHaveBeenCalled();
  });

  it('should render two tipos', () => {
    const inputs: DebugElement[] = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    const spans: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
    expect(inputs.length).toBe(2);
    expect(spans[0].nativeElement.textContent).toBe('Ingreso');
    expect(spans[1].nativeElement.textContent).toBe('Gasto');
  });

  it('should render three categorias', () => {
    const options: DebugElement[] = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toContain('Nómina');
    expect(options[1].nativeElement.textContent).toContain('Ventas');
    expect(options[2].nativeElement.textContent).toContain('Hipoteca');
  });

  it('should call alGuardarMovimiento on form submit', () => {
    spyOn(component, 'alGuardarMovimiento').and.callThrough();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.alGuardarMovimiento).toHaveBeenCalled();
  });

  it('should call postMovimiento$ on form submit', () => {
    spyOn(datosService, 'postMovimiento$').and.callThrough();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(datosService.postMovimiento$).toHaveBeenCalled();
  });
});
