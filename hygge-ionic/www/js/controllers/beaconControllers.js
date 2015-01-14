angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, beaconScan, contextLocations) {

    $scope.floor13class = "";
    $scope.floor12class = "";
    $scope.floor11class = "";
    $scope.floor10class = "";    
    $scope.pin13display = "";
    $scope.pin12display = "";
    $scope.pin11display = "";
    $scope.pin10display = "";

  function pollBeacons(){
    console.log("POLLING BEACONS................");
    $scope.beacons = beaconScan.all();

    console.log("found this many: " + $scope.beacons.length);

    // Match Beacon and Location data and pass to View
    // Beacon = currentbeacon
    // Location = currentlocation
    if ($scope.beacons.length > 0){
      // Sort beacons
      $scope.beacons.sortorder = "accuracy";
      var loc = $scope.beacons[0];

      $scope.currentlocation = contextLocations.get(loc.major, loc.minor);  
        switch($scope.currentlocation.floor){
                case "13":
                    $scope.floor13class = "active-floor";
                    $scope.pin13display = "inline";
                    break;
                case "12":
                    $scope.floor12class = "active-floor";
                    $scope.pin12display = "inline";
                    break;
                case "11":
                    $scope.floor11class = "active-floor";
                    $scope.pin11display = "inline";
                    break;
                case "10":
                    $scope.floor10class = "active-floor";
                    $scope.pin10display = "inline";
                    break;                
                default:
                    $scope.floor13class = "";
                    $scope.floor12class = "";
                    $scope.floor11class = "";
                    $scope.floor10class = "";
                    $scope.pin13display = "";
                    $scope.pin12display = "";
                    $scope.pin11display = "";
                    $scope.pin10display = "";
                    break;
        }
    }
    $scope.$apply(); // This seems to be necessary.
  }

  pollBeacons();

  var pollInterval = 2000; // 10 seconds
  //$scope.beacons = beaconScan.all();

  //Use an interval timer to poll our controller
  var beaconPollTimer = setInterval(function() {pollBeacons();}, pollInterval);

  // Clear the interval timer ot avoid a memory leak
  $scope.$on('$destroy', function(){
    clearInterval (becaonPollTimer);
  });
    
 $scope.doRefresh = function() {
    pollBeacons();
    $scope.$broadcast('scroll.refreshComplete');
  };
    
});