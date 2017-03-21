(function () {
	angular.module('abValoracion', [])
		.component('abValoracion', {
			templateUrl: './app/shared/componentes/valoracion/tpl-valoracion.html',
			controller: function ($scope, $element, $attrs) {
				var vm = this;
				this.$onInit = function () {
					console.log('abValoracion.actualizarEstrellas');
					console.table($scope);
					console.log('abValoracion.$scope.$ctrl.maximo: ' + $scope.$ctrl.maximo);
					console.log('abValoracion.vm.soloLectura: ' + this.soloLectura);
					vm.actualizarEstrellas();
				}
				this.marcar = function (indice) {
					if (vm.soloLectura && vm.soloLectura === 'true') {
						return;
					}
					vm.valor = indice + 1;
					vm.actualizarEstrellas();
				};
				this.actualizarEstrellas = function () {
					if (!vm.valor) vm.valor = 1;
					vm.estrellas = [];
					for (var i = 0; i < vm.maximo; i++) {
						var estrella = {
							marcada: (i < vm.valor)
						};
						vm.estrellas.push(estrella);
					}
					console.table(vm.estrellas);
				};
			},
			bindings: {
				valor: '=',
				maximo: '@',
				soloLectura: '@'
			},
		});

}());
