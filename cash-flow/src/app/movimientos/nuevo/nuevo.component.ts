import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Categoria } from './../modelos/categoria';
import { DatosService } from './../datos.service';
import { Movimiento } from './../modelos/movimiento';
import { Tipo } from './../modelos/tipo';

@Component({
  selector: 'cf-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'] // ruta para hojas de estilo propias
})
/**
 *  Componente para crear movimientos
 **/
export class NuevoComponent implements OnInit {
  // ya no recibe datos vía propiedades
  /** propiedad para entrada de tipos de movimiento */
  tipos: Tipo[] = [];
  /** propiedad para entrada de categorias de movimiento */
  categorias: Categoria[] = [];
  /** propiedad para entrada de un movimiento */
  movimiento: Movimiento;

  // ya no se usa datos service
  // es un componente tonto ()
  constructor(private datosService: DatosService) { /** VACÍO */ }

  ngOnInit() {
    this.movimiento = this.datosService.getNuevoMovimiento();
    this.datosService.getTiposMovimiento$().subscribe(tipos => {
      this.tipos = tipos;
      this.datosService.getCategorias$().subscribe(categorias => {
        this.categorias = this.datosService.getCategoriasPorTipo(this.movimiento.tipo);
      });
    });
  }
  /**
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
  /**
   * Almacena el movimiento actual
   */
  alGuardarMovimiento(): void {
    this.datosService
      .postMovimiento$(this.movimiento)
      .subscribe(r => console.log('Movimiento guardado'));
  }
}
