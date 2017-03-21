(function () {

  angular.module('abContador', [])
    .component('abContador', {
      templateUrl: './app/shared/componentes/contador/tpl-contador.html',
      bindings: {
        texto: '@',
        valor: '='
      }
    })

}());