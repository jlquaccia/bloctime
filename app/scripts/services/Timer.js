(function() {
  function Timer($interval, TIME_CONSTANTS) {
    var isRunning = false,
        currentTime = TIME_CONSTANTS.POMODOROTIME,
        stopTime,
        timerState = "pomodoro",
        btnText = "Start",
        completedWorkSessions = 0;

    function slayer(){
      if(currentTime > 0){
        currentTime = currentTime - 1;
      } else {
        
        console.log(timerState);

        if(timerState == "pomodoro"){
          if (completedWorkSessions == 3) {
            timerState = "thirtyMinuteBreak";
            currentTime = TIME_CONSTANTS.THIRTY_MINUTE_BREAKTIME;
            completedWorkSessions = 0;
            console.log('completed work sessions have been reset');
          } else {
            timerState = "break";
            currentTime = TIME_CONSTANTS.BREAKTIME;
            completedWorkSessions += 1;
            console.log(completedWorkSessions + ' completed work sessions');
          }
        } else {
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
          } else if (timerState == 'thirtyMinuteBreak') {
            console.log("RESET");
            $interval.cancel(stopTime);
            stopTime = null;
            isRunning = false;
            currentTime = TIME_CONSTANTS.THIRTY_MINUTE_BREAKTIME;
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