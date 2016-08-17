(function() {
  function HomeCtrl($scope, $timeout, Timer, $interval) {
    $scope.timer = Timer;
  }

  angular
    .module('bloctime')
    .controller('HomeCtrl', ['$scope', '$timeout', 'Timer', '$interval', HomeCtrl]);
})();