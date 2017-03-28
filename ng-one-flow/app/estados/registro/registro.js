(function () {
	const Name = 'Registro';
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

	function ctrl($state, apiService, $rootScope, environment) {
		var urlBase = environment.apiUrl + "/api/pub/";
		var vm = this;
		vm.usuario = new apiService.usuarios();
		vm.registrar = function () {
			vm.usuario.$registrar()
				.then(data => {
					$rootScope.$emit('usuario', vm.usuario.email);
					$rootScope.$emit('mensaje', 'recién creado');
					localStorage.setItem("sessionId", data.token);
					$state.go("total");
				}, fallo => {
					$rootScope.mensaje = fallo.data;
				});
		}
		vm.entrar = function () {
			vm.usuario.$entrar()
				.then(data => {
					$rootScope.$emit('usuario', vm.usuario.email);
					$rootScope.$emit('mensaje', 'recién entrado');
					localStorage.setItem("sessionId", data.token);
					$state.go("total");
				}, fallo => {
					$rootScope.mensaje = fallo.data;
				});
		}
	}

}());
