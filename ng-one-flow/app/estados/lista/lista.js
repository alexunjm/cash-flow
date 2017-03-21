(function () {
	const Name = 'Lista';
	const name = Name.toLowerCase();
	angular.module('lista', ['ui.router', 'shared'])
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

	function ctrl(movimientosService) {
		var vm = this;
		this.valorCorte = 1;
		vm.movimientos = movimientosService.movimientos.query();
	}

}());
