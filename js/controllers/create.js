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
            $rootScope.addAlert('success', 'task created')
            $location.path('/')
          },
          function(response) {
            $rootScope.addAlert('warning', 'could not create task')
            
          })
    }
  }
})
