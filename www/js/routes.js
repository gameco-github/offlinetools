angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('fondo', {
    url: '/page1',
    templateUrl: 'templates/fondo.html',
    controller: 'fondoCtrl'
  })

  .state('gastosGameco', {
    url: '/page2',
    templateUrl: 'templates/gastosGameco.html',
    controller: 'gastosGamecoCtrl'
  })

  .state('gasto', {
    url: '/page3',
    templateUrl: 'templates/gasto.html',
    controller: 'gastoCtrl'
  })

   .state('misGastos', {
    url: '/page4',
    templateUrl: 'templates/misGastos.html',
    controller: 'misGastosCtrl'
  })

 .state('menu', {
    url: '/page5',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('prestamo', {
    url: '/page6',
    templateUrl: 'templates/prestamo.html',
    controller: 'prestamoCtrl'
  })

  .state('abono', {
    url: '/page7',
    templateUrl: 'templates/abono.html',
    controller: 'abonoCtrl'
  })

  .state('actualizar', {
    url: '/page8',
    templateUrl: 'templates/actualizar.html',
    controller: 'actualizarCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});