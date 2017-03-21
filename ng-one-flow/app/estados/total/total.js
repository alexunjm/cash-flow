(function () {

	angular.module('total', ['ui.router', 'shared'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('total', {
					url: '/',
					template: '<ab-total></ab-total>'
				})
		})
		.component('abTotal', {
			templateUrl: './app/estados/total/total.html',
			controller: function (movimientosService) {
				var vm = this;
				vm.total = movimientosService.movimientos.total();
			}
		})

}());
