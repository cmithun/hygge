angular.module('hygge.contextControllers', ['ngResource'])

.controller('ContextCtrl', function($scope, contextLocations) {
  $scope.locations = contextLocations.all();
})

.controller('PersonContext', function($scope, $rootScope, contextPeople, $ionicScrollDelegate, $ionicPopup,$state) {
    $scope.personSearch = {name: ''};
    $scope.people = contextPeople.all();

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
        //update text if not in office
        var subTitleTxt = 'I\'ve highlighted the location on your map.';
        var okTextTxt = 'Show Me';
        if ($rootScope.lastbeacon == 0) {
            subTitleTxt = 'If you were at MITHUN I could show you where.';
            okTextTxt = 'Oh, Ok.';
        }
            var alertPopup = $ionicPopup.alert({
             title: 'You\'ll find '+value.name+' on floor '+value.floor,
             subTitle: subTitleTxt,
             okText: okTextTxt,
             okType: 'button-default'
           });
           alertPopup.then(function() {
                var PRun = Parse.Object.extend("Find");
                var prun = new PRun();
                  prun.save({run: 1}, {
                  success: function(object) {
                    //$(".success").show();
                  },
                  error: function(model, error) {
                    //$(".error").show();
                  }
                });  
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