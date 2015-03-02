angular.module('hygge.contextControllers', ['ngResource'])

.controller('ContextCtrl', function($scope, contextLocations) {

  //$scope.locations = contextLocations.query();
  $scope.locations = contextLocations.all();
  //$scope.getLocation = function(major, minor){ return contextLocations.get(major, minor);}
})

.controller('PersonContext', function($scope, contextPeople, $ionicScrollDelegate, $ionicPopup,$state) {
    $scope.personSearch = {name: ''};
    $scope.people = contextPeople.all();
/*    $scope.people = new Array();  
    $scope.people.push({"name":"Sean O'Brien", "title":"Chief Technologist", "seat":"3809", "imgsrc":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/v/t1.0-1/c0.39.160.160/p160x160/228418_10150582365685134_6219213_n.jpg?oh=f90a7efc0e564767170a38c5e1dc6580&oe=55527F52&__gda__=1430910712_8b273fc4329b98a7e05d94524f45d978"});
    $scope.people.push({"name":"Jane Smith", "title":"26", "seat":"1000"});
    $scope.people.push({"name":"William Andrews", "title":"32", "seat":"2000"});
    $scope.people.push({"name":"Allison Brown", "title":"55", "seat":"3000"});
    $scope.people.push({"name":"Stephanie Wayne", "title":"40", "seat":"4000"});
    */
    $scope.showPin = function(value){
        for(i=10;i<15;i++){
            jQuery("#personpin"+i).hide();
        }
        jQuery("#personpin"+value.floor).show().animate({
            left: value.x+"%",
            top: value.y+"%"
          }, 0, function() {
            // Animation complete.
          });
        $scope.showAlert(value);
    };
    $scope.showAlert = function(value) {    
        var alertPopup = $ionicPopup.alert({
             title: 'You\'ll find '+value.name+' on floor '+value.floor,
             subTitle: 'I\'ve highlighted the location on your map.',
             okText: 'Show Me',
             okType: 'button-balanced'
           });
           alertPopup.then(function() {
                $state.go('tab.map',{});
                //  window.analytics.trackView('Map');
           });
    }
})

.controller('IntroContext', function($scope) {
    $scope.drawVideo = function() {
        if (v1.paused) {
            v1.play(); 
        } else {
            v1.pause(); 
        }
    };
    $scope.thumbVideo = function() {
        v2.addEventListener("loadedmetadata", function() {
            this.play();
            this.currentTime = 0;
            this.pause();
            v1.play();
        }, false);
        v3.addEventListener("loadedmetadata", function() {
            this.play();
            this.currentTime = 0;
            this.pause();
            v1.play();
        }, false);
        v4.addEventListener("loadedmetadata", function() {
            this.play();
            this.currentTime = 0;
            this.pause();
            v1.play();
        }, false);
        v5.addEventListener("loadedmetadata", function() {
            this.play();
            this.currentTime = 0;
            this.pause();
            v1.play();
        }, false);
        v1.addEventListener("loadedmetadata", function() {
            this.play();
        }, false);
    };    
    $scope.slideChanged = function(index) {
        switch(index){
                case 0:
                    jQuery("#ts2").fadeOut();
                    jQuery("#ts1").fadeIn();
                    v1.play();
                break;
                case 1:
                    jQuery("#ts1").fadeOut();
                    jQuery("#ts3").fadeOut();
                    jQuery("#ts2").fadeIn();
                    v2.play();
                break;
                case 2:
                    jQuery("#ts2").fadeOut();
                    jQuery("#ts4").fadeOut();
                    jQuery("#ts3").fadeIn();
                    v3.play();
                break;
                case 3:
                    jQuery("#ts3").fadeOut();
                    jQuery("#ts5").fadeOut();
                    jQuery("#ts4").fadeIn();
                    v4.play();
                break;
                case 4:
                    jQuery("#ts4").fadeOut();
                    jQuery("#ts5").fadeIn();
                    v5.play();
                break;
        }
    }
});