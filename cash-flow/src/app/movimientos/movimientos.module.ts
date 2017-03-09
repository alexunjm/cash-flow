import { DatosService } from './datos.service';
import { EditorComponent } from './editor/editor.component';
import { ListaComponent } from './lista/lista.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MovimientosRoutingModule } from './movimientos-routing.module';
import { NgModule } from '@angular/core';
import { NuevoComponent } from './nuevo/nuevo.component';
import { SharedModule } from './../shared/shared.module';
/**
 * Una aplicación se compoen de unos o más módulos funcionales
 */
@NgModule({
  imports: [ // dependencias de otros módulos
    SharedModule,
    MovimientosRoutingModule
  ],
  declarations: [ // componentes que se declaran en este módulo de movimientos
    MovimientosComponent,
    NuevoComponent,
    ListaComponent,
    EditorComponent
  ],
  exports: [ // Ya no se exporta ningún componente

  ],
  providers: [ // registro del servicio de datos como un proveedor inyectable
    DatosService
  ]
})
export class MovimientosModule { }
