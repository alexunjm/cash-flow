import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { betweenTwoDatesValidator, positiveNumberValidator } from '../../shared/custom-validators';

import { Categoria } from './../modelos/categoria';
import { DatosService } from './../datos.service';
import { FormUtils } from './../../shared/form-utils';
import { Movimiento } from './../modelos/movimiento';
import { Tipo } from './../modelos/tipo';

@Component({
  selector: 'cf-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  private nuevoForm: FormGroup;
  private formUtils: FormUtils;
  tipos: Tipo[] = [];
  categorias: Categoria[] = [];
  movimiento: Movimiento;

  constructor(private formBuilder: FormBuilder, private datosService: DatosService) { }

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
      .subscribe(r => console.log('Movimiento guardado'));
  }
}