angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, beaconScan) {

  var pollInterval = 10000; // 10 seconds
  //$scope.beacons = beaconScan.all();

  //Use an interval timer to poll our controller
  var beaconPollTimer = setInterval(function(){

      console.log("POLLING BEACONS................");
      $scope.beacons = beaconScan.all();
      $scope.$apply(); // This seems to be necessary.

  }, pollInterval);

  // Clear the interval timer ot avoid a memory leak
  $scope.$on('$destroy', function(){
    clearInterval (becaonPollTimer);
  });

});
