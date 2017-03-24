import { Contacto } from './../contacto/modelos/contacto';
import { Total } from './modelos/total';
// Operador de transformación

import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';

import { Categoria } from './modelos/categoria';
import { Injectable } from '@angular/core';
import { Movimiento } from './modelos/movimiento';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Tipo } from './modelos/tipo';

// permite la suscripción a cambios de un stream

// se comporta como un observable y además permite la emisión de datos hacia un observable



/**
 * Un servicio es una clase inyectable en otro servicio o componente
 */
@Injectable()
export class DatosService {
  private categoriasTipoMovimiento: Categoria[] = [];

  constructor(private http: Http) { }

  /** Crea un nuevo movimiento */
  getNuevoMovimiento(): Movimiento {
    return new Movimiento(
      new Date(),
      0,
      1,
      1
    );
  }

  /** Devuelve la lista de tipos de movimientos */
  getTiposMovimiento$(): Observable<Tipo[]> {
    // las llamadas devuelven observables
    // ocultan la definción de la ruta y demás
    return this.http
      .get(`pub/maestros/tipos`)
      .map((r: Response) => r.json());
  }

  // Se devuelven Observables de tipos concretos
  getCategorias$(): Observable<Categoria[]> {
    // las llamadas devuelven observables
    // ocultan la definción de la ruta y demás
    return this.http
      .get(`pub/maestros/categorias`)
      .map(r => r.json())
      .map(categorias => this.categoriasTipoMovimiento = categorias);
  }

  /** Devuelve la lista de categorias para un tipo concreto */
  getCategoriasPorTipo(tipo): Categoria[] {
    return this.categoriasTipoMovimiento.filter(c => c.tipo === tipo);
  }

  /** Guarda un movimiento en el almacén, y notifica ese evento */
  postMovimiento$(movimiento: Movimiento) {
    const movimientoClone: Movimiento = Object.assign({}, movimiento);
    movimientoClone._id = Date.now().toString();
    const body = JSON.stringify(movimientoClone);
    if (movimiento._id && movimiento._id !== '_') {
      return this.http
        .put(`priv/movimientos/${movimiento._id}`, body);
    } else {
      return this.http
        .post(`priv/movimientos`, body);
    }
  }

  /** Devuelve un observable q  ue notifica cambios en el almacén de movimientos */
  getMovimientos$(): Observable<Movimiento[]> {
    // se comporta como un observable
    return this.http
      .get(`priv/movimientos`)
      .map(r => r.json());
  }

  /** Obtiene el movimiento para un identificador concreto */
  getMovimientoBy_Id$(_id): Observable<Movimiento> {
    return this.http
      .get(`priv/movimientos/${_id}`)
      .map(r => r.json());
  }

  getTotal$(): Observable<Total> {
    return this.http
      .get('priv/movimientos/total')
      .map(r => r.json());
  }

  saveContacto$(contacto: Contacto): Observable<Contacto> {
    return this.http
      .post('priv/contactos/', JSON.stringify(contacto))
      .map(r => r.json());
  }

}
