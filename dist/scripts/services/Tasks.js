(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref(),
        tasks = $firebaseArray(ref);

    return {
      all: tasks,
      addTask: function(task) {
        tasks.$add({task: task}).then(function(ref) {
          var id = ref.key;
          console.log('added record with id: ' + id + ' task: ' + task);
        });
      }
    };
  }

  angular
    .module('bloctime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();