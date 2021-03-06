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
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: '/templates/login.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: '/templates/register.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      });
  }

  angular
    .module('bloctime', ['ui.router', 'firebase'])
    .config(config)
    .filter('secondsToDateTime', [function() {
      return function(seconds) {
          return new Date(1970, 0, 1).setSeconds(seconds);
      };
  }]);
})();