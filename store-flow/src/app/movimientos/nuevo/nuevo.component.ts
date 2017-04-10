import { betweenTwoDatesValidator, positiveNumberValidator } from '../../shared/custom-validators';
import * as movimientoActions from '../../store/actions/movimiento.actions';
import { GlobalState } from '../../store/global-state.class';
import { FormUtils } from './../../shared/form-utils';
import { DatosService } from './../datos.service';
import { Categoria } from './../modelos/categoria';
import { Movimiento } from './../modelos/movimiento';
import { Tipo } from './../modelos/tipo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';


@Component({
  selector: 'cf-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  public nuevoForm: FormGroup;
  public formUtils: FormUtils;
  tipos: Tipo[] = [];
  categorias: Categoria[] = [];
  movimiento: Movimiento;

  constructor(private formBuilder: FormBuilder, private datosService: DatosService, private store: Store<GlobalState>) {
    this.store.select(s => s.movimientoReducer);
  }

  ngOnInit() {
    this.cargarMaestros();
    this.movimiento = this.datosService.getNuevoMovimiento();
    this.buildForm();
    this.formUtils = new FormUtils(this.nuevoForm);
    this.controlarCambioTipo();
  }

  cargarMaestros() {
    this.datosService.getTiposMovimiento$().subscribe(tipos => {
      this.tipos = tipos;
      this.datosService.getCategorias$().subscribe(categorias => {
        this.categorias = this.datosService.getCategoriasPorTipo(this.movimiento.tipo);
      });
    });
  }

  buildForm() {
    const currentDate = new Date(Date.now());
    const pastDate = new Date(Date.now());
    const futureDate = new Date(Date.now());

    pastDate.setDate(currentDate.getDate() - 6);
    futureDate.setDate(currentDate.getDate() + 5);

    this.nuevoForm = this.formBuilder.group({
      fecha: [this.movimiento.fecha.toISOString().substring(0, 10), [Validators.required, betweenTwoDatesValidator(pastDate, futureDate)]],
      importe: [this.movimiento.importe, [Validators.required, positiveNumberValidator]],
      tipo: this.movimiento.tipo,
      categoria: [this.movimiento.categoria, [Validators.required]]
    });
  }

  controlarCambioTipo() {
    this.nuevoForm.get('tipo').valueChanges.subscribe((tipo) => {
      this.recargarCategorias(tipo);
    });
  }

  recargarCategorias(tipo) {
    this.categorias = this.datosService.getCategoriasPorTipo(tipo);
    this.nuevoForm.patchValue({
      categoria: []
    });
  }

  alGuardarMovimiento({ value, valid }): void {
    this.datosService
      .postMovimiento$(value)
      .subscribe(r => this.store.dispatch(new movimientoActions.CrearAction()));
  }
}
