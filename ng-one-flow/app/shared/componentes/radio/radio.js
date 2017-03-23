(function () {
  angular.module('abRadio', [])
    .component('abRadio', {
      templateUrl: './app/shared/componentes/radio/tpl-radio.html',
      require: {
        model: 'ngModel'
      },
      bindings: {
        nombre: '@',
        opciones: '<'
      },
      controller: function () {
        const vm = this;
        this.$onInit = function onInit() {
          vm.model.$render = function render() {
            vm.valor = vm.model.$viewValue;
            vm.seleccionar(vm.model.$viewValue);
          }
        };
        this.seleccionar = function seleccionar(id) {
          vm.valor = id;
          vm.model.$setViewValue(vm.valor);
        };
      }
    });

}())