angular.module('hygge.beaconControllers', [])
  .controller('BeaconCtrl',
      function($scope,beaconScan,contextLocations,$interval) {
            $scope.floor13class = "";
            $scope.floor12class = "";
            $scope.floor11class = "";
            $scope.floor10class = "";
            $scope.pin13display = "";
            $scope.pin12display = "";
            $scope.pin11display = "";
            $scope.pin10display = "";

var floors =[
{number:10, activeClass:''},{number:11, activeClass:''},{number:12, activeClass:''},{number:13, activeClass:''}
];

$scope.floors = floors;
$scope.foo = 'foo';
console.log('FLOORSSSS: ' + $scope.floors);
          $interval(function() {
            $scope.beacons = beaconScan.all();
            //console.log("found this many: " + $scope.beacons.length);
 //console.log('FLOORSSSS: ' + $scope.floors);
 //console.log("BEACONS:" + $scope.beacons);
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
              console.log("LOC = " + loc.major + " " + loc.minor);
              $scope.currentlocation = contextLocations.get(loc.major, loc.minor);

              //switch($scope.currentlocation.floor){
              switch(loc.major){
                        case "13":
                            $scope.map.floor13class = "active-floor";
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
            //$scope.$apply(); // This seems to be necessary.
          }, 3000);

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          //$scope.stopPoll();
        });

})
