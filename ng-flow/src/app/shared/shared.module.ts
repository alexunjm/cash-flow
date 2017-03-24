import { FormUtils } from './form-utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { NgModule } from '@angular/core';
import { UserStoreService } from './user-store.service';
/**
 * El módulo compartido se importa en todos los demás módulos
 * Con dos propósitos:
 *  - unificar las dependencias externas comunes
 *  - definir componentes y servicios reutilizables por la aplicación
 */
@NgModule({
  imports: [// Módulos necesarios
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    {
      provide: Http, // replaces the framework service
      useClass: HttpService // with our custom extended class
    },
    UserStoreService // Service to persist local user data
  ],
  exports: [// Lo que aquí se exporte se importará en los módulos funcionales
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
