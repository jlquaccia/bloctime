(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref(),
        tasks = $firebaseArray(ref);

    Date.prototype.today = function () { 
      return this.getFullYear() + '/' + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + '/' + ((this.getDate() < 10)?"0":"") + this.getDate();
    };

    Date.prototype.timeNow = function() {
      return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
    };

    return {
      all: tasks,
      addTask: function(task, uid) {
        tasks.$add({
          task: task,
          uid: uid,
          created_at: new Date().today() + new Date().timeNow()
        }).then(function(ref) {
          var id = ref.key;
          console.log('added record with id: ' + id + ' task: ' + task);
        });
      },
      getCurrentUserTasks: function(uid) {
        return $firebaseArray(ref.orderByChild('uid').equalTo(uid));
      },
      deleteTask: function(task) {
        var c = confirm('Are you sure?');

        if (c) {
          tasks.$remove(task);
        }
      }
    };
  }

  angular
    .module('bloctime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();