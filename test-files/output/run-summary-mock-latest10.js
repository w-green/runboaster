'use strict';
// used in testing custom chart tests, and runs services tests

var mockLatest10Summaries =
{
  "runs": [
    {
      "markers": [
        {
          "km": 1,
          "time": 315000
        },
        {
          "km": 2,
          "time": 349000
        },
        {
          "km": 3,
          "time": 339000
        },
        {
          "km": 4,
          "time": 328000
        },
        {
          "km": 5,
          "time": 338000
        },
        {
          "km": 6,
          "time": 322000
        }
      ],
      "startTime": "2014-06-26T10:01:44.000Z",
      "totalDistance": 6.663,
      "totalTime": 1991000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 330000
        },
        {
          "km": 2,
          "time": 334000
        },
        {
          "km": 3,
          "time": 305000
        },
        {
          "km": 4,
          "time": 316000
        },
        {
          "km": 5,
          "time": 351000
        },
        {
          "km": 6,
          "time": 293000
        }
      ],
      "startTime": "2014-07-22T13:14:45.000Z",
      "totalDistance": 6.543,
      "totalTime": 1929000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 331000
        },
        {
          "km": 2,
          "time": 344000
        },
        {
          "km": 3,
          "time": 292000
        },
        {
          "km": 4,
          "time": 360000
        },
        {
          "km": 5,
          "time": 397000
        },
        {
          "km": 6,
          "time": 376000
        },
        {
          "km": 7,
          "time": 440000
        }
      ],
      "startTime": "2014-06-24T11:45:35.000Z",
      "totalDistance": 7.406,
      "totalTime": 2540000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 328000
        },
        {
          "km": 2,
          "time": 331000
        },
        {
          "km": 3,
          "time": 294000
        },
        {
          "km": 4,
          "time": 293000
        },
        {
          "km": 5,
          "time": 313000
        },
        {
          "km": 6,
          "time": 282000
        }
      ],
      "startTime": "2014-08-04T13:16:16.000Z",
      "totalDistance": 6.513,
      "totalTime": 1841000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 333000
        },
        {
          "km": 2,
          "time": 345000
        },
        {
          "km": 3,
          "time": 377000
        },
        {
          "km": 4,
          "time": 264000
        },
        {
          "km": 5,
          "time": 298000
        },
        {
          "km": 6,
          "time": 274000
        }
      ],
      "startTime": "2014-07-21T13:34:47.000Z",
      "totalDistance": 6.053,
      "totalTime": 1891000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 309000
        },
        {
          "km": 2,
          "time": 351000
        },
        {
          "km": 3,
          "time": 321000
        },
        {
          "km": 4,
          "time": 316000
        },
        {
          "km": 5,
          "time": 318000
        },
        {
          "km": 6,
          "time": 288000
        }
      ],
      "startTime": "2014-07-25T16:36:27.000Z",
      "totalDistance": 6.53,
      "totalTime": 1903000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 310000
        },
        {
          "km": 2,
          "time": 331000
        },
        {
          "km": 3,
          "time": 282000
        },
        {
          "km": 4,
          "time": 320000
        },
        {
          "km": 5,
          "time": 305000
        },
        {
          "km": 6,
          "time": 291000
        }
      ],
      "startTime": "2014-07-24T12:53:13.000Z",
      "totalDistance": 6.588,
      "totalTime": 1839000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 291000
        },
        {
          "km": 2,
          "time": 332000
        },
        {
          "km": 3,
          "time": 306000
        },
        {
          "km": 4,
          "time": 310000
        },
        {
          "km": 5,
          "time": 328000
        },
        {
          "km": 6,
          "time": 287000
        }
      ],
      "startTime": "2014-08-07T20:23:56.000Z",
      "totalDistance": 6.51,
      "totalTime": 1854000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 289000
        },
        {
          "km": 2,
          "time": 312000
        },
        {
          "km": 3,
          "time": 307000
        },
        {
          "km": 4,
          "time": 293000
        },
        {
          "km": 5,
          "time": 306000
        },
        {
          "km": 6,
          "time": 268000
        }
      ],
      "startTime": "2014-08-21T13:27:42.000Z",
      "totalDistance": 6.508,
      "totalTime": 1775000
    },
    {
      "markers": [
        {
          "km": 1,
          "time": 296000
        },
        {
          "km": 2,
          "time": 330000
        },
        {
          "km": 3,
          "time": 293000
        },
        {
          "km": 4,
          "time": 301000
        },
        {
          "km": 5,
          "time": 312000
        },
        {
          "km": 6,
          "time": 288000
        }
      ],
      "startTime": "2014-08-01T09:19:39.000Z",
      "totalDistance": 6.534,
      "totalTime": 1820000
    }
  ],
  "markerSize": [
    6,
    6,
    7,
    6,
    6,
    6,
    6,
    6,
    6,
    6
  ],
  "longestMarkerTime": 440000,
  "shortestMarkerTime": 264000
};

angular.module('mocks')
  .value('mockLatest10Summaries', mockLatest10Summaries);