(function() {
  function config($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html'
      });
  }

  angular
    .module('bloctime', ['ui.router', 'firebase'])
    .config(config);
})();