angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($scope, $state, beaconScan, contextLocations, $interval){    
    $scope.poll = function(){
        var seconds = new Date().getTime() / 1000;
        console.log("POLLING BEACONS................"+seconds);
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
            $scope.currentlocation = contextLocations.get(knownbeacons[0].major, knownbeacons[0].minor); 
        }
        //call viewStateUpdate directive
        $scope.updateViews($scope.currentlocation);
    }

    var stop;
    
    $scope.startPolling = function() {
        // Don't start a new poll if we are already polling
        if ( angular.isDefined(stop) ) return; 
        $scope.$apply(); // This seems to be necessary.
        stop = $interval(function() {
            $scope.poll();
        }, 3000);
    };    
    $scope.startPolling();

    $scope.stopPolling = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
        stop = undefined;
        }
    };
    
    $scope.startApp = function(){
        $state.go('tab.map',{});
    };
    
    // Clear the interval timer ot avoid a memory leak
    $scope.$on('$destroy', function(){
        $scope.stopPolling();
    });
    
    $scope.doRefresh = function() {
        $scope.poll();
        $scope.$broadcast('scroll.refreshComplete');
    };
    
    $scope.updateViews = function(currentlocation) {
          switch(currentlocation.floor){
                case "13":
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery("#floor13").addClass("active-floor");  
                    jQuery("#pin13").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                    break;
                case "12":
                    $scope.clearFloor(13);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery("#floor12").addClass("active-floor");  
                    jQuery("#pin12").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                    break;
                case "11":
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(10);
                    jQuery("#floor11").addClass("active-floor");  
                    jQuery("#pin11").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                    break;
                case "10":
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    jQuery("#floor10").addClass("active-floor");  
                    jQuery("#pin10").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                    break;                
                default:
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    break;
        }
        jQuery("#currentlocationTitle").html(currentlocation.title);
        jQuery("#currentlocationExcerpt").html(currentlocation.excerpt);
        jQuery("#debugTitle").html(currentlocation.title);
        jQuery("#debugFloor").html(currentlocation.floor);
        jQuery("#debugAccuracy").html(currentlocation.accuracy);
        jQuery("#debugX").html(currentlocation.x);
        jQuery("#debugY").html(currentlocation.y);   
    };
    
    $scope.clearFloor = function(value) {
        jQuery("#floor"+value).removeClass("active-floor");  
        jQuery("#pin"+value).css({'display':'none'});
    };
});
