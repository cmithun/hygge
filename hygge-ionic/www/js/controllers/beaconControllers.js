angular.module('hygge.beaconControllers', [])
  .controller('BeaconCtrl', ['$scope', '$interval',
      function($scope,beaconScan,contextLocations,$interval) {
            $scope.floor13class = "";
            $scope.floor12class = "";
            $scope.floor11class = "";
            $scope.floor10class = "";    
            $scope.pin13display = "";
            $scope.pin12display = "";
            $scope.pin11display = "";
            $scope.pin10display = "";

        var stop;
          
        $scope.pollBeacons = function() {
          // Don't start a new poll if we are already polling
            
          if ( angular.isDefined(stop) ) return;
          $scope.beacons = beaconScan.all();
          stop = $interval(function() {
          //console.log("found this many: " + $scope.beacons.length);

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
          }, 3000);
        };
        
        $scope.stopPoll = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopPoll();
        });
        $scope.doRefresh = function() {
          $scope.pollBeacons();
          $scope.$broadcast('scroll.refreshComplete');
        };  
}])
