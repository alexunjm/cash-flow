(function () {
	const Name = 'Nuevo';
	const name = Name.toLowerCase();
	angular.module(name, ['ui.router', 'shared'])
		.config(function ($stateProvider) {
			$stateProvider
				.state(name, {
					url: '/' + name,
					template: `<ab-${name}></ab-${name}>`
				})
		})
		.component('ab' + Name, {
			templateUrl: `./app/estados/${name}/${name}.html`,
			controller: ctrl
		});

	function ctrl(apiService, $rootScope) {
		var vm = this;
		this.$onInit = function () {
			vm.nuevoMovimiento();
			apiService.maestros.tipos().$promise.then(res => {
				vm.tipos = res;
				apiService.maestros.categorias().$promise.then(res => {
					vm.categorias = res;
					vm.categoriasPorTipo();
				});
			});
		};
		vm.guardarMovimiento = function () {
			vm.nuevoMovimiento.$save()
				.then(function (result) {
					$rootScope.$emit('mensaje', 'Movimiento guardado!');
					vm.nuevoMovimiento.importe = 0;
				}, function (error) {
					console.error(error);
					vm.nuevoMovimiento.importe = -9999;
				});
		};
		vm.categoriasPorTipo = function () {
			vm.categoriasTipo = vm.categorias.filter(c => c.tipo === vm.nuevoMovimiento.tipo);
		}

		vm.nuevoMovimiento = function () {
			vm.nuevoMovimiento = new apiService.movimientos();
			vm.nuevoMovimiento.tipo = 1;
			vm.nuevoMovimiento.esIngreso = 1;
			vm.nuevoMovimiento.fecha = new Date();
			vm.nuevoMovimiento.valoracion = 3;
		}

	}

}());
