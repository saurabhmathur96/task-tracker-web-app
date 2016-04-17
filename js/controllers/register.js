angular.module('MainApp.controllers').controller('RegisterCtrl', function ($scope, $rootScope, $http, $location) {
  $scope.register = function () {

    $http.post($rootScope.baseURI +'/auth/register', JSON.stringify($scope.userData))
         .then(function (response) {
           $location.path('/login')
           $rootScope.addAlert('success', 'registration successfull')
         },
         function (response) {
           $rootScope.addAlert('warning', 'registration failed, please retry')
         })
  }
})
