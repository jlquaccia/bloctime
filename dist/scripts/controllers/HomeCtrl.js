(function() {
  function HomeCtrl($scope, Timer, Sound) {
    $scope.timer = Timer;
    $scope.sound = Sound;

    $scope.$watch(Timer.getCurrentTime, function(newVal, oldVal) {
      if (newVal === 0) {
        Timer.ringBell();
      }
    });
  }

  angular
    .module('bloctime')
    .controller('HomeCtrl', ['$scope', 'Timer', 'Sound', HomeCtrl]);
})();