import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as userReducer from './store/reducers/user.reducer';

export { AppComponent } from './app.component';
export { AppRoutingModule } from './app-routing.module';
export { BrowserModule } from '@angular/platform-browser';
export { NgModule } from '@angular/core';
export { RouterTestingModule } from '@angular/router/testing';

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
    UserModule,
    StoreModule.provideStore(userReducer),
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
    BrowserModule
  ],
  bootstrap: [ // componente raíz para el arranque
    AppComponent
  ]
};
