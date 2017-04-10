describe('app factory', function () {
  var environment;

  beforeEach(angular.mock.module('cashFlow'));

  beforeEach(inject(function (_environment_) {
    environment = _environment_;
  }));

  it('environment should exist', function () {
    expect(environment).toBeDefined();
  });
});