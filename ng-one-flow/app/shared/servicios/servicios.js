(function () {

	angular.module('abServicios', ['ngResource']).service('apiService', apiService);

	function apiService($resource, environment) {

		this.maestros = $resource(
			environment.apiUrl + "/api/pub/maestros/:nombre",
			{},
			{
				'categorias': { method: 'GET', isArray: true, params: { nombre: 'categorias' } },
				'tipos': { method: 'GET', isArray: true, params: { nombre: 'tipos' } },
			}
		);

		this.movimientos = $resource(
			environment.apiUrl + "/api/priv/movimientos/:id",
			{ id: '@id' },
			{
				'update': { method: 'PUT' },
				'total': { method: 'GET', params: { id: 'total' } }
			}
		);
	}

}());
