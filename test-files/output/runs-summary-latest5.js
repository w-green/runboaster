'use strict';

// Mock for jasmine tests.

var mockLatest5Summaries =

[
  {
    "_id": "547f4035dd11b0fd3a0ee865",
    "totalDistanceKm": 6.508,
    "totalTime": 1775000,
    "startTime": "2014-08-21T13:27:42.000Z",
    "endTime": "2014-08-21T14:05:13.000Z",
    "avgSpeedPerKm": 295833.3333333333,
    "restDuration": 476000,
    "user": "547d756bdf8d487811641596",
    "markerItems": [
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
    ],
    "created": "2014-12-03T16:54:13.021Z",
    "__v": 0
  },
  {
    "_id": "547f4034dd11b0fd3a0ee864",
    "totalDistanceKm": 6.471,
    "totalTime": 2019000,
    "startTime": "2014-08-13T20:40:58.000Z",
    "endTime": "2014-08-13T21:24:46.000Z",
    "avgSpeedPerKm": 336500,
    "restDuration": 609000,
    "user": "547d756bdf8d487811641596",
    "markerItems": [
      {
        "km": 1,
        "coords": {
          "longitude": -0.234248,
          "latitude": 51.456935
        },
        "startTime": "2014-08-13T20:40:58.000Z",
        "endTime": "2014-08-13T20:45:44.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 286000
      },
      {
        "km": 2,
        "coords": {
          "longitude": -0.234586,
          "latitude": 51.448236
        },
        "startTime": "2014-08-13T20:45:44.000Z",
        "endTime": "2014-08-13T20:51:06.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 322000
      },
      {
        "km": 3,
        "coords": {
          "longitude": -0.230912,
          "latitude": 51.439928
        },
        "startTime": "2014-08-13T20:51:06.000Z",
        "endTime": "2014-08-13T20:56:28.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 322000
      },
      {
        "km": 4,
        "coords": {
          "longitude": -0.233253,
          "latitude": 51.444337
        },
        "startTime": "2014-08-13T20:56:28.000Z",
        "endTime": "2014-08-13T21:12:13.000Z",
        "rest": true,
        "paused": {
          "startTime": [
            "2014-08-13T20:57:49.000Z"
          ],
          "endTime": [
            "2014-08-13T21:07:58.000Z"
          ],
          "totalPauseTime": 609000
        },
        "totalTime": 336000
      },
      {
        "km": 5,
        "coords": {
          "longitude": -0.233201,
          "latitude": 51.452779
        },
        "startTime": "2014-08-13T21:12:13.000Z",
        "endTime": "2014-08-13T21:18:36.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 383000
      },
      {
        "km": 6,
        "coords": {
          "longitude": -0.229497,
          "latitude": 51.459156
        },
        "startTime": "2014-08-13T21:18:36.000Z",
        "endTime": "2014-08-13T21:24:46.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 370000
      }
    ],
    "created": "2014-12-03T16:54:12.991Z",
    "__v": 0
  },
  {
    "_id": "547f4033dd11b0fd3a0ee860",
    "totalDistanceKm": 6.51,
    "totalTime": 1854000,
    "startTime": "2014-08-07T20:23:56.000Z",
    "endTime": "2014-08-07T21:02:42.000Z",
    "avgSpeedPerKm": 309000,
    "restDuration": 472000,
    "user": "547d756bdf8d487811641596",
    "markerItems": [
      {
        "km": 1,
        "coords": {
          "longitude": -0.234179,
          "latitude": 51.456869
        },
        "startTime": "2014-08-07T20:23:56.000Z",
        "endTime": "2014-08-07T20:28:47.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 291000
      },
      {
        "km": 2,
        "coords": {
          "longitude": -0.234685,
          "latitude": 51.448181
        },
        "startTime": "2014-08-07T20:28:47.000Z",
        "endTime": "2014-08-07T20:34:19.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 332000
      },
      {
        "km": 3,
        "coords": {
          "longitude": -0.230767,
          "latitude": 51.439874
        },
        "startTime": "2014-08-07T20:34:19.000Z",
        "endTime": "2014-08-07T20:39:25.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 306000
      },
      {
        "km": 4,
        "coords": {
          "longitude": -0.233191,
          "latitude": 51.444139
        },
        "startTime": "2014-08-07T20:39:25.000Z",
        "endTime": "2014-08-07T20:52:27.000Z",
        "rest": true,
        "paused": {
          "startTime": [
            "2014-08-07T20:40:31.000Z"
          ],
          "endTime": [
            "2014-08-07T20:48:23.000Z"
          ],
          "totalPauseTime": 472000
        },
        "totalTime": 310000
      },
      {
        "km": 5,
        "coords": {
          "longitude": -0.233327,
          "latitude": 51.452548
        },
        "startTime": "2014-08-07T20:52:27.000Z",
        "endTime": "2014-08-07T20:57:55.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 328000
      },
      {
        "km": 6,
        "coords": {
          "longitude": -0.230011,
          "latitude": 51.459191
        },
        "startTime": "2014-08-07T20:57:55.000Z",
        "endTime": "2014-08-07T21:02:42.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 287000
      }
    ],
    "created": "2014-12-03T16:54:11.781Z",
    "__v": 0
  },
  {
    "_id": "547f4033dd11b0fd3a0ee861",
    "totalDistanceKm": 6.513,
    "totalTime": 1841000,
    "startTime": "2014-08-04T13:16:16.000Z",
    "endTime": "2014-08-04T13:54:51.000Z",
    "avgSpeedPerKm": 306833.3333333333,
    "restDuration": 474000,
    "user": "547d756bdf8d487811641596",
    "markerItems": [
      {
        "km": 1,
        "coords": {
          "longitude": -0.234172,
          "latitude": 51.456838
        },
        "startTime": "2014-08-04T13:16:16.000Z",
        "endTime": "2014-08-04T13:21:44.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 328000
      },
      {
        "km": 2,
        "coords": {
          "longitude": -0.234577,
          "latitude": 51.44809
        },
        "startTime": "2014-08-04T13:21:44.000Z",
        "endTime": "2014-08-04T13:27:15.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 331000
      },
      {
        "km": 3,
        "coords": {
          "longitude": -0.23078,
          "latitude": 51.439791
        },
        "startTime": "2014-08-04T13:27:15.000Z",
        "endTime": "2014-08-04T13:32:09.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 294000
      },
      {
        "km": 4,
        "coords": {
          "longitude": -0.233192,
          "latitude": 51.444055
        },
        "startTime": "2014-08-04T13:32:09.000Z",
        "endTime": "2014-08-04T13:44:56.000Z",
        "rest": true,
        "paused": {
          "startTime": [
            "2014-08-04T13:33:21.000Z"
          ],
          "endTime": [
            "2014-08-04T13:41:15.000Z"
          ],
          "totalPauseTime": 474000
        },
        "totalTime": 293000
      },
      {
        "km": 5,
        "coords": {
          "longitude": -0.233156,
          "latitude": 51.45244
        },
        "startTime": "2014-08-04T13:44:56.000Z",
        "endTime": "2014-08-04T13:50:09.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 313000
      },
      {
        "km": 6,
        "coords": {
          "longitude": -0.230196,
          "latitude": 51.459145
        },
        "startTime": "2014-08-04T13:50:09.000Z",
        "endTime": "2014-08-04T13:54:51.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 282000
      }
    ],
    "created": "2014-12-03T16:54:11.802Z",
    "__v": 0
  },
  {
    "_id": "547f4033dd11b0fd3a0ee85e",
    "totalDistanceKm": 6.534,
    "totalTime": 1820000,
    "startTime": "2014-08-01T09:19:39.000Z",
    "endTime": "2014-08-01T09:57:39.000Z",
    "avgSpeedPerKm": 303333.3333333333,
    "restDuration": 460000,
    "user": "547d756bdf8d487811641596",
    "markerItems": [
      {
        "km": 1,
        "coords": {
          "longitude": -0.234289,
          "latitude": 51.457104
        },
        "startTime": "2014-08-01T09:19:39.000Z",
        "endTime": "2014-08-01T09:24:35.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 296000
      },
      {
        "km": 2,
        "coords": {
          "longitude": -0.234563,
          "latitude": 51.44833
        },
        "startTime": "2014-08-01T09:24:35.000Z",
        "endTime": "2014-08-01T09:30:05.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 330000
      },
      {
        "km": 3,
        "coords": {
          "longitude": -0.231146,
          "latitude": 51.44006
        },
        "startTime": "2014-08-01T09:30:05.000Z",
        "endTime": "2014-08-01T09:34:58.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 293000
      },
      {
        "km": 4,
        "coords": {
          "longitude": -0.23304,
          "latitude": 51.443751
        },
        "startTime": "2014-08-01T09:34:58.000Z",
        "endTime": "2014-08-01T09:47:39.000Z",
        "rest": true,
        "paused": {
          "startTime": [
            "2014-08-01T09:36:22.000Z"
          ],
          "endTime": [
            "2014-08-01T09:44:02.000Z"
          ],
          "totalPauseTime": 460000
        },
        "totalTime": 301000
      },
      {
        "km": 5,
        "coords": {
          "longitude": -0.2331,
          "latitude": 51.45228
        },
        "startTime": "2014-08-01T09:47:39.000Z",
        "endTime": "2014-08-01T09:52:51.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 312000
      },
      {
        "km": 6,
        "coords": {
          "longitude": -0.230481,
          "latitude": 51.4591
        },
        "startTime": "2014-08-01T09:52:51.000Z",
        "endTime": "2014-08-01T09:57:39.000Z",
        "rest": false,
        "paused": {
          "startTime": [],
          "endTime": [],
          "totalPauseTime": null
        },
        "totalTime": 288000
      }
    ],
    "created": "2014-12-03T16:54:11.209Z",
    "__v": 0
  }
];

angular.module('mocks')
  .value('mockSumsLatest5Service', mockLatest5Summaries);

