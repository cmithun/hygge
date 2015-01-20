// Hygge


angular.module('hygge', [
  'ionic',
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'hygge.services',
  'hygge.beaconServices',
  'hygge.contextServices',
  'hygge.beaconControllers',
  'hygge.contextControllers',
  'hygge.device',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    console.log("Platform Ready");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // console.log(window.plugins);

  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/map.html',
        controller: 'BeaconCtrl'
      }
    }
  })

  .state('tab.directory', {
    url: '/directory',
    views: {
      'tab-directory': {
        templateUrl: 'templates/directory.html',
        controller: 'BeaconCtrl'
      }
    }
  });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/map');

})

.config(function($stateProvider, $urlRouterProvider) {
    
  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate,$ionicNavBarDelegate) {

/* Skip the intro if launched before     
  if (window.localStorage.skipIntro === 'true') {
    $ionicNavBarDelegate.title('<img class="title-image" src="img/Mithun_White.png">');
    $ionicNavBarDelegate.showBar(true);
    $state.go('tab.map');
  };    
*/
   
  // Called to navigate to the main app
  $scope.startApp = function() {
    $ionicNavBarDelegate.showBar(true);
    $ionicNavBarDelegate.title('<img class="title-image" src="img/Mithun_White.png">');
    window.localStorage.skipIntro = 'true';
    $state.go('tab.map');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});
