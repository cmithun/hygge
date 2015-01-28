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

  $scope.clearFloor = function(value){
        jQuery("#floor"+value).removeClass("active-floor");  
        jQuery("#pin"+value).css({'display':'none'});
  }
    
  $scope.pollBeacons = function(){
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
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery("#floor13").addClass("active-floor");  
                    jQuery("#pin13").css({'top':$scope.currentlocation.y,'left':$scope.currentlocation.x,'display':'inline'});
                    break;
                case "12":
                    $scope.clearFloor(13);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery("#floor12").addClass("active-floor");  
                    jQuery("#pin12").css({'top':$scope.currentlocation.y,'left':$scope.currentlocation.x,'display':'inline'});
                    break;
                case "11":
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(10);
                    jQuery("#floor11").addClass("active-floor");  
                    jQuery("#pin11").css({'top':$scope.currentlocation.y,'left':$scope.currentlocation.x,'display':'inline'});
                    break;
                case "10":
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    jQuery("#floor10").addClass("active-floor");  
                    jQuery("#pin10").css({'top':$scope.currentlocation.y,'left':$scope.currentlocation.x,'display':'inline'});
                    break;                
                default:
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    break;
        }
        jQuery("#currentlocationTitle").html($scope.currentlocation.title);
        jQuery("#currentlocationExcerpt").html($scope.currentlocation.excerpt);
        jQuery("#debugTitle").html($scope.currentlocation.title);
        jQuery("#debugFloor").html($scope.currentlocation.floor);
        jQuery("#debugAccuracy").html(loc.accuracy);
        jQuery("#debugX").html($scope.currentlocation.x);
        jQuery("#debugY").html($scope.currentlocation.y);
    }
    $scope.$apply(); // This seems to be necessary.
  }

  $scope.pollBeacons();

  var pollInterval = 3000;
  //$scope.beacons = beaconScan.all();

  //Use an interval timer to poll our controller
  var beaconPollTimer = setInterval(function() {$scope.pollBeacons();}, pollInterval);

  $scope.startApp = function(){
    $state.go('tabs.map',{});
  }
    
  // Clear the interval timer ot avoid a memory leak
  $scope.$on('$destroy', function(){
    clearInterval (becaonPollTimer);
  });
    
 $scope.doRefresh = function() {
    $scope.pollBeacons();
    $scope.$broadcast('scroll.refreshComplete');
  };
    
});
