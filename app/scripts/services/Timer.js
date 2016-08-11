(function() {
  function Timer($timeout) {
    return {
      countdown: function(elementName, minutes, seconds) {
        var endTime,
            hours,
            mins,
            msLeft,
            time;

        function twoDigits(n) {
          return (n <= 9 ? '0' + n : n);
        }

        function updateTimer() {
          msLeft = endTime - (+new Date());

          if (msLeft < 1000) {
            element.innerHTML = "Countdown's Over!";
          } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            stopped = $timeout(updateTimer, time.getUTCMilliseconds() + 500);
          }
        }

        element = document.getElementById(elementName);
        endTime = (+new Date()) + 1000 * (60 * minutes + seconds) + 500;
        updateTimer();
      },
      stop: function() {
        $timeout.cancel(stopped);
        element.innerHTML = '25:00';
      }
    };
  }

  angular
    .module('bloctime')
    .factory('Timer', ['$timeout', Timer]);
})();