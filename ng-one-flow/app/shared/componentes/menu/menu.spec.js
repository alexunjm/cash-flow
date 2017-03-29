describe('ab-menu', () => {
  let parentScope;
  let element;
  beforeEach(function () {
    angular.module('ui.router', []);
  });
  beforeEach(angular.mock.module('abMenu', ['ui.router']));
  // 1:
  beforeEach(inject((_$compile_, _$state_, _$rootScope_, _$timeout_) => {
    // 2:
    parentScope = _$rootScope_.$new();
    // 3:
    element = angular.element(`<ab-menu></ab-menu>`);
    _$compile_(element)(parentScope);
    // 4:
    parentScope.$digest();
  }));
  it('shows the menu', () => {
    // 5:
    const menuElement = queryCss(element, '.navbar');
    expect(menuElement).toBeDefined();
  });
  function queryCss(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }
});