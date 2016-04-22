angular.module('MainApp.controllers').controller('CreateCtrl', function($scope, $rootScope, $http, $location) {
  if (!$rootScope.user.isLoggedIn) {
    $location.path('/')
  } else {
    $scope.create = function() {
      var config = {
        headers: {
          'Authorization': 'Bearer ' + $rootScope.user.token,
        }
      }

      $http.post($rootScope.baseURI + '/task', JSON.stringify($scope.task), config)
        .then(function(response) {
            
            var task = response['data']['task']
            $scope.task = task
            $rootScope.user.tasks[task._id] = task
            
            $rootScope.addAlert('success', 'task created')
            $location.path('/')
          },
          function(response) {
            $rootScope.addAlert('warning', 'could not create task')
            
          })
    }
  }
})
