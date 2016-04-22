var app = angular.module('MainApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngCookies',
  'angular-jwt',
  'ngSanitize',
  'btford.markdown',
  'MainApp.controllers'
])

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/task/:id', {
      templateUrl: 'partials/detail.html',
      controller: 'DetailCtrl'
    })
    .when('/create', {
      templateUrl: 'partials/create.html',
      controller: 'CreateCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.run(function ($rootScope, $cookies, $location, $timeout) {
  $rootScope.baseURI = 'https://mysterious-fortress-73870.herokuapp.com/api/v1'
  // $rootScope.baseURI = 'http://localhost:3000/api/v1'
  $rootScope.navbarCollapsed = true
  $rootScope.alerts = [];
  $rootScope.close = function (index) {
    $rootScope.alerts.splice(index, 1);
  }
  
  $rootScope.addAlert = function (type, text) {
    $rootScope.alerts.push({
      type: type,
      text: text
    });
    $timeout(function () {
      $rootScope.close($rootScope.alerts.indexOf(alert))
    }, 3000)
  }

  var user = $cookies.getObject('user')

  if (user == null) {
    $rootScope.user = {
      isLoggedIn: false,
      token: null,
      tasks: {}
    }
    $location.path('/login')
  } else {
    $rootScope.user = user
  }

  $rootScope.logout = function() {
    $rootScope.user = {
      isLoggedIn: false,
      token: null,
      tasks: {}
    }
    $cookies.remove('user')
    $location.path('/login')
  }

})
