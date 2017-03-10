import { ElementFinder, element, by, browser } from 'protractor';

export class UserLoginPage {
  private email: ElementFinder;
  private password: ElementFinder;

  navigateTo() {
    return browser.get('/user/login');
  }

  private searchElements() {
    this.email = element(by.css('input[name="email"]'));
    this.password = element(by.css('input[name="password"]'));
  }

  private fillForm(email, password) {
    this.searchElements();
    this.email.sendKeys(email);
    this.password.sendKeys(password);
  }

  register(email: string, password: string) {
    this.fillForm(email, password);
    element(by.css('button[name="register"]')).click();
  }

  logIn(email: string, password: string) {
    this.fillForm(email, password);
    element(by.css('button[name="login"]')).click();
  }
}
