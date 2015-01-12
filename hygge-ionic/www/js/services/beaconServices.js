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

      //w indow.locationManager = cordova.plugins.locationManager;

      var delegate = new cordova.plugins.locationManager.Delegate();

      delegate.didDetermineStateForRegion = function (pluginResult) {
        console.log('[DOM] didDetermineStateForRegion: '+ JSON.stringify(pluginResult));
      };

      delegate.didStartMonitoringForRegion = function (pluginResult) {
        console.log('didStartMonitoringForRegion:', pluginResult);
      };

      delegate.didRangeBeaconsInRegion = function (pluginResult) {
        console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        console.log('pluginResult Beacons: ' + JSON.stringify(pluginResult.beacons));
        beacons = pluginResult.beacons;
      };

      var identifier = '0';
      var uuid = '113F44CF-4850-4891-B48C-0E5A337DF580';
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

      cordova.plugins.locationManager.setDelegate(delegate);

      cordova.plugins.locationManager.requestWhenInUseAuthorization();

      cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();
    });
  }

  // Return beacon data to controllers
  return {
    all: function () {
      console.log('*return all*');
      return beacons;
    }
  };

});
