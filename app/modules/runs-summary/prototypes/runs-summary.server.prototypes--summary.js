'use strict';

/**
 *  Prototype for Summaries of km markers
 */
  var summaryPrototype = {
    km : null,
    startTime : null,
    rest : false, //was it paused
    paused :
      {
        startTime : [],
        endTime : []
      },
    settotalPauseTime : function settotalPauseTime() {
      return this.paused.totalPauseTime = (this.startTime === null) ?
      0 :
      (function(startTime, endTime){
        return startTime.reduce(function(prevValue, currentValue, index, array){
          var current = endTime[index] - currentValue;
          currentValue = prevValue + current;
          return currentValue;
        }, 0);
      })(this.paused.startTime, this.paused.endTime);

    },
    endTime : null,
    totalTime : 0,
    setTotalTime : function setTotalTime() {
      if (this.startTime === null) {return this.totalTime = null;}
        else if (this.rest === false) {return this.totalTime = this.endTime - this.startTime;}
          else {return this.totalTime = this.endTime - this.startTime - this.paused.totalPauseTime;}
    }
  };

  module.exports = summaryPrototype;

/*
        this.paused.startTime.reduce(function(prevValue, currentValue, index, array){
        var current = this.paused.endTime[index] - currentValue;
        currentValue = prevValue + current;
        return currentValue;
      }, 0);*/