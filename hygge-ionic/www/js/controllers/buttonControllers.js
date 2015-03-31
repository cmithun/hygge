angular.module('hygge.buttonControllers', [])

.controller('IntroActions', function($rootScope, $scope, $state, $ionicSlideBoxDelegate){        
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
    
    }
    $scope.getDirections = function(){
        var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

        if(deviceType=="Android"){
            window.open('https://www.google.com/maps/place/Mithun');
            return false;
        } else {
            window.open('maps://?q=510 S Marquette Ave, Minneapolis, MN, 55402');
            return false;
        }
    }
    $scope.launchIAT = function(){
        window.open('http://mithun-46828.azurewebsites.net/BrandIAT', "_blank", "location=yes");
    }
    $scope.mithunInstagram = function(){
        window.open('http://instagram.com/mithunagency', "_blank", "location=yes");
    }
});