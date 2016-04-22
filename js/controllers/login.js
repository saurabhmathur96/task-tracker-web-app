angular.module('MainApp.controllers').controller('LoginCtrl', function ($scope, $rootScope, $http, $location, $cookies, jwtHelper) {
  $scope.login = function () {
    $http.post($rootScope.baseURI + '/auth/login', JSON.stringify($scope.userData))
      .then(function (response) {
        var token = response['data']['token']

        $rootScope.user.isLoggedIn = true
        $rootScope.user.token = token

        
        
        var name = jwtHelper.decodeToken($rootScope.user.token)['name']
        $rootScope.user.name = name
        $scope.items = $rootScope.user.tasks
        
        $cookies.putObject('user', $rootScope.user)
        $location.path('/')
      },
      function (response) {
        $rootScope.addAlert('warning', 'login failed, please retry')
      })
  }
})
