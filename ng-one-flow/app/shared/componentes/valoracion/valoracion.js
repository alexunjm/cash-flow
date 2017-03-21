(function () {
	angular.module('abValoracion', [])
		.component('abValoracion', {
			templateUrl: './app/shared/componentes/valoracion/tpl-valoracion.html',
			bindings: {
				valor: '=',
				maximo: '@',
				soloLectura: '@'
			},
			controller: function () {
				var vm = this;
				this.$onInit = function () {
					vm.actualizarEstrellas();
				}
				this.marcar = function (indice) {
					if (vm.soloLectura && vm.soloLectura === 'true') {
						return;
					}
					vm.valor.estrellas = indice + 1;
					vm.actualizarEstrellas();
				};
				this.actualizarEstrellas = function () {
					if (!vm.valor) vm.valor = { estrellas: 1 };
					vm.estrellas = [];
					for (var i = 0; i < vm.maximo; i++) {
						var estrella = {
							marcada: (i < vm.valor.estrellas)
						};
						vm.estrellas.push(estrella);
					}
				};
			},
		}).component('abValoracionBind', {
			templateUrl: './app/shared/componentes/valoracion/tpl-valoracion.html',
			bindings: {
				valor: '=',
				maximo: '@',
				soloLectura: '@'
			},
			controller: function () {
				var vm = this;
				this.$onInit = function () {
					vm.actualizarEstrellas();
				}
				this.marcar = function (indice) {
					if (vm.soloLectura && vm.soloLectura === 'true') {
						return;
					}
					vm.valor.estrellas = indice + 1;
					vm.actualizarEstrellas();
				};
				this.actualizarEstrellas = function () {
					if (!vm.valor) vm.valor = { estrellas: 1 };
					vm.estrellas = [];
					for (var i = 0; i < vm.maximo; i++) {
						var estrella = {
							marcada: (i < vm.valor.estrellas)
						};
						vm.estrellas.push(estrella);
					}
				};
			},
		});

}());
