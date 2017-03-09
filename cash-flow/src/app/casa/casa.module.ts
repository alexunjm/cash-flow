import { CasaComponent } from './casa.component';
import { CasaRoutingModule } from './casa-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PepitoComponent } from './pepito/pepito.component';

@NgModule({
  imports: [
    CommonModule,
    CasaRoutingModule // el módulo que sabe enrutar
  ],
  declarations: [CasaComponent, PepitoComponent]
})
export class CasaModule { }
