import { Total } from './../movimientos/modelos/total';
import { DatosService } from './../movimientos/datos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cf-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.css']
})
export class CasaComponent implements OnInit {
  private total: Total = new Total(0, 0);

  constructor(private datosService: DatosService) { }

  ngOnInit() {
    this.datosService.getTotal$().subscribe(total => {
      this.total = total;
    });
  }

}
