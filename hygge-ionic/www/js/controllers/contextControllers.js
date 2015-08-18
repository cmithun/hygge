angular.module('hygge.contextControllers', ['ngResource'])

.controller('ContextCtrl', function($scope, contextLocations) {
  $scope.locations = contextLocations.all();
})

.controller('CodexCtrl', function($scope) {
  $scope.groups = [
        {
          title: "WIFI Info",
          contents: [
            {
              line: "Guest Network: oneConnect-guest /!!IPG$$"
            },
            {
              line: "For employees: oneConnect use your IPG creds"
            }
          ]
        },{
      title: "Conference Room Pronunciation",
      contents: [{
            line: "Eir: (Eh-er)"
        },
        {
            line: "Asgard: (Ahz-gard)"
        },
        {
            line: "Mjolnir: (Mee-yul-near)"
        },
        {
            line: "Skadi: (Skah-dee)"
        },
        {
            line: "Baldr: (Bahl-der)"
        },
        {
            line: "Loki: (Low-key)"
        },
        {
            line: "Skuld: (Skoold)"
        },
        {
            line: "Thor: (Th-ore)"
        },
        {
            line: "Freyja: (Fray-yah)"
        },
        {
            line: "Odin: (Oh-din)"
        },
        {
            line: "Valhalla: (Vahl-hallah)"
        }
      ]
    },
      {
      title: "Stay Healthy",
      contents: [
        {
            line: "Yoga Wednesdays on the roof"
        },
        {
            line: "Fitness Room in the basement"
        },
        {
            line: "Wellness Rooms on the 10th floor"
        }
      ]
    },
      {
      title: "IT Helpdesk",
      contents: [
        {
          line: "Email helpdesk@mithun.agency with a description of your issue or call Al Devries (612-968-4827) with urgent matters."
        }
      ]
    },
      {
      title: "IPG Alertline",
      contents: [
        {
          line: "800.828.0896"
        }
      ]
    }
  ];
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  
})

.controller('PersonContext', function($scope, $rootScope, contextPeople, $ionicScrollDelegate, $ionicPopup,$state) {
    $scope.$watch("personSearch.name.length", function(val) {
    if (val > 0) {
        jQuery("#searchList").show();    
    } else {
        jQuery("#searchList").hide();        
    }
    });
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

.controller('FindModalController', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('find-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
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