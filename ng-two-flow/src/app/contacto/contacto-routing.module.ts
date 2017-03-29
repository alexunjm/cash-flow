import { ContactoComponent } from './contacto/contacto.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ContactoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // configuración para un módulo hijo
  exports: [RouterModule], // se importará en su módulo funcional asociado
  providers: []
})
export class ContactoRoutingModule { }
