angular.module('MainApp.controllers').controller('HomeCtrl', function ($scope, $rootScope, $http, $location, jwtHelper, $cookies) {
  if (!$rootScope.user.isLoggedIn) {
    // do nothing
  } else {
    var config = {
      headers : {
        'Authorization': 'Bearer ' + $rootScope.user.token
      }
    }
    var name = jwtHelper.decodeToken($rootScope.user.token)['name']
    $rootScope.user.name = name
    var tasks = $cookies.getObject('tasks')
    if (tasks != null) {
      $scope.items = tasks
    }
    
    $http.get($rootScope.baseURI +'/task', config)
         .then(function (response) {
           
           $scope.items = response['data']['tasks']
           $cookies.putObject('tasks', $scope.items)
         }, function (response) {
           
           $rootScope.addAlert('warning', 'please check your internet connection')
         })
  }


})
