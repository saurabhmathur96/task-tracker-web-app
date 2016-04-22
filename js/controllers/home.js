angular.module('MainApp.controllers').controller('HomeCtrl', function ($scope, $rootScope, $http, $location, $cookies, jwtHelper) {
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
    $scope.items = $rootScope.user.tasks
    console.log(JSON.stringify($scope.items, null, 2))
    
    /*$scope.tasks = $rootScope.user.tasks.map(function(value, index) {
      return value
    })*/

    $http.get($rootScope.baseURI +'/task', config)
         .then(function (response) {
           
           var tasks = response['data']['tasks']
           for(var i=0; i<tasks.length; i++) {
             $rootScope.user.tasks[tasks[i]['_id']] = tasks[i]
           }
           
           
            
           
         }, function (response) {
           
           $rootScope.addAlert('warning', 'please check your internet connection')
         })
  }


})
