// Hygge


angular.module('hygge', [
  'ionic',
  'hygge.device',
  'hygge.directory'
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
      StatusBar.styleDefault();
    }


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
        controller: 'DeviceCtrl'
      }
    }
  })

  .state('tab.directory', {
    url: '/directory',
    views: {
      'tab-directory': {
        templateUrl: 'templates/directory.html',
        controller: 'DirectoryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/map');

})



.factory('$cordovaDevice', [function () {

  return {
    /**
    * Returns the whole device object.
    * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md
    * @returns {Object} The device object.
    */
    getDevice: function () {
      return device;
    },

    /**
    * Returns the Cordova version.
    * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#devicecordova
    * @returns {String} The Cordova version.
    */
    getCordova: function () {
      return device.cordova;
    },

    /**
    * Returns the name of the device's model or product.
    * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#devicemodel
    * @returns {String} The name of the device's model or product.
    */
    getModel: function () {
      return device.model;
    },

    /**
    * @deprecated device.name is deprecated as of version 2.3.0. Use device.model instead.
    * @returns {String}
    */
    getName: function () {
      return device.name;
    },

    /**
    * Returns the device's operating system name.
    * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceplatform
    * @returns {String} The device's operating system name.
    */
    getPlatform: function () {
      return device.platform;
    },

    /**
    * Returns the device's Universally Unique Identifier.
    * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceuuid
    * @returns {String} The device's Universally Unique Identifier
    */
    getUUID: function () {
      return device.uuid;
    },

    /**
    * Returns the operating system version.
    * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceversion
    * @returns {String}
    */
    getVersion: function () {
      return device.version;
    }
  };
}]);
