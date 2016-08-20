(function() {
  function HomeCtrl($scope, Timer, Sound, Tasks) {
    $scope.timer = Timer;
    $scope.sound = Sound;
    $scope.tasks = Tasks.all;

    $scope.$watch(Timer.getCurrentTime, function(newVal, oldVal) {
      if (newVal === 0) {
        Timer.ringBell();
      }
    });

    $scope.addTask = function(task) {
      Tasks.addTask(task);
      $scope.newTask = '';
    };
  }

  angular
    .module('bloctime')
    .controller('HomeCtrl', ['$scope', 'Timer', 'Sound', 'Tasks', HomeCtrl]);
})();