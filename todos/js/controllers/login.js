angular.module('MainApp.controllers').controller('LoginCtrl', function ($scope, $rootScope, $http, $location, $cookies) {
  $scope.login = function () {
    $http.post($rootScope.baseURI + '/auth/login', JSON.stringify($scope.userData))
         .then(function (response) {
           var token = response['data']['token']
           $rootScope.user.isLoggedIn = true
           console.log($rootScope.user);
           $rootScope.user.token = token
           $cookies.putObject('user', $rootScope.user)
           $location.path('/')
         },
         function (response) {
           $rootScope.addAlert('warning', 'login failed, please retry')
         })
  }
})
