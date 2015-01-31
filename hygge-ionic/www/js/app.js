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
  'hygge.directives',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    console.log("Platform Ready");
      
    //initialize Polling $timeout function
      
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
    templateUrl: "templates/tabs.html",
    controller: 'BeaconCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.directory', {
    url: '/directory',
    views: {
      'tab-directory': {
        templateUrl: 'templates/directory.html'
      }
    }
  })
  
  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/map.html'
      }
    }
  })  

 .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html'
  });    
    
  // check for first-run    
  $urlRouterProvider.otherwise('/intro');
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/map');

});

