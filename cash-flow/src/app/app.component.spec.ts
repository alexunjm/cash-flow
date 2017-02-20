/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
// importante esta línea para omitir el error de <router-outlet>
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// describe nos permite dividir nuestra suite de testing
// en varios bloques (se aplica el scope de JS), por lo cual
// las variables declaradas aquí serán accesibles desde las
// funciones it
describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // el código definido dentro de la función beforeEach se
  // ejecuta antes de cada función de prueba.
  // añadimos el async de forma que angular2 pueda leer
  // el template y los estilos css de ficheros externos
  beforeEach(async(() => {
    // desacopla el componente a probar de su módulo
    // y lo acopla a uno nuevo de testing (recibe metadata @NgModule)
    // y crea la instancia del componente
    TestBed.configureTestingModule({
      // declaración del componente a probar
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
      // descomentar el siguiente bloque si queremos que Angular2
      // esté atento a los cambios
      /* providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
      */
    });
    // compileComponents compila todos los componentes configurados
    // en el módulo previamente de forma asíncrona, añadiendo el template
    // y los estilos de forma inline, de forma que después la función
    // createComponents pueda crear componentes de forma síncrona
    // después de llamar a compileComponents() no se puede reconfigurar
    // la instancia de TestBed
    TestBed.compileComponents();
  }));

  // sync before each
  beforeEach(() => {
    // después de llamar a createComponent() se cierra la
    // instancia de TestBed y no se puede volver a configurar
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it se utiliza para cada test individual dentro del bloque describe
  it('should create the app', () => {
    // toBeTruthy funciona igual que la evaluación a verdadero o falso de JS,
    // por ejemplo: 0, false, "", undefined, null, NaN se evaluarán a falso
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Hola Mundo del Cash-Flow con Angular 2!'`, () => {
    expect(component.title).toEqual('Hola Mundo del Cash-Flow con Angular 2!');
  });

  it('should render title in a h1 tag', () => {
    // nativeElement devuelve una referencia al elemento en el DOM
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hola Mundo del Cash-Flow con Angular 2!');
  });
});