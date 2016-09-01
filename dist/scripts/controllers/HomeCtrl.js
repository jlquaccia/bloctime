(function() {
  function HomeCtrl($scope, $state, Timer, Sound, Tasks, Auth, $firebaseArray) {
    $scope.timer = Timer;
    $scope.sound = Sound;
    $scope.menuOpen = false;
    $scope.instructionOverlay = false;
    $scope.auth = Auth;

    $scope.tasks = Tasks.all;

    // Retrieve only the current users tasks
    Auth.$waitForSignIn().then(function(data) {
      if (!data) return;

      $scope.currentUserTasks = Tasks.getCurrentUserTasks(data.uid);

      $scope.deleteTask = function(task) {
        var c = confirm('Are you sure?');

        if (c) {
          $scope.currentUserTasks.$remove(task);
        }
      };
    });

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
      if (task === '') return;

      uid = Auth.$getAuth().uid;

      Tasks.addTask(task, uid);
      $scope.newTask = '';
    };

    $scope.toggleMenu = function() {
      $scope.menuOpen = !$scope.menuOpen;
    };

    // For site title arc typography effect
    $('.line-2').arctext({radius: 700});

    $scope.toggleInstructionOverlay = function() {
      $scope.instructionOverlay = !$scope.instructionOverlay;
      console.log($scope.instructionOverlay);
    };

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });

    $scope.signOut = function() {
      $scope.auth.$signOut();
      $scope.menuOpen = false;
      $('#hamburgerMenu').click();
    };
  }

  angular
    .module('bloctime')
    .controller('HomeCtrl', ['$scope', '$state', 'Timer', 'Sound', 'Tasks', 'Auth', '$firebaseArray', HomeCtrl]);
})();