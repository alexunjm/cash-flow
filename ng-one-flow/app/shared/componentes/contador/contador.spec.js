describe('ab-contador', () => {
  let parentScope;
  let element;

  beforeEach(angular.mock.module('abContador'));
  // 1:
  beforeEach(inject((_$compile_, _$rootScope_) => {
    // 2:
    parentScope = _$rootScope_.$new();
    // 3:
    element = angular.element(`<ab-contador></ab-contador>`);
    _$compile_(element)(parentScope);
    // 4:
    parentScope.$digest();
  }));
  it('shows the menu', () => {
    // 5:
    const menuElement = queryCss(element, '.contador');
    expect(menuElement).toBeDefined();
  });
  function queryCss(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }
});