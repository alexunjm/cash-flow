import { Tipo } from './modelos/tipo';
import { Movimiento } from './modelos/movimiento';
import { Categoria } from './modelos/categoria';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { DatosService } from './datos.service';
import { TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

describe('DatosService', () => {
  let datosService: DatosService;
  let mockBackend: MockBackend;
  let fakeMovimiento, fakeMovimientos, fakeCategorias, fakeTipos;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatosService,
        {
          provide: Http,
          useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [
            MockBackend, BaseRequestOptions
          ]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
    datosService = TestBed.get(DatosService);
    mockBackend = TestBed.get(MockBackend);
  });

  beforeEach(() => {
    fakeTipos = [
      { id: 1, texto: "Ingreso" },
      { id: 2, texto: "Gasto" }
    ];
    fakeCategorias = [
      { id: 1, texto: 'Nómina', tipo: 1 },
      { id: 2, texto: 'Ventas', tipo: 1 },
      { id: 3, texto: 'Hipoteca', tipo: 2 },
      { id: 4, texto: 'Compras', tipo: 2 }
    ];
    fakeMovimiento = { fecha: new Date(), importe: 100, tipo: 1, categoria: 1, _id: 1, usuario: 1 };

    fakeMovimientos = [
      { fecha: new Date(), importe: 20, tipo: 1, categoria: 1, _id: 1, usuario: 1 },
      { fecha: new Date(), importe: 50, tipo: 2, categoria: 1, _id: 2, usuario: 1 }
    ];
  });

  it('should get all the tipos', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(fakeTipos)
      })));
    });

    datosService.getTiposMovimiento$().subscribe(tipos => {
      expect(tipos.length).toBe(2);
      expect(tipos[0].texto).toBe(fakeTipos[0].texto);
      expect(tipos[1].texto).toBe(fakeTipos[1].texto);
    });
  });

  it('should get all the categorias', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(fakeCategorias)
      })));
    });

    datosService.getCategorias$().subscribe(categorias => {
      expect(categorias.length).toBe(4);
      expect(categorias[0].texto).toBe(fakeCategorias[0].texto);
      expect(categorias[1].texto).toBe(fakeCategorias[1].texto);
      expect(categorias[2].texto).toBe(fakeCategorias[2].texto);
      expect(categorias[3].texto).toBe(fakeCategorias[3].texto);
    });
  });

  it('should post one movimiento', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 201
      })));
    });

    datosService.postMovimiento$(fakeMovimiento).subscribe(resp => {
      expect(resp.status).toBe(201);
    });
  });

  it('should get all the movimientos', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(fakeMovimientos)
      })));
    });

    datosService.getMovimientos$().subscribe(movimientos => {
      expect(movimientos.length).toBe(2);
      expect(movimientos[0].importe).toBe(fakeMovimientos[0].importe);
      expect(movimientos[1].importe).toBe(fakeMovimientos[1].importe);
    });
  });

  it('should get one movimiento', () => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(fakeMovimiento)
      })));
    });

    datosService.getMovimientoBy_Id$(1).subscribe(movimiento => {
      expect(movimiento.importe).toBe(fakeMovimiento.importe);
    });
  });
});