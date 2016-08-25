(function() {
  angular
    .module('bloctime')
    .constant('TIME_CONSTANTS', {
      'BREAKTIME': 2,
      'POMODOROTIME': 5,
      'THIRTY_MINUTE_BREAKTIME': 1800
    });
})();