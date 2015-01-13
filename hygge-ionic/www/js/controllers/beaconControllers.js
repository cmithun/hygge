angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, beaconScan, contextLocations) {


  function pollBeacons(){
    console.log("POLLING BEACONS................");
    $scope.beacons = beaconScan.all();

    console.log("found this many: " + $scope.beacons.length);

    if ($scope.beacons.length > 0){
      var loc = $scope.beacons[0];
      $scope.location = contextLocations.get(loc.major, loc.minor);
    }
    $scope.$apply(); // This seems to be necessary.
  }

  pollBeacons();

  var pollInterval = 10000; // 10 seconds
  //$scope.beacons = beaconScan.all();

  //Use an interval timer to poll our controller
  var beaconPollTimer = setInterval(function() {pollBeacons();}, pollInterval);

  // Clear the interval timer ot avoid a memory leak
  $scope.$on('$destroy', function(){
    clearInterval (becaonPollTimer);
  });

});
