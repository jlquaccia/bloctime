(function() {
  function HomeCtrl($scope, Timer, Sound, Tasks) {
    $scope.timer = Timer;
    $scope.sound = Sound;
    $scope.tasks = Tasks.all;

    console.log('timerState is ' + Timer.getState());

    $scope.$watch(Timer.getCurrentTime, function(newVal, oldVal) {
      if (newVal === 0) {
        Timer.ringBell();
      }
    });

    $scope.$watch(Timer.getLoaderStatus, function(newVal, oldVal) {
      if (newVal === true) {
        console.log('loaderStatus is true');
      } else {
        console.log('loaderStatus is false');
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