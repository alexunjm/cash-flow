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

	function ctrl($state, $http, $rootScope, environment) {
		var urlBase = environment.apiUrl + "/api/pub/";
		var vm = this;
		vm.usuario = {};
		vm.registrar = function () {
			$http.post(urlBase + 'usuarios/', vm.usuario)
				.then(function (respuesta) {
					$rootScope.usuario = vm.usuario.email;
					$rootScope.mensaje = 'recién creado';
					localStorage.setItem("sessionId", respuesta.data);
					$state.go("total");
				}, function (respuesta) {
					$rootScope.mensaje = respuesta.data;
				});
		}
		vm.entrar = function () {
			$http.post(urlBase + 'sesiones/', vm.usuario)
				.then(function (respuesta) {
					$rootScope.usuario = vm.usuario.email;
					$rootScope.mensaje = 'recién entrado';
					localStorage.setItem("sessionId", respuesta.data);
					$state.go("total");
				}, function (respuesta) {
					$rootScope.mensaje = respuesta.data;
				});
		}
	}

}());
