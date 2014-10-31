'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'mean';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'google-maps'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('charts', ['runs']);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('runs', [
  'ngResource',
  'ui.router',
  'google-maps'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('upload-data', [
  'angularFileUpload',
  'ngResource',
  'ui.router'
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('visualisations');'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
    Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('charts').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('charts', {
      url: '/my/runs/charts',
      resolve: {
        runsSummaries: [
          'runsService',
          function (runsService) {
            return runsService.getRuns().$promise;
          }
        ]
      },
      templateUrl: 'modules/charts/views/charts.client.view.html',
      controller: 'chartsCtrl'
    });
  }
]);'use strict';
(function () {
  var chartsCtrl = function chartsCtrl($scope, runsSummaries) {
    $scope.runs = runsSummaries;  // console.log(runs);
  };
  angular.module('charts').controller('chartsCtrl', [
    '$scope',
    'runsSummaries',
    chartsCtrl
  ]);
}());'use strict';
(function () {
  var lChart = function lChart($window, $filter) {
    return {
      restrict: 'E',
      template: '<svg width="800" height="500"></svg>',
      link: function (scope, elem, attr) {
        var runs = scope.runs;
        var pathClass = 'path';
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;
        var getScreenWidth;
        var d3 = $window.d3;
        var rawSvg = elem.find('svg');
        var svg = d3.select(rawSvg[0]);
        var padding = 20;
        // pads the chart inside of the svg
        var chartWidth = rawSvg.attr('width') - padding;
        var chartHeight = rawSvg.attr('height') - padding;
        var data = [];
        var markerSize = [];
        var longestMarkerTime = 0;
        var shortestMarkerTime = 0;
        var xAxis_base;
        var markerCount;
        // Define the div for the tooltip
        var div = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
        createDataOb();
        markerCount = d3.max(markerSize);
        drawAxis();
        var tip = d3.tip().attr('class', 'd3-tip').offset([
            -10,
            0
          ]).html(function (d) {
            return 'KM: ' + d.km + '<br/>' + 'time: ' + d3.time.format('%M:%S')(new Date(d.time));  // return div.html('KM: ' + d.km + "<br/>" + 'time: ' + d3.time.format("%M:%S")(new Date(d.time)) );
                                                                                                    // return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
          });
        svg.call(tip);
        data.forEach(function (d) {
          drawLines(d);
          // Add the scatterplot
          svg.selectAll('dot').data(d.markers).enter().append('circle').attr('r', 5).attr('cx', function (d) {
            return xScale(d.km);
          }).attr('cy', function (d) {
            return yScale(d.time);
          }).on('mouseover', tip.show).on('mouseout', tip.hide);
        });
        /*          // Add the scatterplot
          svg.selectAll("dot")
              .data(d.markers)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return xScale(d.km); })
              .attr("cy", function(d) { return yScale(d.time); })
              .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  // div.html(formatTime(d.time) + "<br/>"  + d.km)
                  div.html('KM: ' + d.km + "<br/>" + 'time: ' + d3.time.format("%M:%S")(new Date(d.time)) )
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
        });*/
        /*  // the data layout produced from createDataOb()
          var data = [
            markers : [ {km : 1, time : 291000}, {km : 2, time : 332000}, {km : 3, time : 332000} ],  startTime: "2014-08-07T20:23:56.000Z", totalDistance: 6.51, totalTime: 1854000},
            markers : [ {km : 1, time : 291000}, {km : 2, time : 332000}, {km : 3, time : 332000} ],  startTime: "2014-08-07T20:23:56.000Z", totalDistance: 6.51, totalTime: 1854000},
            etc...
          ]
        */
        function createDataOb() {
          runs.forEach(function (run) {
            var markersLen;
            var runData = {};
            runData.markers = [];
            markersLen = run.markerItems.length;
            markerSize.push(markersLen);
            runData.startTime = run.startTime;
            run.markerItems.forEach(function (marker) {
              if (shortestMarkerTime === 0) {
                shortestMarkerTime = marker.totalTime;
              } else {
                if (marker.totalTime < shortestMarkerTime) {
                  shortestMarkerTime = marker.totalTime;
                }
              }
              if (marker.totalTime > longestMarkerTime) {
                longestMarkerTime = marker.totalTime;
              }
              var markerData = {
                  km: marker.km,
                  time: marker.totalTime
                };
              runData.markers.push(markerData);
            });
            runData.totalDistance = run.totalDistanceKm;
            runData.totalTime = run.totalTime;
            data.push(runData);
          });
        }
        //createDataOb
        /*
        // Gets screen width of device
        getScreenWidth = function getScreenWidth() {
          var resolution = window.devicePixelRatio||screen.pixelDepth||screen.colorDepth;
          var clientWidth = document.documentElement.clientWidth;
          var screenWidth;
          deviceScreenWidth = clientWidth / resolution;
          return deviceScreenWidth;
        }; // getScreenWidth
        */
        // setting the values of the vars declared earlier
        function setChartParameters() {
          if (shortestMarkerTime !== 0) {
            xAxis_base = shortestMarkerTime / 1.1;
          }
          xScale = d3.scale.linear().domain([
            1,
            markerCount
          ]).range([
            50,
            chartWidth
          ]);
          yScale = d3.time.scale().domain([
            xAxis_base,
            longestMarkerTime
          ]).range([
            chartHeight,
            0
          ]);
          xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').ticks(markerCount);
          yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(d3.time.seconds, 15).tickFormat(d3.time.format('%Mm %Ss'));
          // .ticks(5);
          lineFun = d3.svg.line().x(function (d) {
            return xScale(d.km);
          }).y(function (d) {
            return yScale(d.time);
          }).interpolate('linear');
        }
        // setChartParameters
        // utility function for generating path colours
        function getRandomColor() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        // getRandomColor
        function drawAxis() {
          setChartParameters();
          svg.append('svg:g').attr('class', 'x axis').attr('transform', 'translate(0, 470)').call(xAxisGen);
          svg.append('svg:g').attr('class', 'y axis').attr('transform', 'translate(45,0)').call(yAxisGen);
        }
        // drawAxis
        function drawLines(d) {
          svg.append('svg:path').attr({
            d: lineFun(d.markers),
            'stroke': getRandomColor(),
            'stroke-width': 2,
            'fill': 'none',
            'class': pathClass
          });
        }  // drawLines
      }  // link
    };  // returned object
  };
  // lChart
  angular.module('charts').directive('lChart', [
    '$window',
    '$filter',
    lChart
  ]);
}());'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Setting up route
angular.module('runs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Runs state routing
    $stateProvider.state('listRuns', {
      url: '/runs',
      resolve: {
        runsSummaries: [
          'runsService',
          function (runsService) {
            return runsService.getRuns().$promise;
          }
        ]
      },
      templateUrl: 'modules/runs/views/list-runs.client.view.html',
      controller: 'MyRunsCtrl as myRuns'
    }).state('run', {
      url: '/run',
      views: {
        '': { templateUrl: 'modules/runs/views/run.client.view.html' },
        'columnOne@run': { templateUrl: 'modules/runs/views/run-single.client.view.html' },
        'columnTwo@run': {
          templateUrl: 'modules/runs/views/run-map.client.view.html',
          controller: 'MyMapsCtrl as mapsCtrl'
        }
      }
    });
  }
]);'use strict';
(function (lodash) {
  var _ = lodash;
  // MyRunsCtrl controller constructor function
  function MyRunCtrl($state) {
    var that = this;
    that.name = 'hello world';
    $state.transitionTo('run.map');
  }
  angular.module('runs').controller('MyRunCtrl', MyRunCtrl);
}(window._));'use strict';
(function (lodash, google) {
  var _ = lodash;
  if (google === 'undefined') {
    return;
  }
  // MyRunsCtrl controller constructor function
  function MyMapsCtrl() {
    var that = this;
    that.name = 'hello world';
    that.map = {
      center: {
        latitude: 51.459545,
        longitude: -0.220431
      },
      zoom: 14
    };
    that.marker = {
      id: 0,
      coords: {
        latitude: 51.459545,
        longitude: -0.220431
      },
      options: { draggable: true },
      label: 'START'
    };
    that.polylines = {
      id: 1,
      path: [
        {
          latitude: 51.459545,
          longitude: -0.220431
        },
        {
          latitude: 51.458987,
          longitude: -0.232163
        },
        {
          latitude: 51.458532,
          longitude: -0.23477
        },
        {
          latitude: 51.451967,
          longitude: -0.232989
        }
      ],
      stroke: {
        color: '#ff0000',
        weight: 3
      },
      visible: true,
      editable: false,
      draggable: false
    };
    // We want the distance of the polyline
    // Returns an array of LtLng objects for the google maps computeLength()
    var paths = that.polylines.path.map(function (currentVal, index, array) {
        return new google.maps.LatLng(currentVal.latitude, currentVal.longitude);
      });
    that.distance = function () {
      var meterResult = google.maps.geometry.spherical.computeLength(paths);
      var kilometerResult = metersToKilometers(meterResult);
      return Math.round(100 * kilometerResult) / 100;  // rounding to 2 decimal places
    }();
    function metersToKilometers(meters) {
      return meters / 1000;
    }
  }
  angular.module('runs').controller('MyMapsCtrl', MyMapsCtrl);
}(window._, window.google));'use strict';
(function (lodash) {
  var _ = lodash;
  // MyRunsCtrl controller constructor function
  function MyRunsCtrl(runsSummaries) {
    var that = this;
    var sortedAsc = false;
    // used as a signal for sortResults()
    var sortByDateAsc = false;
    // used as a signal for sortByDate()
    that.runs = runsSummaries;
    that.sortedRuns = null;  /*    // sort results by date
    that.sortByDate = function sortByDate(runs) {
      if (sortByDateAsc === false) {
        sortByDateAsc = true;
        that.sortedRuns = _.sortBy(runs, 'date');
      } else {
        sortByDateAsc = false;
        that.sortedRuns = _.sortBy(runs, 'date').reverse();
      }
    };

    // sort results by time
    that.sortByTime = function sortByTime() {
      if (sortedAsc === false) {
        sortedAsc = true;
        that.sortedRuns = _.sortBy(that.Allruns, 'time');
      } else {
        sortedAsc = false;
        that.sortedRuns = _.sortBy(that.Allruns, 'time').reverse();
      }

    };*/
  }
  angular.module('runs').controller('MyRunsCtrl', [
    'runsSummaries',
    MyRunsCtrl
  ]);
}(window._));'use strict';
(function (lodash) {
  var _ = lodash;
  var runsSummaryTable = function runsSummaryTable($filter) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var runs = scope.myRuns.runs;
        // creates placeholder container
        var docFragment = document.createDocumentFragment();
        var tableOfRuns = createTableOfRuns(runs);
        // layout our table.
        function createTableOfRuns(runs) {
          var table = document.createElement('table');
          table.className = 'table table-responsive table-hover';
          var thead = document.createElement('thead');
          var headingRow;
          var tableHeadings;
          var tableData;
          var markerSize;
          var headings = {
              date: 'Date',
              markers: 0,
              totalDistance: 'Total Distance',
              totalTime: 'Total Time'
            };
          // amends headings.markers to get highest number of markers
          getMarkerSize(runs, headings);
          markerSize = headings.markers;
          // headingRow = document.createDocumentFragment();
          headingRow = document.createElement('tr');
          tableHeadings = createTableHeadings(headings, headingRow);
          thead.appendChild(headingRow);
          table.appendChild(thead);
          tableData = createTableData(runs, markerSize, $filter);
          table.appendChild(tableData);
          return table;
          function getMarkerSize(runs, headings) {
            // used for marker heading - to work out total no. of markers
            // default = 0 incase it is not resolved (otherwise it runs to infinity)
            var markers = [];
            // create the headings
            runs.forEach(function (run) {
              // push to markers so we can get the max marker value
              markers.push(run.markerItems.length);
            });
            var markerSize = _.max(markers);
            headings.markers = markerSize;
          }
          function createTableHeadings(headings, headingRow) {
            for (var heading in headings) {
              if (headings.hasOwnProperty(heading)) {
                var container = document.createDocumentFragment();
                if (heading === 'markers') {
                  var markerSize = headings[heading];
                  for (var i = 1; i <= markerSize; i++) {
                    var thd = document.createElement('th');
                    var km = document.createTextNode('km ' + i);
                    thd.appendChild(km);
                    container.appendChild(thd);
                  }
                } else {
                  var thd2 = document.createElement('th');
                  thd2.appendChild(document.createTextNode(headings[heading]));
                  container.appendChild(thd2);
                }
                headingRow.appendChild(container);
              }
            }
            return headingRow;
          }
          function createTableData(runs, markersSize, $filter) {
            var markerSize = markersSize;
            var container = document.createElement('tbody');
            // var container = document.createDocumentFragment();
            runs.forEach(function (run) {
              var tr = document.createElement('tr');
              var tdStartTime = document.createElement('td');
              // use filter to change timestamp to time
              var sTime = $filter('date')(run.startTime, 'EEEE MMM d, y h:mm:ss a');
              tdStartTime.appendChild(document.createTextNode(sTime));
              tr.appendChild(tdStartTime);
              for (var i = 0; i < markerSize; i++) {
                var td = document.createElement('td');
                var markerTime;
                var data;
                if (run.markerItems[i]) {
                  markerTime = run.markerItems[i].totalTime;
                  data = $filter('date')(markerTime, 'm:ss');
                } else {
                  data = '';
                }
                td.appendChild(document.createTextNode(data));
                tr.appendChild(td);
              }
              var tdTotalDist = document.createElement('td');
              var dist = +run.totalDistanceKm.toFixed(2);
              tdTotalDist.appendChild(document.createTextNode(dist));
              tr.appendChild(tdTotalDist);
              var tdTotalTime = document.createElement('td');
              var time = $filter('date')(run.totalTime, 'HH:mm:ss');
              tdTotalTime.appendChild(document.createTextNode(time));
              tr.appendChild(tdTotalTime);
              container.appendChild(tr);
            });
            return container;
          }
        }
        element.append(tableOfRuns);
      }
    };
  };
  angular.module('runs').directive('runsSummaryTable', [
    '$filter',
    runsSummaryTable
  ]);
}(window._));'use strict';
// As a factory
// (function() {
var runsService = function ($resource) {
  var runs = {
      resource: $resource('/my/runs/', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        create: { method: 'POST' }
      }),
      getRuns: function getRuns() {
        if (this.data !== null) {
          return this.data;
        }
        this.data = this.resource.query();
        return this.data;
      },
      data: null
    };
  return runs;
};
angular.module('runs').factory('runsService', [
  '$resource',
  runsService
]);  // }());
'use strict';
/*
 * Decorator for Angular File Upload service
 * Adds functionality to check the suffix of a file
 * $upload: a service from Angular file upload,
 * $delegate: the original service (in this case $upload) which is returned
 *  with the added functionality
 */
angular.module('upload-data').config([
  '$provide',
  function ($provide) {
    $provide.decorator('$upload', function ($delegate) {
      $delegate.checkSuffix = function checkSuffix(suffix, name) {
        var testSuffix = new RegExp('.' + suffix);
        return testSuffix.test(name.slice(-4));  // true / false
      };
      return $delegate;
    });
  }
]);'use strict';
// Setting up route
angular.module('upload-data').config([
  '$stateProvider',
  function ($stateProvider) {
    // Runs state routing
    $stateProvider.state('upload', {
      url: '/my/upload/gpx',
      templateUrl: 'modules/upload-data/views/upload-data.client.view.html',
      controller: 'UploadDataCtrl'
    });
  }
]);'use strict';
/*
 * Upload a file to the database
 * Params: upload data service
 */
var UploadDataCtrl = function UploadDataCtrl($scope, $upload) {
  /*  // allows us to see the file that was uploaded
  document.getElementById("uploadBtn").onchange = function () {
      document.getElementById("uploadFile").value = this.value;
  };*/
  $scope.message = [];
  $scope.message.push('<p></p>');
  $scope.fileName = 'Choose file';
  $scope.onFileSelect = function ($files) {
    //$files: an array of files selected, each file has name, size, and type.
    function uploadSuccess(data, status, headers, config) {
      // file is uploaded successfully
      $scope.message.push('<li class="bg-success">Successfully uploaded: ' + config.file.name + '</li>');
    }
    function uploadProgress(evt) {
      console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
    }
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      // We've added a decorator to check the suffix
      // returns true if suffix is gpx
      var isitGpx = $upload.checkSuffix('gpx', file.name);
      if (isitGpx === false) {
        $scope.message.push('<li class="bg-danger">The file needs to be a gpx : ' + file.name + '</li>');
        continue;
      }
      $scope.upload = $upload.upload({
        url: '/upload',
        method: 'POST',
        file: file
      }).progress(uploadProgress).success(uploadSuccess);  //.error(...)
                                                           //.then(success, error, progress);
                                                           // access or attach event listeners to the underlying XMLHttpRequest.
                                                           //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }  /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
       // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
};
angular.module('upload-data').controller('UploadDataCtrl', [
  '$scope',
  '$upload',
  UploadDataCtrl
]);// directiveFactory
var uploadFileName = function uploadFileName($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      function compileMe(toBeCompiled) {
        return $compile(toBeCompiled)(scope);
      }
      scope.$watchCollection('message', function () {
        var num = scope.message.length - 1;
        var newEl = compileMe(scope.message[num]);
        var resultsList = document.getElementById('uploadResults');
        angular.element(resultsList).prepend(newEl);
      });
    }
  };
};
angular.module('upload-data').directive('uploadFileName', [
  '$compile',
  uploadFileName
]);'use strict';
var uploadService = function uploadService($resource) {
  return $resource('/upload');
};
angular.module('upload-data').factory('uploadService', [
  '$resource',
  uploadService
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('visualisations').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('vis', {
      url: '/my/runs/linechart',
      templateUrl: 'modules/visualisations/views/vis.client.view.html',
      controller: 'MyVisCtrl'
    });
  }
]);'use strict';
(function () {
  var MyVisCtrl = function MyVisCtrl($scope) {
    $scope.salesData = [
      {
        hour: 1,
        sales: 54
      },
      {
        hour: 2,
        sales: 66
      },
      {
        hour: 3,
        sales: 77
      },
      {
        hour: 4,
        sales: 70
      },
      {
        hour: 5,
        sales: 60
      },
      {
        hour: 6,
        sales: 63
      },
      {
        hour: 7,
        sales: 55
      },
      {
        hour: 8,
        sales: 47
      },
      {
        hour: 9,
        sales: 55
      },
      {
        hour: 10,
        sales: 30
      }
    ];
    $scope.name = 'ME';
  };
  angular.module('visualisations').controller('MyVisCtrl', [
    '$scope',
    MyVisCtrl
  ]);
}());'use strict';
// (function() {
var linearChart = function linearChart($parse, $window) {
  return {
    restrict: 'EA',
    template: '<svg width="850" height="200"></svg>',
    link: function (scope, elem, attrs) {
      var exp = $parse(attrs.chartData);
      var salesDataToPlot = exp(scope);
      var padding = 20;
      var pathClass = 'path';
      var xScale, yScale, xAxisGen, yAxisGen, lineFun;
      var d3 = $window.d3;
      var rawSvg = elem.find('svg');
      var svg = d3.select(rawSvg[0]);
      scope.$watchCollection(exp, function (newVal, oldVal) {
        salesDataToPlot = newVal;
        redrawLineChart();
      });
      function setChartParameters() {
        xScale = d3.scale.linear().domain([
          salesDataToPlot[0].hour,
          salesDataToPlot[salesDataToPlot.length - 1].hour
        ]).range([
          padding + 5,
          rawSvg.attr('width') - padding
        ]);
        yScale = d3.scale.linear().domain([
          0,
          d3.max(salesDataToPlot, function (d) {
            return d.sales;
          })
        ]).range([
          rawSvg.attr('height') - padding,
          0
        ]);
        xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').ticks(salesDataToPlot.length - 1);
        yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(5);
        lineFun = d3.svg.line().x(function (d) {
          return xScale(d.hour);
        }).y(function (d) {
          return yScale(d.sales);
        }).interpolate('basis');
      }
      function drawLineChart() {
        setChartParameters();
        svg.append('svg:g').attr('class', 'x axis').attr('transform', 'translate(0,180)').call(xAxisGen);
        svg.append('svg:g').attr('class', 'y axis').attr('transform', 'translate(20,0)').call(yAxisGen);
        svg.append('svg:path').attr({
          d: lineFun(salesDataToPlot),
          'stroke': 'blue',
          'stroke-width': 1,
          'fill': 'none',
          'class': pathClass
        });
      }
      function redrawLineChart() {
        setChartParameters();
        svg.selectAll('g.y.axis').call(yAxisGen);
        svg.selectAll('g.x.axis').call(xAxisGen);
        svg.selectAll('.' + pathClass).attr({ d: lineFun(salesDataToPlot) });
      }
      drawLineChart();
    }
  };
};
angular.module('visualisations').directive('linearChart', [
  '$parse',
  '$window',
  linearChart
]);  // }());
