(function () {

	angular.module('lista', ['ui.router', 'shared'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('lista', {
					url: '/lista',
					template: '<ab-lista></ab-lista>'
				})
		})
		.component('abLista', {
			templateUrl: './app/estados/lista/lista.html',
			controller: function (movimientosService) {
                var vm = this;
                this.valorCorte = 1;
				/*
				movimientosService.gettingMovimientos()
					.success(function (result) {
						vm.movimientos = result;
					})
				*/
				vm.movimientos = movimientosService.movimientos.query();
			}
		})

}());
