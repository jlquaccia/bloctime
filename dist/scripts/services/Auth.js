(function() {
  function Auth($firebaseAuth) {
    return $firebaseAuth();
  }

  angular
    .module('bloctime')
    .factory('Auth', ['$firebaseAuth', Auth]);
})();