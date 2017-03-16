import { ElementArrayFinder, browser, element, by, ElementFinder } from 'protractor';

export class ListaMovimientosPage {
  private listaMovimientos: ElementArrayFinder;

  navigateTo() {
    browser.get('/movimientos/lista');
  }

  searchListaMovimientos() {
    this.listaMovimientos = element.all(by.css('tr[name="movimiento"]'));
    return this.listaMovimientos;
  }
}
