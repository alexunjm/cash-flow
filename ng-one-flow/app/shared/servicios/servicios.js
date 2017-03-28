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
			{ id: '@_id' },
			{
				'update': { method: 'PUT' },
				'total': { method: 'GET', params: { id: 'total' } }
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
		console.group('api/usuarios');
		console.log(value);
		const data = { token: angular.fromJson(value) }
		console.log(data);
		console.groupEnd();
		return data;
	}

}());
