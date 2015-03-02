angular.module('hygge.beaconControllers', [])

<<<<<<< HEAD
.controller('BeaconCtrl', function($rootScope, $scope, $state, beaconScan, contextLocations, $interval, $ionicModal, $ionicSlideBoxDelegate){    
=======
.controller('BeaconCtrl', function($scope, $state, beaconScan, contextLocations, $interval){    
>>>>>>> origin/reliable-polling
    $scope.poll = function(){
        var seconds = new Date().getTime() / 1000;
        console.log("POLLING BEACONS................"+seconds);
        $scope.beacons = beaconScan.all();
<<<<<<< HEAD
        
=======

>>>>>>> origin/reliable-polling
        console.log("found this many: " + $scope.beacons.length);

        // Match Beacon and Location data and pass to View
        // Beacon = currentbeacon
        // Location = currentlocation
<<<<<<< HEAD
        var beaconCheck = 0;
        if ($scope.beacons.length > 0){
        //filter out beacons with accuracy = -1 or greater than 12m
            var knownbeacons = $scope.beacons.filter(function(val) {
                return (val.accuracy > 0 && val.accuracy < 23);
            });
            if (knownbeacons.length < 1) $scope.showOOTO();
            // Sort knownbeacons
            knownbeacons.sortorder = "accuracy";
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
            //call viewStateUpdate directive
            $scope.updateViews($scope.currentlocation);
        }
        console.log("ROOTSCOPE LASTBEACON: "+$rootScope.lastbeacon);
    }

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
=======
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
>>>>>>> origin/reliable-polling
            $scope.poll();
        }, 3000);
    };    
    $scope.startPolling();

    $scope.stopPolling = function() {
<<<<<<< HEAD
        if (angular.isDefined($rootScope.stop)) {
            $interval.cancel($rootScope.stop);
        $rootScope.stop = undefined;
=======
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
        stop = undefined;
>>>>>>> origin/reliable-polling
        }
    };
    
    $scope.startApp = function(){
        v5.pause();
        v4.pause();
        v3.pause();
        v2.pause();
        v1.pause();
<<<<<<< HEAD
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
=======
        $scope.$apply();
        $state.go('tab.map',{});
>>>>>>> origin/reliable-polling
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
<<<<<<< HEAD
                    jQuery("#OOTO").hide();
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
                    jQuery(".floor").removeClass("blur");
                    jQuery("#floor13").addClass("active-floor");  
                    jQuery("#currentlocationTitle").html("Floor 13");
                    jQuery("#currentlocationExcerpt").html("You're on Floor 13 somewhere.");
                    if(parseInt($scope.accuracy) < 7) { jQuery("#pin13").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                        jQuery("#currentlocationTitle").html(currentlocation.title);
                        jQuery("#currentlocationExcerpt").html(currentlocation.excerpt);
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
                    if(parseInt($scope.accuracy) < 7) {
                                jQuery("#pin12").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                        jQuery("#currentlocationTitle").html(currentlocation.title);
                        jQuery("#currentlocationExcerpt").html(currentlocation.excerpt);
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
                    if(parseInt($scope.accuracy) < 7) {
                                jQuery("#pin11").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                        jQuery("#currentlocationTitle").html(currentlocation.title);
                        jQuery("#currentlocationExcerpt").html(currentlocation.excerpt);
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
                    if(parseInt($scope.accuracy) < 7) {
                                        jQuery("#pin10").css({'top':currentlocation.y,'left':currentlocation.x,'display':'inline'});
                        jQuery("#currentlocationTitle").html(currentlocation.title);
                        jQuery("#currentlocationExcerpt").html(currentlocation.excerpt);
                    } 
                    break;                
                default:
                    $scope.showOOTO();
=======
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
>>>>>>> origin/reliable-polling
                    $scope.clearFloor(13);
                    $scope.clearFloor(12);
                    $scope.clearFloor(11);
                    $scope.clearFloor(10);
<<<<<<< HEAD
                    // doesn't look like you're here
                    break;
        }
        jQuery("#debugTitle").html(currentlocation.title);
        jQuery("#debugFloor").html(currentlocation.floor);
        jQuery("#debugAccuracy").html($scope.accuracy);
=======
                    break;
        }
        jQuery("#currentlocationTitle").html(currentlocation.title);
        jQuery("#currentlocationExcerpt").html(currentlocation.excerpt);
        jQuery("#debugTitle").html(currentlocation.title);
        jQuery("#debugFloor").html(currentlocation.floor);
        jQuery("#debugAccuracy").html(currentlocation.accuracy);
>>>>>>> origin/reliable-polling
        jQuery("#debugX").html(currentlocation.x);
        jQuery("#debugY").html(currentlocation.y);   
    };
    
    $scope.clearFloor = function(value) {
        jQuery("#floor"+value).removeClass("active-floor");  
        jQuery("#pin"+value).css({'display':'none'});
    };
});
