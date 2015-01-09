angular.module('hygge.beaconServices', ['ionic'])

.factory('beaconScan', function ($ionicPlatform, $log) {

  var beacons = {};

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
  else {
    $ionicPlatform.ready(function() {

      window.locationManager = cordova.plugins.locationManager;

      var delegate = new locationManager.Delegate();

    //   delegate.didDetermineStateForRegion = function (pluginResult) {
    //     console.log('[DOM] didDetermineStateForRegion: '+ JSON.stringify(pluginResult));
    //   };
    //
    //   delegate.didStartMonitoringForRegion = function (pluginResult) {
    //     console.log('didStartMonitoringForRegion:', pluginResult);
    //   };
    //
    //   delegate.didRangeBeaconsInRegion = function (pluginResult) {
    //     console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    //   };
    //
      var uuid = '113F44CF-4850-4891-B48C-0E5A337DF580';
      var beaconRegion = new locationManager.BeaconRegion(1, uuid);

      locationManager.setDelegate(delegate);

      locationManager.requestWhenInUseAuthorization();

    //   cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    //   .fail(console.error)
    //   .done();
    });
  }

  console.log(beacons);

  // Return beacon data to controllers
  return {
    all: function () {
      return beacons;
    }
  };

});
