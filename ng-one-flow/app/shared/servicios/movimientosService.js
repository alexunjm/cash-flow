(function () {
	angular.module('servicios').service('movimientosService', movimientosService);

	function movimientosService($resource, environment) {
		this.movimientos = $resource(
			environment.apiUrl + "/api/priv/movimientos/:id",
			{ id: '@id' },
			{
				'update': { method: 'PUT' },
				'total': { method: 'GET', params: { id: 'total' } }
			}
		);
	};
}());
