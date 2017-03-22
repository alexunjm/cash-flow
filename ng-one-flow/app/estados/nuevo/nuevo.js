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

	function ctrl(movimientosService, maestrosService) {
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
		vm.iniciar = function () {
			vm.nuevoMovimiento = new movimientosService.movimientos();
			vm.nuevoMovimiento.tipo = 1;
			vm.nuevoMovimiento.esIngreso = 1;
			vm.nuevoMovimiento.fecha = new Date();
			vm.nuevoMovimiento.valoracion = 3;
			vm.tipos = maestrosService.tipos.query();
			maestrosService.categorias.query().$promise.then(res => {
				vm.categorias = res;
				vm.categoriasPorTipo();
			});
		}
		vm.iniciar();
	}

}());
