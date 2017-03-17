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
				/*
				movimientosService.gettingTotal()
					.success(function (result) {
						vm.total = result;
					})
					*/
				// sintáxis síncrona
				vm.total = movimientosService.total.get();
			}
		})

}());
