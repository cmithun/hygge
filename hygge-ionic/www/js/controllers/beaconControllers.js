angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, $state, beaconScan, contextLocations, sharedProperties) {

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
      //filter out beacons with accuracy = -1 or greater than 12m
      var knownbeacons = $scope.beacons.filter(function(val) {
          return (val.accuracy > 0 && val.accuracy < 12);
      });
      // Sort knownbeacons
      knownbeacons.sortorder = "accuracy";
      var loc = knownbeacons[0];
      $scope.currentlocation = contextLocations.get(loc.major, loc.minor); 
        switch($scope.currentlocation.floor){
                case "13":
                    sharedProperties.setX($scope.currentlocation.x);
                    $scope.floor13class = "active-floor";
                    $scope.floor12class = "";
                    $scope.floor11class = "";
                    $scope.floor10class = "";    
                    $scope.pin13display = "";
                    $scope.pin12display = "";
                    $scope.pin11display = "";                
                    $scope.pin13display = "inline";
                    alert(sharedProperties.getX());
                    break;
                case "12":
                    $scope.floor13class = "";
                    $scope.floor12class = "active-floor";
                    $scope.floor11class = "";
                    $scope.floor10class = "";    
                    $scope.pin13display = "";
                    $scope.pin12display = "";
                    $scope.pin11display = "";                
                    $scope.pin12display = "inline";
                    break;
                case "11":
                    $scope.floor13class = "";
                    $scope.floor12class = "";
                    $scope.floor11class = "active-floor";
                    $scope.floor10class = "";    
                    $scope.pin13display = "";
                    $scope.pin12display = "";
                    $scope.pin11display = "";                
                    $scope.pin11display = "inline";
                    break;
                case "10":
                    $scope.floor13class = "";
                    $scope.floor12class = "";
                    $scope.floor11class = "";
                    $scope.floor10class = "active-floor";    
                    $scope.pin13display = "";
                    $scope.pin12display = "";
                    $scope.pin11display = "";                
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

  var pollInterval = 3000;
  //$scope.beacons = beaconScan.all();

  //Use an interval timer to poll our controller
  var beaconPollTimer = setInterval(function() {pollBeacons();}, pollInterval);

  $scope.startApp = function(){
    $state.go('tabs.map',{});
  }
    
  // Clear the interval timer ot avoid a memory leak
  $scope.$on('$destroy', function(){
    clearInterval (becaonPollTimer);
  });
    
 $scope.doRefresh = function() {
    pollBeacons();
    $scope.$broadcast('scroll.refreshComplete');
  };
    
});
