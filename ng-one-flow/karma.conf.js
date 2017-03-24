// Karma configuration
// Generated on Fri Mar 24 2017 13:57:50 GMT+0100 (Romance Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.min.js',
      './node_modules/angular-resource/angular-resource.min.js',
      './node_modules/angular-ui-router/release/angular-ui-router.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './app.js',
      './config.js',
      './app/estados/estados.js',
      './app/estados/total/total.js',
      './app/estados/nuevo/nuevo.js',
      './app/estados/lista/lista.js',
      './app/estados/movimiento/movimiento.js',
      './app/estados/registro/registro.js',
      './app/shared/shared.js',
      './app/shared/servicios/servicios.js',
      './app/shared/filtros/filtros.js',
      './app/shared/componentes/componentes.js',
      './app/shared/componentes/cabecera/cabecera.js',
      './app/shared/componentes/contenido/contenido.js',
      './app/shared/componentes/contador/contador.js',
      './app/shared/componentes/firma/firma.js',
      './app/shared/componentes/menu/menu.js',
      './app/shared/componentes/radio/radio.js',
      './app/shared/componentes/select/select.js',
      './app/shared/componentes/valoracion/valoracion.js',
      './app.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
