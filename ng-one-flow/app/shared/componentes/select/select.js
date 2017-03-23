(function () {
  angular.module('abSelect', [])
    .component('abSelect', {
      templateUrl: './app/shared/componentes/select/tpl-select.html',
      require: {
        model: 'ngModel'
      },
      bindings: {
        nombre: '@',
        default: '@',
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
        this.seleccionar = function seleccionar() {
          vm.model.$setViewValue(vm.valor);
        };
      }
    });

}())