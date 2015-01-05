angular.module('hygge.device', ['ionic'])

.controller('DeviceCtrl', ['$scope', 'DeviceService', function ($scope, DeviceService) {
  $scope.device = DeviceService.getDevice();
}]);
