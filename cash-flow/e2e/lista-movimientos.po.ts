import { ElementArrayFinder, browser, element, by } from 'protractor';

export class ListaMovimientosPage {
  public lista = element.all(by.css('tr[name="movimientos"]'));

  navigateTo() {
    browser.get('/movimientos/lista');
  }
}
