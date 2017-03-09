import { browser } from 'protractor';
import { ListaMovimientosPage } from './lista-movimientos.po';
import { NuevoMovimientoPage } from './nuevo-movimiento.po';

describe('cash-flow App', () => {
  let nuevoMovimientoPage: NuevoMovimientoPage;
  let listaMovimientosPage: ListaMovimientosPage;

  beforeEach(() => {
    nuevoMovimientoPage = new NuevoMovimientoPage();
    listaMovimientosPage = new ListaMovimientosPage();
  });

  it('should not allow user to submit post if not logged in', () => {
    nuevoMovimientoPage.navigateTo();
    nuevoMovimientoPage.createMovimiento('09/03/2017', '20', 'Gasto', 'Compras');
    expect(browser.getCurrentUrl()).toBe('https://localhost/user/login');
  });
});
