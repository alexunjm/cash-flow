import { CashFlowPage } from './app.po';
import { Movimiento } from './../src/app/movimientos/modelos/movimiento';
import { UserLoginPage } from './user-login.po';
import { browser, ElementArrayFinder } from 'protractor';
import { ListaMovimientosPage } from './lista-movimientos.po';
import { NuevoMovimientoPage } from './nuevo-movimiento.po';

describe('cash-flow App', () => {
  let homePage: CashFlowPage;
  let nuevoMovimientoPage: NuevoMovimientoPage;
  let userLoginPage: UserLoginPage;
  let listaMovimientosPage: ListaMovimientosPage;

  beforeEach(() => {
    homePage = new CashFlowPage();
    nuevoMovimientoPage = new NuevoMovimientoPage();
    userLoginPage = new UserLoginPage();
    listaMovimientosPage = new ListaMovimientosPage();
  });

  it('should display the home page on startup', () => {
    homePage.navigateTo();
    expect(homePage.getParagraphText()).toEqual('Hola Mundo del Cash-Flow con Angular 2!');
  });

  it('should fail login if we aren\'t registered', () => {
    userLoginPage.navigateTo();
    userLoginPage.logIn('email', 'password');
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/user/login');
  });

  it('should prompt user to log in when entering Lista de Movimientos', () => {
    listaMovimientosPage.navigateTo();
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/user/login');
  });

  it('should prompt user to log in on saving a new Movimiento', () => {
    nuevoMovimientoPage.navigateTo();
    nuevoMovimientoPage.createMovimiento('09/03/2017', '20', 'Gasto', 'Compras');
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/user/login');
  });

  it('should register a user correctly and redirect him to the home page', () => {
    nuevoMovimientoPage.navigateTo();
    nuevoMovimientoPage.createMovimiento('09/03/2017', '20', 'Gasto', 'Compras');
    userLoginPage.register('user', 'password');
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/');
  });

  it('should can post a movimiento when logged in and display it on Lista Movimientos', () => {
    nuevoMovimientoPage.navigateTo();
    nuevoMovimientoPage.createMovimiento('09/03/2017', '20', 'Gasto', 'Compras');
    listaMovimientosPage.navigateTo();
    const listaMovimientos: ElementArrayFinder = listaMovimientosPage.searchListaMovimientos();
    expect(listaMovimientos.count()).toBe(1);
  });
});
