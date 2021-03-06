(function () {

	angular.module('abServicios', ['ngResource']).service('apiService', apiService);

	function apiService($resource, environment) {

		this.maestros = $resource(
			environment.apiUrl + "/api/pub/maestros/:nombre",
			{},
			{
				'getCategorias': { method: 'GET', isArray: true, params: { nombre: 'categorias' } },
				'getTipos': { method: 'GET', isArray: true, params: { nombre: 'tipos' } },
			}
		);

		this.movimientos = $resource(
			environment.apiUrl + "/api/priv/movimientos/:id",
			{ id: '@_id' },
			{
				'actualizar': { method: 'PUT' },
				'getTotal': { method: 'GET', params: { id: 'total' } }
			}
		);


		this.usuarios = $resource(
			environment.apiUrl + "/api/pub/:nombre",
			{},
			{
				'registrar': {
					method: 'POST', params: { nombre: 'usuarios' }, transformResponse: string2object
				},
				'entrar': {
					method: 'POST', params: { nombre: 'sesiones' }, transformResponse: string2object
				},
			}
		);
	}

	function string2object(value) {
		return { token: angular.fromJson(value) }
	}

}());
