(function () {
	angular.module('cashFlow').config(function ($stateProvider) {
		$stateProvider
			.state('not-found', {
				url: '*path',
				templateUrl: 'not-found.html'
			});
	});

	angular.module('cashFlow').constant('environment',{ apiUrl: 'http://localhost:3030'});	
	angular.module('cashFlow').config(configuradorInterceptores);

	function configuradorInterceptores($httpProvider) {
		$httpProvider.interceptors.push(funcionInterceptoraSeguridad);
	}

	function funcionInterceptoraSeguridad($injector, $q,  $rootScope) {
		var interceptor = {}; 

		interceptor.request = function (request) {
			request.headers["Authorization"] = 'Basic ' + localStorage.getItem("sessionId");
			return request;
		};

		interceptor.responseError = function (response) {
			var $state = $injector.get('$state');
			if (response.status === 401) {
				$rootScope.mensaje = "No hay derecho!!!";
				$state.go('registro');
			} else if (response.status === 419) {
				$rootScope.mensaje = "Estoy caduco!!!";
				localStorage.removeItem("sessionId");
				$state.go('registro');
			};
			return $q.reject(response);
		}
		return interceptor;
	}
} ());