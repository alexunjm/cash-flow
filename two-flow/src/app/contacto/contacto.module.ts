import { DatosService } from './../movimientos/datos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactoRoutingModule } from './contacto-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ContactoRoutingModule
  ],
  declarations: [ContactoComponent],
  providers: [DatosService]
})
export class ContactoModule { }
