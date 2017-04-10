(function () {
  angular.module('abContador', [])
    .component('abContador', {
      //templateUrl: './app/shared/componentes/contador/tpl-contador.html',
      template: `<div name="contador"
                    class="col-xs-8 col-sm-4 placeholder">
                  <h1>
                    <span class="label"
                          ng-class="{'label-success': $ctrl.texto=='Total ingresos' || ($ctrl.texto=='Balance' && $ctrl.valor>=0) , 'label-danger' : $ctrl.texto=='Total gastos' || ($ctrl.texto=='Balance' && $ctrl.valor<0)}">
                      {{ $ctrl.valor | number:2 }} €
                    </span>
                  </h1>
                  <h4>{{$ctrl.texto}}</h4>
                  <span class="text-muted">Acumulado</span>
                </div>`,
      bindings: {
        texto: '@',
        valor: '<'
      }
    })

}());