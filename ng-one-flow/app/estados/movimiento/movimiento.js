(function () {
	const Name = 'Movimiento';
	const name = Name.toLowerCase();
	angular.module(name, ['ui.router', 'shared'])
		.config(function ($stateProvider) {
			$stateProvider
				.state(name, {
					url: '/' + name + '/:id',
					template: `<ab-${name}></ab-${name}>`
				})
		})
		.component('ab' + Name, {
			templateUrl: `./app/estados/${name}/${name}.html`,
			controller: ctrl
		});
	function ctrl(apiService, $state, $stateParams) {
		var vm = this;

		this.$onInit = function () {
			/** Recuperación de parámetros */
			var movimientoId = $stateParams.id;

			/** Envío del parámetro en la consulta */
			// se recibe un resurso con super poderes
			vm.movimiento = apiService.movimientos.get({ id: movimientoId });
		}

		/**
		 * La actualización el resurso se hace vía el método custom $update
		 */
		vm.guardarMovimiento = function () {
			vm.movimiento.fecha = new Date(vm.movimiento.fecha);
			// Llamamos al método uptade
			vm.movimiento.$update()
				.then(function (result) {
					$state.go('lista')
				}, function (error) {
					console.error(error);
					vm.movimiento.importe = -9999;
				});
		};

		vm.borrarMovimiento = function () {
			vm.movimiento.fecha = new Date(vm.movimiento.fecha);
			// Llamamos al método uptade
			vm.movimiento.$delete()
				.then(function (result) {
					$state.go('lista')
				}, function (error) {
					console.error(error);
					vm.movimiento.importe = -9999;
				});
		};
	}
}());
