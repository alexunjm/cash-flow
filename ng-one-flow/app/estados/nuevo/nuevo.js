(function () {

	angular.module('nuevo', ['ui.router', 'shared'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('nuevo', {
					url: '/nuevo',
					template: '<ab-nuevo></ab-nuevo>'
				})
		})
		.component('abNuevo', {
			templateUrl: './app/estados/nuevo/nuevo.html',
			controller: function (movimientosService, maestrosService) {
				var vm = this;
				vm.guardarMovimiento = function () {
					vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);
					vm.nuevoMovimiento.$save()
						.then(function (result) {
							vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							vm.nuevoMovimiento.importe = -9999;
						});
				};
				vm.categoriasPorTipo = function () {
					vm.categoriasTipo = vm.categorias.filter(c => c.tipo === vm.nuevoMovimiento.tipo);
				}
				vm.cambiarTipo = function (tipoId) {
					vm.nuevoMovimiento.tipo = tipoId
					vm.categoriasPorTipo();
				}
				vm.iniciar = function () {
					vm.nuevoMovimiento = new movimientosService.movimientos();
					vm.nuevoMovimiento.tipo = 1;
					vm.nuevoMovimiento.esIngreso = 1;
					vm.nuevoMovimiento.fecha = new Date();
					vm.tipos = maestrosService.tipos.query();
					maestrosService.categorias.query().$promise.then(res => {
						vm.categorias = res;
						vm.categoriasPorTipo()
					});
				}
				vm.iniciar();
			}
		})

}());
