angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($rootScope, $scope, $state, beaconScan, contextLocations, $interval, $ionicModal, $ionicSlideBoxDelegate){    
    $scope.poll = function(){
        var seconds = new Date().getTime() / 1000;
        console.log("POLLING BEACONS................"+seconds);
        $scope.beacons = beaconScan.all();
        
        console.log("found this many: " + $scope.beacons.length);

        // Match Beacon and Location data and pass to View
        // Beacon = currentbeacon
        // Location = currentlocation
        var beaconCheck = 0;
        if ($scope.beacons.length > 0){
        //filter out beacons with accuracy = -1 or greater than 23m
            var knownbeacons = $scope.beacons.filter(function(val) {
                return (val.accuracy > 0 && val.accuracy < 23);
            });
            if (knownbeacons.length < 1) $scope.showOOTO();
            // Sort knownbeacons
            knownbeacons.sortorder = "accuracy";
            
            //remove knownbeacons that are meant for close contact but too far away
            /*
            for(i=0;i<knownbeacons.length;i++){
                $scope.beaconlocation = contextLocations.get(knownbeacons[i].major, knownbeacons[i].minor);
                if (($scope.beaconlocation.radius < 5) && ($scope.beaconlocation.radius < knownbeacons[i].accuracy)) {
                    knownbeacons.splice(i,1);
                }
            }*/

            $scope.currentlocation = contextLocations.get(knownbeacons[0].major, knownbeacons[0].minor);
            $scope.accuracy = knownbeacons[0].accuracy;
            beaconCheck = $scope.currentlocation.major+"-"+$scope.currentlocation.minor; 
        } else {
            $scope.showOOTO();
            $rootScope.lastbeacon = 0;
        }
        //if beacon has changed
        if (beaconCheck != $rootScope.lastbeacon){ 
            $rootScope.lastbeacon = beaconCheck;
        }
        $scope.updateViews($scope.currentlocation);
        
        console.log("ROOTSCOPE LASTBEACON: "+$rootScope.lastbeacon);
    }
    $scope.accuracy = 100;
    $scope.showOOTO = function() {
            jQuery("#OOTO").removeClass("hideOOTO").fadeIn();
            jQuery(".floor").addClass("blur");
            jQuery("#currentlocationTitle").html("Can't find you.");
            jQuery("#currentlocationExcerpt").html("Doesn't look like you're at MITHUN.");
    }
    $rootScope.lastbeacon = 0;
    $scope.startPolling = function() {
        // Don't start a new poll if we are already polling
        if ( angular.isDefined($rootScope.stop) ) return; 
        $scope.$apply(); // This seems to be necessary.
        $rootScope.stop = $interval(function() {
            $scope.poll();
        }, 3000);
    };    
    $scope.startPolling();

    $scope.stopPolling = function() {
        if (angular.isDefined($rootScope.stop)) {
            $interval.cancel($rootScope.stop);
        $rootScope.stop = undefined;
        }
    };
    
    $scope.startApp = function(){
        v5.pause();
        v4.pause();
        v3.pause();
        v2.pause();
        v1.pause();
        jQuery("#ts2").fadeOut();
        jQuery("#ts3").fadeOut();
        jQuery("#ts4").fadeOut();
        jQuery("#ts5").fadeOut();
        jQuery("#ts1").fadeIn();
        $ionicSlideBoxDelegate.slide(0);
        //$scope.$apply();
        window.localStorage['didTutorial'] = "true";
        $state.go('tab.map',{});
        //window.analytics.trackView('Map');
    };
    
    $scope.showInfo = function(value,cl){                    jQuery("#pin"+value).css({'top':cl.y+"%",'left':cl.x+"%",'display':'inline'});
            jQuery("#currentlocationTitle").html(cl.title);
            jQuery("#currentlocationExcerpt").html(cl.excerpt);
    }
    
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
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor13").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 13");
                    jQuery("#currentlocationExcerpt").html("You're on Floor 13 somewhere.");
                    console.log(".ACCURACY:"+$scope.accuracy);
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(13,currentlocation);
                    } else {
                        jQuery("#pin13").css({'display':'none'});
                    }
                    break;
                case "12":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(13);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor12").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 12");
                    jQuery("#currentlocationExcerpt").html("You're on Floor 12 somewhere.");
                    console.log(".ACCURACY:"+$scope.accuracy);
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(12,currentlocation);
                    } else {
                        jQuery("#pin12").css({'display':'none'});
                    }
                    break;
                case "11":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor11").addClass("active-floor");
                    jQuery("#currentlocationTitle").html("Floor 11");
                    jQuery("#currentlocationExcerpt").html("You're on Floor 11 somewhere.");
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(11,currentlocation);
                    } else {
                        jQuery("#pin11").css({'display':'none'});
                    }
                    break;
                case "10":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor10").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 10");
                    jQuery("#currentlocationExcerpt").html("You're on Floor 10 somewhere.");
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(10,currentlocation);
                    } else {
                        jQuery("#pin10").css({'display':'none'});
                    }
                    break;                
                default:
                    $scope.showOOTO();
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    // doesn't look like you're here
                    break;
        }
        jQuery("#debugTitle").html(currentlocation.title);
        jQuery("#debugFloor").html(currentlocation.floor);
        jQuery("#debugAccuracy").html($scope.accuracy);
        jQuery("#debugX").html(currentlocation.x);
        jQuery("#debugY").html(currentlocation.y);   
    };
    
    $scope.clearFloor = function(value) {
        jQuery("#floor"+value).removeClass("active-floor");  
        jQuery("#pin"+value).css({'display':'none'});
    };
});
