(function() {
  function Sound() {
    var timerBuzzer = new buzz.sound('/assets/audio/Elevator Ding.mp3', {
      preload: true
    });

    return {
      playBuzzer: function() {
        timerBuzzer.play();
      }
    };
  }

  angular
    .module('bloctime')
    .factory('Sound', [Sound]);
})();