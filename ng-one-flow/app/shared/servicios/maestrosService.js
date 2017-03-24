(function () {

	angular.module('abServicios').service('maestrosService', maestrosService);

	function maestrosService($resource, environment) {

		this.maestros = $resource(
			environment.apiUrl + "/api/pub/maestros/:nombre",
			{},
			{
				'categorias': { method: 'GET', isArray: true, params: { nombre: 'categorias' } },
				'tipos': { method: 'GET', isArray: true, params: { nombre: 'tipos' } },
			}
		);
	}

}());
