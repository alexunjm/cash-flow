(function () {

  angular.module('abCabecera', [])
    .directive('abCabecera', cabecera)
  function cabecera() {
    return {
      transclude: {
        mensaje: 'mensaje'
      },
      templateUrl: './app/shared/componentes/cabecera/tpl-cabecera.html'
    };
  };

}())