(function () {
	angular.module('abMenu', ['ui.router'])
		.component('abMenu', {
			templateUrl: './app/shared/componentes/menu/tpl-menu.html',
			controller: menuCtrl
		})

	function menuCtrl($state) {
		this.soyElEstadoActivo = function (estado) {
			return $state.is(estado);
		}
	}
}());
