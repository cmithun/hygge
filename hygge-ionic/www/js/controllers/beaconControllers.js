angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, beaconScan) {

  var pollInterval = 10000; // 10 seconds
  //$scope.beacons = beaconScan.all();

  //Use an interval timer to poll our controller
  var emptyCount = 0;
  var beaconPollTimer = setInterval(function(){

      console.log("POLLING BEACONS................");
      var beacons = beaconScan.all();
      // didRangeBecaons seems to return empty lists sometimes.
      // Ignore up to 4 consecutive empty beacon lists
      if (beacons.length == 0 & emptyCount > 4 ){
        emptyCount++;
      }
      else{
        emptyCount = 0;
        $scope.beacons = beacons;
        $scope.$apply(); // This seems to be necessary.
      }

  }, pollInterval);

  // Clear the interval timer ot avoid a memory leak
  $scope.$on('$destroy', function(){
    clearInterval (becaonPollTimer);
  });

});
