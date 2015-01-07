angular.module('hygge.device', [])

.controller('DeviceCtrl', ['$scope', 'DeviceService', function ($scope, DeviceService) {
  $scope.device = DeviceService.getDevice();
}]);
