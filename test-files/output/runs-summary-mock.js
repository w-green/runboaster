// stub used in runs-summary.server.model.test.js
// and runs-summary.server.routes.test.js

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
  "markerItems" :
    [
      {
        "km": 1,
        "coords": {
          "longitude": -0.234291,
          "latitude": 51.45699
        },
        "startTime": "2014-08-21T13:27:42.000Z",
        "endTime": "2014-08-21T13:32:31.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 289000
      },
      {
        "km": 2,
        "coords": {
          "longitude": -0.234546,
          "latitude": 51.448268
        },
        "startTime": "2014-08-21T13:32:31.000Z",
        "endTime": "2014-08-21T13:37:43.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 312000
      },
      {
        "km": 3,
        "coords": {
          "longitude": -0.230886,
          "latitude": 51.439884
        },
        "startTime": "2014-08-21T13:37:43.000Z",
        "endTime": "2014-08-21T13:42:50.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 307000
      },
      {
        "km": 4,
        "coords": {
          "longitude": -0.233171,
          "latitude": 51.444078
        },
        "startTime": "2014-08-21T13:42:50.000Z",
        "endTime": "2014-08-21T13:55:39.000Z",
        "rest": true,
        "paused": {
          "startTime": [
            "2014-08-21T13:44:04.000Z"
          ],
          "endTime": [
            "2014-08-21T13:52:00.000Z"
          ],
          "totalPauseTime": 476000
        },
        "totalTime": 293000
      },
      {
        "km": 5,
        "coords": {
          "longitude": -0.23311,
          "latitude": 51.452541
        },
        "startTime": "2014-08-21T13:55:39.000Z",
        "endTime": "2014-08-21T14:00:45.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 306000
      },
      {
        "km": 6,
        "coords": {
          "longitude": -0.230128,
          "latitude": 51.459166
        },
        "startTime": "2014-08-21T14:00:45.000Z",
        "endTime": "2014-08-21T14:05:13.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 268000
      }
    ]
};

module.exports = summary;