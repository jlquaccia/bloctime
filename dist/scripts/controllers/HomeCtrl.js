(function() {
  function HomeCtrl($scope, $timeout, Timer) {
    $scope.time = '25:00';
    $scope.timerRunning = false;

    $scope.countdown = function() {
      $scope.timerRunning = true;
      Timer.countdown('countdown', 25, 0);
    };

    $scope.resetTimer = function() {
      $scope.timerRunning = false;
      Timer.stop();
    };
  }

  angular
    .module('bloctime')
    .controller('HomeCtrl', ['$scope', '$timeout', 'Timer', HomeCtrl]);
})();