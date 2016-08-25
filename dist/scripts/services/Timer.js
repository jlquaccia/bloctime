(function() {
  function Timer($interval, TIME_CONSTANTS, Sound) {
    var isRunning = false,
        currentTime = TIME_CONSTANTS.POMODOROTIME,
        stopTime,
        timerState = "pomodoro",
        btnText = "Start",
        completedWorkSessions = 0,
        loaderStatus = false;

    function slayer(){
      if(currentTime > 0){
        currentTime = currentTime - 1;
      } else {
        if(timerState == "pomodoro"){
          if (completedWorkSessions == 3) {
            timerState = "thirtyMinuteBreak";
            console.log('timerState is ' + timerState);
            currentTime = TIME_CONSTANTS.THIRTY_MINUTE_BREAKTIME;
            completedWorkSessions = 0;
            console.log('completed work sessions have been reset');
            loaderStatus = false;
          } else {
            timerState = "break";
            console.log('timerState is ' + timerState);
            currentTime = TIME_CONSTANTS.BREAKTIME;
            completedWorkSessions += 1;
            console.log(completedWorkSessions + ' completed work sessions');
            loaderStatus = false;
          }
        } else {
          timerState = "pomodoro";
          console.log('timerState is ' + timerState);
          currentTime = TIME_CONSTANTS.POMODOROTIME;
          loaderStatus = false;
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

    var ringBell = function() {
      Sound.playBuzzer();
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
      getTimerRunningStatus: function() {
        return isRunning;
      },
      getLoaderStatus: function() {
        return loaderStatus;
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
            loaderStatus = false;
          } else if (timerState == 'thirtyMinuteBreak') {
            console.log("RESET");
            $interval.cancel(stopTime);
            stopTime = null;
            isRunning = false;
            currentTime = TIME_CONSTANTS.THIRTY_MINUTE_BREAKTIME;
            btnText = 'Start';
            loaderStatus = false;
          } else {
            console.log("RESET");
            $interval.cancel(stopTime);
            stopTime = null;
            isRunning = false;
            currentTime = TIME_CONSTANTS.BREAKTIME;
            btnText = 'Start';
            loaderStatus = false;
          }
        }else{
          console.log("STARTED");
          startTimer();
          loaderStatus = true;
        }
      },
      ringBell: function() {
        Sound.playBuzzer();
      }
    };
  }

  angular
    .module('bloctime')
    .factory('Timer', ['$interval', 'TIME_CONSTANTS', 'Sound', Timer]);
})();