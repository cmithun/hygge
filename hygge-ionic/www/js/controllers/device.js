angular.module('hygge.device', ['ionic'])

.controller('DeviceCtrl', ['$scope', '$ionicPlatform', function ($scope, $ionicPlatform) {

  $ionicPlatform.ready(function() {
    $scope.thisDevice = window.device;
    console.log($scope.thisDevice);
    $scope.$apply();
  });

}]);
