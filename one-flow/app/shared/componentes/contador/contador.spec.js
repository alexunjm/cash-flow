describe('ab-contador', () => {
  let parentScope;
  let element;

  beforeEach(angular.mock.module('abContador'));
  // 1:
  beforeEach(inject((_$compile_, _$rootScope_) => {
    parentScope = _$rootScope_.$new();
    parentScope.valor = '10';
    element = angular.element(`<ab-contador valor="valor"></ab-contador>`);
    _$compile_(element)(parentScope);
    parentScope.$digest();
  }));
  it('shows the component', () => {
    const menuElement = queryCss(element, '.contador');
    expect(menuElement).toBeDefined();
  });
  it('displays initial value ', () => {
    const valorAttr = queryCss(element, '.label').text().trim();
    expect(valorAttr).toEqual('10.00 €');
  });
  it('displays changed value', () => {
    parentScope.valor = '9.99';
    parentScope.$digest();
    const valorAttr = queryCss(element, '.label').text().trim();
    expect(valorAttr).toEqual('9.99 €');

  });
  function queryCss(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }
});