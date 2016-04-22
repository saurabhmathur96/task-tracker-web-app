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
  
  var taskId = $route.current.params['id']
  
  $scope.task = $rootScope.user.tasks[taskId]
  console.log($scope.task)
  
  
  
  $http.get($rootScope.baseURI + '/task/' + taskId, config)
    .then(function (response) {
      console.log(response);
      var task = response['data']['task']
      $scope.task = task
      $rootScope.user.tasks[taskId] = task
    },
    function (response) {
      $rootScope.addAlert('warning', 'could not fetch details')
    })
  
  
  $scope.complete = function () {
    $http.put($rootScope.baseURI + '/task/' + taskId, 
    JSON.stringify({ 'done': true }), config)
      .then(function (response) {
        console.log(JSON.stringify(response, null, 2));
        var task = response['data']['task']
        $scope.task = task
        $rootScope.user.tasks[taskId] = task
        $rootScope.addAlert('success', 'task marked complete')
      },
      function (response) {
        $rootScope.addAlert('warning', 'please check your internet connection')
      })
  }
  $scope.delete = function () {
    $http.delete($rootScope.baseURI + '/task/' + taskId, config)
      .then(function (response) {
        $rootScope.addAlert('success', 'task deleted')
        delete $rootScope.user.tasks[taskId]
        $location.path('/')
      },
      function (response) {
        console.log(response)
        $rootScope.addAlert('warning', 'please check your internet connection')
      })
  }
});
