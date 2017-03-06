import { CasaComponent } from './casa.component';
import { CasaRoutingModule } from './casa-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    CasaRoutingModule // el módulo que sabe enrutar
  ],
  declarations: [CasaComponent]
})
export class CasaModule { }
