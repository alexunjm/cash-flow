import { GlobalState } from './store/global-state.class';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/core';
import { Store } from '@ngrx/store';
// Es una función que actúa como decorador
// Es la forma que tiene TypeScript de agregar Metadata al código
@Component({
  selector: 'cf-root', // determina el nombre que será conocido en html
  templateUrl: './app.component.html', // ruta relativa a la plantilla con la vista 
  styles: [] // Aqui irán los estilos directamente, o las rutas hacia ficheros css...
})
export class AppComponent {
  // Habitualmente los componentes se llaman como el selector descartando el prefijo
  // El componente raíz es una excepción. Debería llamarse RootComponent
  // Respecto al selector... si no se dice nada su prefijo por defecto es app
  // Luego normalmente encontrarás el par 'app-root' AppComponent

  // Propiedades del componente, visibles desde la plantilla
  title = 'Hola Mundo del Cash-Flow con Angular 2!';
}
