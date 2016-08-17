(function() {
  function Timer($interval, TIME_CONSTANTS) {
    // var BREAKTIME = 300;
    // var POMODOROTIME = 1500;
    var isRunning = false;
    var currentTime = TIME_CONSTANTS.POMODOROTIME;
    var stopTime;
    var timerState = "pomodoro";
    var btnText = "Start";

    function slayer(){
      if(currentTime > 0){
        currentTime = currentTime - 1;
      }else{
        if(timerState == "pomodoro"){
          timerState = "break";
          currentTime = TIME_CONSTANTS.BREAKTIME;
        }else{
          timerState = "pomodoro";
          currentTime = TIME_CONSTANTS.POMODOROTIME;
        }

        btnText = 'Start';
        isRunning = false;
        $interval.cancel(stopTime);
        stopTime = null;
      }
    }

    var startTimer = function(){
      if(!stopTime){
        stopTime = $interval(slayer, 1000);
        isRunning = true;
        btnText = 'Reset';
      }
    };

    return {
      getCurrentTime: function(){
        return currentTime;
      },
      getBtnTxt: function(){
        return btnText;
      },
      getState: function(){
        return timerState;
      },
      startResetToggle: function(){
        if(isRunning){
          if (timerState == "pomodoro") {
            console.log("RESET");
            $interval.cancel(stopTime);
            stopTime = null;
            isRunning = false;
            currentTime = TIME_CONSTANTS.POMODOROTIME;
            btnText = 'Start';
          } else {
            console.log("RESET");
            $interval.cancel(stopTime);
            stopTime = null;
            isRunning = false;
            currentTime = TIME_CONSTANTS.BREAKTIME;
            btnText = 'Start';
          }
        }else{
          console.log("STARTED");
          startTimer();
        }
      }
    };
  }

  angular
    .module('bloctime')
    .factory('Timer', ['$interval', 'TIME_CONSTANTS', Timer]);
})();