angular.module('hygge.beaconServices', ['ionic'])

.factory('beaconScan', function ($ionicPlatform) {

  var region = [{uuid:'113F44CF-4850-4891-B48C-0E5A337DF580'}];
  var beacons = {};

  // $ionicPlatform.ready(function() {
  //
  //   var rangedBeacons = cordova.plugins.locationManager.getRangedRegions();
  //
  //   console.log(rangedBeacons);
  //
  // });

  return {
    all: function () {
      return beacons;
    }
  };

});
