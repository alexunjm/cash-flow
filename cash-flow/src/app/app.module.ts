import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MovimientosModule } from './movimientos/movimientos.module'; // Módulo funcional propio
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module'; // Módulo propio compartido
import { UserModule } from './user/user.module';
/**
 * importación de módulos con objetos y utilidades comunes del framework y propios
/* importación del componente raíz, definido en esta misma carpeta
*/


// decorador que define un módulo
@NgModule({
  declarations: [ // cosas declaradas en este módulo
    AppComponent
  ],
  imports: [ // otros módulos que necesitamos para que este funcione
    AppRoutingModule, // el módulo de rutas ya configurado
    BrowserModule,
    MovimientosModule,
    SharedModule,
    UserModule
  ],
  bootstrap: [ // componente raíz para el arranque
    AppComponent
  ]
})
/**
 * Módulo raiz de la aplicación
 * Destinado a importar la funcionalidad implentada en otros módulos
 */
export class AppModule {
  // los módulos son clases contendoras 
  // habitualmente con poco o ningún código
}
