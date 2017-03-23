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
		vm.usuario = {};
		vm.registrar = function () {
			apiService.usuarios.registrar().$promise
				.then(token => {
					$rootScope.$emit('usuario', vm.usuario.email);
					$rootScope.$emit('mensaje', 'recién creado');
					localStorage.setItem("sessionId", token);
					$state.go("total");
				}, fallo => {
					$rootScope.mensaje = fallo.data;
				});
		}
		vm.entrar = function () {
			apiService.usuarios.entrar().$promise
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
