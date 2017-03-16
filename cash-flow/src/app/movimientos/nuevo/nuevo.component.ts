import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Categoria } from './../modelos/categoria';
import { DatosService } from './../datos.service';
import { Movimiento } from './../modelos/movimiento';
import { Tipo } from './../modelos/tipo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cf-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  private nuevoForm: FormGroup;
  tipos: Tipo[] = [];
  categorias: Categoria[] = [];
  movimiento: Movimiento;

  constructor(private formBuilder: FormBuilder, private datosService: DatosService) { }

  ngOnInit() {
    this.movimiento = this.datosService.getNuevoMovimiento();
    this.datosService.getTiposMovimiento$().subscribe(tipos => {
      this.tipos = tipos;
      this.datosService.getCategorias$().subscribe(categorias => {
        this.categorias = this.datosService.getCategoriasPorTipo(this.movimiento.tipo);
      });
    });
    this.nuevoForm = this.formBuilder.group({
      fecha: [this.movimiento.fecha],
      importe: [this.movimiento.importe, Validators.required],
      tipo: 1,
      categoria: ['', Validators.required]
    });
  }
  /*
   * Recalcula las categorias válidas para el tipo del movimiento actual
   */
  alCambiarTipo(): void {
    this.categorias = this.datosService.getCategoriasPorTipo(this.movimiento.tipo);
    // Cambios en el tipo, crean cambios en la categoría
    const categoriasPorTipo = this.datosService.getCategoriasPorTipo(this.movimiento.tipo);
    if (categoriasPorTipo && categoriasPorTipo.length > 0) {
      this.movimiento.categoria = this.datosService.getCategoriasPorTipo(this.movimiento.tipo)[0].id;
    }
  }

  /*
   * Almacena el movimiento actual
   */
  alGuardarMovimiento(): void {
    this.datosService
      .postMovimiento$(this.movimiento)
      .subscribe(r => console.log('Movimiento guardado'));
  }
}
