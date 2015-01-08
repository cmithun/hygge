angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, beaconScan) {

  $scope.beacons = beaconScan.all();

});
