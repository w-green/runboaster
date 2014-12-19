'use strict';

(function() {

var config = function($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url : '/dashboard',
      resolve : {
        getSummariesOneRes : ['getSummaries', function(getSummaries) {
          return getSummaries.get();
        }],
        getRunRes : ['getRuns', function(getRuns) {
          return getRuns.get();
        }],
        getSummariesFormattedOneRes : ['getSummaries', 'formatSummaries', function(getSummaries, formatSummaries) {
          var queryOptions = {
            limit : 1
          };
          // format the summs for the table directive
          // - directive needs to know number of markers etc
          var formattedSumms =
            getSummaries
              .get(queryOptions)
              .then(function(d) {
                return formatSummaries(d);
              });
          return formattedSumms;
        }]
      },
      views : {
        '' : {
          templateUrl: 'modules/dashboard/views/dashboard.client.view.html'
        },
        'chartLine@dashboard' : {
          templateUrl : 'modules/dashboard/views/dashboard-chart-line.client.view.html',
          controller : 'DashboardChartlineCtrl'
        },
        'summary@dashboard' : {
          templateUrl : 'modules/runs/views/run-table.client.view.html',
          controller : 'DashboardSummCtrl'
        },
        'map@dashboard' : {
          templateUrl : 'modules/gmap/views/run-map.client.view.html',
          controller : 'DashboardMapCtrl'
        }
      }
    });

}; // config

angular.module('dashboard').config(['$stateProvider', config]);

})();



