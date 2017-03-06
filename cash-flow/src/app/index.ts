import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CasaModule } from './casa/casa.module';
import { MovimientosModule } from './movimientos/movimientos.module'; // Módulo funcional propio
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './shared/shared.module'; // Módulo propio compartido

export { AppComponent } from './app.component';
export { AppRoutingModule } from './app-routing.module';
export { BrowserModule } from '@angular/platform-browser';
export { CasaModule } from './casa/casa.module';
export { MovimientosModule } from './movimientos/movimientos.module'; // Módulo funcional propio
export { NgModule } from '@angular/core';
export { RouterTestingModule } from '@angular/router/testing';
export { SharedModule } from './shared/shared.module'; // Módulo propio compartido


/**
 * importación de módulos con objetos y utilidades comunes del framework y propios
/* importación del componente raíz, definido en esta misma carpeta
*/


// decorador que define un módulo
export const appConfig = {
  declarations: [ // cosas declaradas en este módulo
    AppComponent
  ],
  imports: [ // otros módulos que necesitamos para que este funcione
    AppRoutingModule, // el módulo de rutas ya configurado
    BrowserModule,
    CasaModule,
    MovimientosModule,
    SharedModule
  ],
  bootstrap: [ // componente raíz para el arranque
    AppComponent
  ]
};

export const appTestConfig = {
  declarations: [ // cosas declaradas en este módulo
    AppComponent
  ],
  imports: [ // otros módulos que necesitamos para que este funcione
    RouterTestingModule, // el módulo de rutas ya configurado
    BrowserModule,
    MovimientosModule,
    SharedModule
  ],
  bootstrap: [ // componente raíz para el arranque
    AppComponent
  ]
};
