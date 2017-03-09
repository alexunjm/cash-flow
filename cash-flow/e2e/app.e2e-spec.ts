import { CashFlowPage } from './app.po';

describe('cash-flow App', () => {
  let page: CashFlowPage;

  beforeEach(() => {
    page = new CashFlowPage();
  });

  it('should display message saying Hola Mundo del Cash-Flow con Angular 2!', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hola Mundo del Cash-Flow con Angular 2!');
  });
});
