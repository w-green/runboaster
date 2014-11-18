// stub used in runs-summary.server.model.test.js

var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId;

var summary =
{
  "_id" : ObjectId("546a77833bba9db643de6345"),
  "totalDistanceKm" : 7.406,
  "totalTime" : 2540000,
  "startTime" : "2014-06-24T11:45:35Z",
  "endTime" : "2014-06-24T12:36:32Z",
  "avgSpeedPerKm" : 362857.14285714284,
  "restDuration" : 517000,
  "user" : ObjectId("54254c6afff3ad3b205427ed"),
  "markerItems" : [
    {
      "totalTime" : 331000,
      "paused" : {
        "totalPauseTime" : null,
        "endTime" : [ ],
        "startTime" : [ ]
      },
      "rest" : false,
      "endTime" : "2014-06-24T11:51:06Z",
      "startTime" : "2014-06-24T11:45:35Z",
      "km" : 1
    },
    {
      "totalTime" : 344000,
      "paused" : {
        "totalPauseTime" : null,
        "endTime" : [ ],
        "startTime" : [ ]
      },
      "rest" : false,
      "endTime" : "2014-06-24T11:56:50Z",
      "startTime" : "2014-06-24T11:51:06Z",
      "km" : 2
    },
    {
      "totalTime" : 292000,
      "paused" : {
        "totalPauseTime" : null,
        "endTime" : [ ],
        "startTime" : [ ]
      },
      "rest" : false,
      "endTime" : "2014-06-24T12:01:42Z",
      "startTime" : "2014-06-24T11:56:50Z",
      "km" : 3
    },
    {
      "totalTime" : 360000,
      "paused" : {
        "totalPauseTime" : 517000,
        "endTime" : [
          "2014-06-24T12:11:27Z"
        ],
        "startTime" : [
          "2014-06-24T12:02:50Z"
        ]
      },
      "rest" : true,
      "endTime" : "2014-06-24T12:16:19Z",
      "startTime" : "2014-06-24T12:01:42Z",
      "km" : 4
    },
    {
      "totalTime" : 397000,
      "paused" : {
        "totalPauseTime" : null,
        "endTime" : [ ],
        "startTime" : [ ]
      },
      "rest" : false,
      "endTime" : "2014-06-24T12:22:56Z",
      "startTime" : "2014-06-24T12:16:19Z",
      "km" : 5
    },
    {
      "totalTime" : 376000,
      "paused" : {
        "totalPauseTime" : null,
        "endTime" : [ ],
        "startTime" : [ ]
      },
      "rest" : false,
      "endTime" : "2014-06-24T12:29:12Z",
      "startTime" : "2014-06-24T12:22:56Z",
      "km" : 6
    },
    {
      "totalTime" : 440000,
      "paused" : {
        "totalPauseTime" : null,
        "endTime" : [ ],
        "startTime" : [ ]
      },
      "rest" : false,
      "endTime" : "2014-06-24T12:36:32Z",
      "startTime" : "2014-06-24T12:29:12Z",
      "km" : 7
    }
  ]
};

module.exports = summary;