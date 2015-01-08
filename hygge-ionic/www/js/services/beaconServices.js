angular.module('hygge.beaconServices', ['ionic'])

.factory('beaconScan', function ($ionicPlatform) {

  var region = [{uuid:'113F44CF-4850-4891-B48C-0E5A337DF580'}];
  var beacons = [];

  // Mock data for console UI debug
  if (!window.cordova) {
    beacons = [{
      uuid: '113F44CF-4850-4891-B48C-0E5A337DF580',
      major: 13,
      minor: 1,
      proximity: 0,
      accuracy: 0,
      rssi: 0
    },{
      uuid: '113F44CF-4850-4891-B48C-0E5A337DF580',
      major: 13,
      minor: 2,
      proximity: 0,
      accuracy: 0,
      rssi: 0
    }];
  }

  // Cordova Plugin calls
  $ionicPlatform.ready(function() {

    if (window.cordova) {
      var rangedBeacons = cordova.plugins.locationManager.getRangedRegions();
      console.log(rangedBeacons);
    }

  });

  // Return beacon data to controllers
  return {
    all: function () {
      return beacons;
    }
  };

});
