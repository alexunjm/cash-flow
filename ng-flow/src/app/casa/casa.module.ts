import { DatosService } from './../movimientos/datos.service';
import { SharedModule } from './../shared/shared.module';
import { CasaComponent } from './casa.component';
import { CasaRoutingModule } from './casa-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CasaRoutingModule // el módulo que sabe enrutar
  ],
  declarations: [CasaComponent],
  providers: [DatosService]
})
export class CasaModule { }
