angular.module('MainApp.controllers').controller('DetailCtrl', function ($scope, $rootScope, $http, $route, $location) {
  if (!$rootScope.user.isLoggedIn) {
    $location.path('/')
  }
  var config = {
    headers: {
      'Authorization': 'Bearer ' + $rootScope.user.token,
      'Accept': 'application/json'
    }
  }
  $http.get($rootScope.baseURI + '/task/' + $route.current.params['id'], config)
    .then(function (response) {
      console.log(response);
      $scope.task = response['data']['task']
    },
    function (response) {
      $rootScope.addAlert('warning', 'could not fetch details')
    })
  $scope.complete = function () {
    $http.put($rootScope.baseURI + '/task/' + $route.current.params['id'], 
    JSON.stringify({ 'done': true }), config)
      .then(function (response) {
        console.log(JSON.stringify(response, null, 2));
        $scope.task = response['data']['task']
        $rootScope.addAlert('success', 'task marked complete')
      },
      function (response) {
        $rootScope.addAlert('warning', 'please check your internet connection')
      })
  }
  $scope.delete = function () {
    $http.delete($rootScope.baseURI + '/task/' + $route.current.params['id'], config)
      .then(function (response) {
        $rootScope.addAlert('success', 'task deleted')
        $location.path('/')
      },
      function (response) {
        console.log(response)
        $rootScope.addAlert('warning', 'please check your internet connection')
      })
  }
});
