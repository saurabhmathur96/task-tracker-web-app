angular.module('MainApp.controllers').controller('HomeCtrl', function ($scope, $rootScope, $http, $location, $cookies, jwtHelper) {
  if (!$rootScope.user.isLoggedIn) {
    // do nothing
  } else {
    var config = {
      headers : {
        'Authorization': 'Bearer ' + $rootScope.user.token
      }
    }
    
    $scope.isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
    
    var name = jwtHelper.decodeToken($rootScope.user.token)['name']
    $rootScope.user.name = name
    $scope.items = $rootScope.user.tasks
    
    $scope.refresh = function () {
      $http.get($rootScope.baseURI +'/task', config)
         .then(function (response) {
           
           var tasks = response['data']['tasks']
           
           console.log
           
           for(var i=0; i<tasks.length; i++) {
             if (!$rootScope.user.tasks.hasOwnProperty(tasks[i]['_id'])) {
               $rootScope.user.tasks[tasks[i]['_id']] = tasks[i]
             }
           }
           
           console.log(tasks)
           for(var id in $rootScope.user.tasks) {
             if ($rootScope.user.tasks.hasOwnProperty(id)) {
               console.log(id)
               if (tasks.find(function(task) { return task._id == id}) == null) {
                 delete $rootScope.user.tasks[id]
               }
             }
           }
            
           
         }, function (response) {
           
           $rootScope.addAlert('warning', 'please check your internet connection')
         })
    }
    
    $scope.refresh()
    
  }


})
