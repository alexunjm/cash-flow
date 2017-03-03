import { Response, ResponseOptions } from '@angular/http';
import { Categoria } from './../movimientos/modelos/categoria';
import { Tipo } from './../movimientos/modelos/tipo';
import { Movimiento } from './../movimientos/modelos/movimiento';
import { Observable } from 'rxjs/Observable';

export class DatosServiceMock {

  private movimientos: Movimiento[] = [];
  private tipos: Tipo[] = [];
  private categorias: Categoria[] = [];
  private movimiento: Movimiento;

  private initializeTipos() {
    this.tipos.push(new Tipo(1, 'Ingreso'));
    this.tipos.push(new Tipo(2, 'Gasto'));
  }

  private initializeCategorias() {
    this.categorias.push(new Categoria(1, 'Nómina', 1));
    this.categorias.push(new Categoria(2, 'Ventas', 1));
    this.categorias.push(new Categoria(3, 'Intereses', 2));
    this.categorias.push(new Categoria(4, 'Hipoteca', 1));
  }

  constructor() {
    const movimiento: Movimiento = new Movimiento(new Date(), 0, 1, 1);
    this.movimiento = movimiento;
    this.movimientos.push(Object.assign({}, movimiento));
    this.initializeTipos();
    this.initializeCategorias();
  }

  getNuevoMovimiento(): Movimiento {
    return this.movimiento;
  }

  getTiposMovimiento$(): Observable<Tipo[]> {
    return Observable.of(this.tipos);
  }

  getCategorias$(): Observable<Categoria[]> {
    return Observable.of(this.categorias);
  }

  getCategoriasPorTipo(tipo): Categoria[] {
    return this.categorias.filter(c => c.tipo === tipo);
  }

  postMovimiento$(movimiento: Movimiento) {
    movimiento._id = Date.now().toString();
    this.movimientos.push(movimiento);
    const options = new ResponseOptions({
      status: 201
    });
    return Observable.of(new Response(options));
  }

  getMovimientos$(): Observable<Movimiento[]> {
    return Observable.of(this.movimientos);
  }

  getMovimientoBy_Id$(_id): Observable<Movimiento> {
    return Observable.of(this.movimiento);
  }

}
