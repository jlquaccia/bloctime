(function() {
  function AuthCtrl($scope, $state, Auth) {
    $scope.email = '';
    $scope.password = '';

    $scope.login = function() {
      Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(auth) {
        $state.go('home');
      }, function(error) {
        $scope.error = error;
      });
    };

    $scope.register = function() {
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
        $scope.login();
      }, function(error) {
        $scope.error = error;
      });
    };

    // For site title arc typography effect
    $('.line-2').arctext({radius: 700});
  }

  angular
    .module('bloctime')
    .controller('AuthCtrl', ['$scope', '$state', 'Auth', AuthCtrl]);
})();