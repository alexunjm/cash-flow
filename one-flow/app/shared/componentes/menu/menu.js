(function () {
	angular.module('abMenu', ['ui.router'])
		.component('abMenu', {
			templateUrl: './app/shared/componentes/menu/tpl-menu.html',
			controller: menuCtrl
		})

	function menuCtrl($state, $rootScope, $timeout) {
		const vm = this;
		this.soyElEstadoActivo = function (estado) {
			return $state.is(estado);
		}
		$rootScope.$on('usuario', (event, data) => { vm.usuario = data; });
		$rootScope.$on('mensaje', (event, data) => {
			this.mensaje = data;
			$timeout(function () {
				vm.mensaje = null;
			}, 3000)
		});
	}
}());
