/**
 * importación de módulos con objetos y utilidades comunes del framework y propios
/* importación del componente raíz, definido en esta misma carpeta
*/

import * as app from './index';

import { NgModule } from '@angular/core';

// decorador que define un módulo
@NgModule(app.appConfig)
/**
 * Módulo raiz de la aplicación
 * Destinado a importar la funcionalidad implentada en otros módulos
 */
export class AppModule {
  // los módulos son clases contendoras 
  // habitualmente con poco o ningún código
}
