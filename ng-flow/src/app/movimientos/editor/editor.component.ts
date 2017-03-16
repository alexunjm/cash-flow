import { Component, OnInit } from '@angular/core';

/** Servicio para acceder a la ruta activa */
import { ActivatedRoute } from '@angular/router';
import { DatosService } from './../datos.service';
import { Movimiento } from './../modelos/movimiento';

@Component({
  selector: 'cf-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit {
  movimiento: Movimiento;

  constructor(private route: ActivatedRoute, private datosService: DatosService) { }

  ngOnInit() {
    // subscripción al observable params
    this.route.params
      .subscribe(params => {
        const _id = params['id'].toString(); // recpeción del parámetro
        this.datosService
          .getMovimientoBy_Id$(_id)
          .subscribe(r => this.movimiento = r); // consulta al servicio
      });
  }

}
