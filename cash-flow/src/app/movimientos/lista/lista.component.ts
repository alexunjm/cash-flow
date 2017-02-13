import { Component, Input, OnInit } from '@angular/core';

import { DatosService } from './../datos.service';
import { Movimiento } from './../modelos/movimiento';

@Component({
  selector: 'cf-lista',
  templateUrl: './lista.component.html',
  styles: [
    `.ingreso{
      color: darkgreen;
    }

    .gasto{
      color: darkred;
    }`]
})
export class ListaComponent implements OnInit {

movimientos: Movimiento[];
  /** Este componente depende del objeto DatosService */
  constructor(private datosService: DatosService) { }

  /** Al iniciar el componente se enlaza con el almacén de movimientos */
  ngOnInit() {
    this.datosService.getMovimientos$().subscribe(m => this.movimientos = m);
  }

}
