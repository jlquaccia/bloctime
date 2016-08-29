(function() {
  function AuthCtrl($state, Auth) {
    var authCtrl = this;

    authCtrl.user = {
      email: '',
      password: ''
    };

    authCtrl.login = function() {
      Auth.$authWithPassword(authCtrl.user).then(function(auth) {
        $state.go('home');
      }, function(error) {
        authCtrl.error = error;
      });
    };

    authCtrl.register = function() {
      Auth.$createUser(authCtrl.user).then(function(user) {
        authCtrl.login();
      }, function(error) {
        authCtrl.error = error;
      });
    };

    // For site title arc typography effect
    $('.line-2').arctext({radius: 700});
  }

  angular
    .module('bloctime')
    .controller('AuthCtrl', ['$state', 'Auth', AuthCtrl]);
})();