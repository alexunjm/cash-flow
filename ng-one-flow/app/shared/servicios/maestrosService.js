(function () {

	angular.module('servicios').service('maestrosService', maestrosService);

	function maestrosService($resource, environment) {

		this.categorias = $resource(environment.apiUrl + "/api/pub/maestros/categorias");
		this.tipos = $resource(environment.apiUrl + "/api/pub/maestros/tipos");

	}

}());
