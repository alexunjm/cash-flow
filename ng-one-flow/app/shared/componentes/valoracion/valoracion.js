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
				};
			},
		}).component('abValoracionBinded', {
			templateUrl: './app/shared/componentes/valoracion/tpl-valoracion.html',
			require: {
				model: 'ngModel'
			},
			bindings: {
				maximo: '@',
				soloLectura: '@'
			},
			controller: function () {
				var vm = this;
				this.$onInit = function () {
					vm.estrellas = [];
					for (var i = 0; i < vm.maximo; i++) {
						var estrella = {
							marcada: (i < vm.value)
						};
						vm.estrellas.push(estrella);
					}
					vm.model.$render = () => {
						console.log('$render.value: ' + vm.value);
						console.log('$render.model.$viewValue: ' + vm.model.$viewValue);
						vm.value = vm.model.$viewValue;
						vm.actualizarEstrellas();
					}
				}
				this.marcar = function (indice) {
					console.log('marcar.indice: ' + indice);
					if (vm.soloLectura && vm.soloLectura === 'true') {
						return;
					}
					vm.value = indice + 1;
					vm.actualizarEstrellas();
					vm.model.$setViewValue(vm.value);
					console.log('marcar.model.$setViewValue: ' + vm.model.$viewValue);
				};
				this.actualizarEstrellas = function () {
					for (var i = 0; i < vm.maximo; i++) {
						vm.estrellas[i].marcada = (i < vm.value)
					}
					console.log('actualizarEstrellas.value: ' + vm.value);
				};
			},
		});

}());
