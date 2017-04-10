import { GlobalState } from '../store/global-state.class';
import { Store } from '@ngrx/store';
import { Total } from './../movimientos/modelos/total';
import { DatosService } from './../movimientos/datos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cf-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.css']
})
export class CasaComponent implements OnInit {
  public total: Total = new Total(0, 0);
  public numMovimientos = 0;
  // doughnut chart
  public doughnutChartLabels: string[] = ['Gastos', 'Ingresos'];
  public doughnutChartData: number[] = [this.total.gastos, this.total.ingresos];
  public doughnutChartType = 'doughnut';

  constructor(private datosService: DatosService, private store: Store<GlobalState>) { }

  ngOnInit() {
    this.datosService.getTotal$().subscribe(total => {
      this.total = total;
      this.doughnutChartData = [this.total.gastos, this.total.ingresos];
    });
    this.store.select(s => s.movimientoReducer).subscribe(d =>
      this.numMovimientos = d.numMovimientos);
  }

}
