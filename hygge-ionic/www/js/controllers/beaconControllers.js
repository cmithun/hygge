angular.module('hygge.beaconControllers', [])

.controller('BeaconCtrl', function($rootScope, $scope, $state, beaconScan, contextLocations, $interval, $ionicModal, $ionicSlideBoxDelegate){    
    $scope.poll = function(){
        var seconds = new Date().getTime() / 1000;
        console.log("1 POLLING BEACONS................"+seconds);
        $scope.beacons = beaconScan.all();
        
        console.log("2 found this many: " + $scope.beacons.length);

        // Match Beacon and Location data and pass to View
        // Beacon = currentbeacon
        // Location = currentlocation
        var beaconCheck = 0;
        if ($scope.beacons.length > 0){
        console.log("3 length loop: " + $scope.beacons.length);
        //filter out beacons with accuracy = -1 or greater than 23m
            var knownbeacons = $scope.beacons.filter(function(val) {
                console.log("4 loop val.accuracy: " + val.accuracy);
                return (val.accuracy > 0 && val.accuracy < 23);
            });
            if (knownbeacons.length < 1) $scope.showOOTO();
            // Sort knownbeacons
            knownbeacons.sort(function(a,b) {
                return a.accuracy - b.accuracy;
            });
            console.log("5 knownbeacons.sorted");
            
            //remove knownbeacons that are meant for close contact but too far away
            /*
            for(i=0;i<knownbeacons.length;i++){
                $scope.beaconlocation = contextLocations.get(knownbeacons[i].major, knownbeacons[i].minor);
                if (($scope.beaconlocation.radius < 5) && ($scope.beaconlocation.radius < knownbeacons[i].accuracy)) {
                    knownbeacons.splice(i,1);
                }
            }*/

            $scope.currentlocation = contextLocations.get(knownbeacons[0].major, knownbeacons[0].minor);
            $scope.currentlocation2 = "";
            $scope.currentlocation3 = "";
            if (knownbeacons[1]) $scope.currentlocation2 = contextLocations.get(knownbeacons[1].major, knownbeacons[1].minor);
            if (knownbeacons[2]) $scope.currentlocation3 = contextLocations.get(knownbeacons[2].major, knownbeacons[2].minor);
            console.log("6 knownbeacons[0].major: " + knownbeacons[0].major+"-"+knownbeacons[0].minor);
            $scope.accuracy = knownbeacons[0].accuracy;
            console.log("7 accuracy:"+knownbeacons[0].accuracy);
            beaconCheck = knownbeacons[0].major+"-"+knownbeacons[0].minor; 
            console.log("8 closest beacon:"+beaconCheck);
        } else {
            $scope.showOOTO();
            $rootScope.lastbeacon = 0;
        }
        //if beacon has changed
        if (beaconCheck != $rootScope.lastbeacon){ 
            $rootScope.lastbeacon = beaconCheck;
            console.log("9a lastbeacon:"+beaconCheck+"|"+$rootScope.lastbeacon);
            $scope.updateViews($scope.currentlocation);
        } else {
            console.log("9b lastbeacon:"+beaconCheck+"|"+$rootScope.lastbeacon);
        }
        
        console.log("10 ROOTSCOPE LASTBEACON: "+$rootScope.lastbeacon);
    }
    $scope.accuracy = 100;
    $scope.showOOTO = function() {       
            /*jQuery("#OOTO").removeClass("hideOOTO").fadeIn();
            jQuery(".floor").addClass("blur");
            jQuery("#currentlocationTitle").html("Can't find you.");
            jQuery("#currentlocationExcerpt").html("Doesn't look like you're at MITHUN.");
            */
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
    
    $scope.showInfo = function(value,cl,num){
            jQuery("#pin"+value).css({'top':cl.y+"%",'left':cl.x+"%",'display':'inline'});
            jQuery("#hd-near"+num).html(cl.title);
            if (cl.icon.length>1) {
                jQuery("#ion-near"+num).removeClass("ion-pinpoint explore"+num).addClass("ion-knife");
            } else {
                jQuery("#ion-near"+num).addClass("ion-pinpoint explore"+num);
            }
            jQuery("#currentlocationTitle"+num).html(cl.title);
            jQuery("#currentlocationExcerpt"+num).html(cl.excerpt);
    }
    
    // Clear the interval timer ot avoid a memory leak
    $scope.$on('$destroy', function(){
        $scope.stopPolling();
    });
    
    $scope.doRefresh = function() {
        $scope.poll();
        $scope.$broadcast('scroll.refreshComplete');
        jQuery("#floor14").fadeIn(); 
    };
    
    $scope.updateViews = function(currentlocation) {
          switch(currentlocation.floor){
                case "14":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor14").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 14");
                    jQuery("#near-info").html("You're on Floor 14.<br>Here's what we see around you.");
                    console.log(".ACCURACY:"+$scope.accuracy);
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(14,currentlocation,1);
                        $scope.showInfo(14,currentlocation2,2);
                        $scope.showInfo(14,currentlocation3,3);
                    } else {
                        jQuery("#pin14").css({'display':'none'});
                    }
                    break;                  
                case "13":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(14);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor13").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 13");
                    jQuery("#near-info").html("You're on Floor 13.<br>Here's what we see around you.");
                    console.log(".ACCURACY:"+$scope.accuracy);
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(13,currentlocation,1);
                        $scope.showInfo(13,currentlocation2,2);
                        $scope.showInfo(13,currentlocation3,3);
                    } else {
                        jQuery("#pin13").css({'display':'none'});
                    }
                    break;
                case "12":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(14);
                    $scope.clearFloor(13);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor12").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 12");
                    jQuery("#near-info").html("You're on Floor 12.<br>Here's what we see around you.");
                    console.log(".ACCURACY:"+$scope.accuracy);
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(12,currentlocation,1);
                        $scope.showInfo(12,currentlocation2,2);
                        $scope.showInfo(12,currentlocation3,3);
                    } else {
                        jQuery("#pin12").css({'display':'none'});
                    }
                    break;
                case "11":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(14);
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor11").addClass("active-floor");
                    jQuery("#currentlocationTitle").html("Floor 11");
                    jQuery("#near-info").html("You're on Floor 11. Here's what we see around you.");
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(11,currentlocation,1);
                        $scope.showInfo(11,currentlocation2,2);
                        $scope.showInfo(11,currentlocation3,3);
                    } else {
                        jQuery("#pin11").css({'display':'none'});
                    }
                    break;
                case "10":
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(14);
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor10").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 10");
                    jQuery("#near-info").html("You're on Floor 10.<br>Here's what we see around you.");
                    if(parseInt($scope.accuracy) < 10) {
                        $scope.showInfo(10,currentlocation,1);
                        $scope.showInfo(10,currentlocation2,2);
                        $scope.showInfo(10,currentlocation3,3);
                    } else {
                        jQuery("#pin10").css({'display':'none'});
                    }
                    break;                
                default:
                    $scope.showOOTO();
                    $scope.clearFloor(14);
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
