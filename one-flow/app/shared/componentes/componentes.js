(function () {
	angular
		.module('abComponentes', [
			'abCabecera',
			'abContador',
			'abContenido',
			'abFirma',
			'abMenu',
			'abRadio',
			'abSelect',
			'abValoracion'])
		.directive("formatDate", function () {
			return {
				require: 'ngModel',
				link: function (scope, elem, attr, controller) {
					if (attr['type'] === 'date') {
						controller.$formatters.push((modelValue) => modelValue ? new Date(modelValue) : null);
					}
				}
			};
		});
}());
