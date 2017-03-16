import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';

export class NuevoMovimientoPage {
  private fecha: ElementFinder;
  private importe: ElementFinder;
  private tipos: ElementArrayFinder;
  private categoria: ElementFinder;

  navigateTo() {
    return browser.get('/movimientos/nuevo');
  }

  private searchElements(option: string) {
    this.fecha = element(by.css('input[name="fecha"]'));
    this.importe = element(by.css('input[name="importe"]'));
    this.tipos = element.all(by.css('input[name="tipo"]'));
    this.categoria = element(by.cssContainingText('option', option));
  }

  createMovimiento(date, importe, tipo, categoria) {
    this.searchElements(categoria);
    this.fecha.sendKeys(date);
    this.importe.sendKeys(importe);
    this.tipos.get(1).click();
    this.categoria.click();
    element(by.css('button')).click();
  }
}
