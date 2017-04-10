(function () {
	const Name = 'Lista';
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

	function ctrl(apiService) {
		var vm = this;
		this.$onInit = function () {
			vm.valorCorte = 1;
			vm.movimientos = apiService.movimientos.query();
		}

	}

}());
