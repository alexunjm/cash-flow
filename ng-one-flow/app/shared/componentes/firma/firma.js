(function () {
  angular.module('abFirma', [])
    .directive('abFirma', firma)
  function firma() {
    return {
      transclude: {
        autor: 'autor',
        empresa: '?empresa'
      },
      template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por <span ng-transclude="autor"></span> - <span ng-transclude="empresa"></span></p></footer>'
    };
  };
}())