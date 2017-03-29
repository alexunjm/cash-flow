import { RouterModule, Routes } from '@angular/router';

import { CasaComponent } from './casa.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: CasaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Para cada módulo funcional
  exports: [RouterModule], // listo para importarlo en HomeModule
  providers: []
})
export class CasaRoutingModule { }
