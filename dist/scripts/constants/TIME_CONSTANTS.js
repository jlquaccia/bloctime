(function() {
  angular
    .module('bloctime')
    .constant('TIME_CONSTANTS', {
      'BREAKTIME': 300,
      'POMODOROTIME': 1500,
      'THIRTY_MINUTE_BREAKTIME': 1800
    });
})();