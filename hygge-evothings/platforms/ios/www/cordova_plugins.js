cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.evothings.ble/ble.js",
        "id": "com.evothings.ble.BLE",
        "clobbers": [
            "evothings.ble"
        ]
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/lib/underscore-min-1.6.js",
        "id": "com.unarin.cordova.beacon.underscorejs",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/lib/q.min.js",
        "id": "com.unarin.cordova.beacon.Q",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/LocationManager.js",
        "id": "com.unarin.cordova.beacon.LocationManager",
        "merges": [
            "cordova.plugins"
        ]
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/Delegate.js",
        "id": "com.unarin.cordova.beacon.Delegate",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/Region.js",
        "id": "com.unarin.cordova.beacon.Region",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/Regions.js",
        "id": "com.unarin.cordova.beacon.Regions",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/CircularRegion.js",
        "id": "com.unarin.cordova.beacon.CircularRegion",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/BeaconRegion.js",
        "id": "com.unarin.cordova.beacon.BeaconRegion",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "id": "org.apache.cordova.console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "id": "org.apache.cordova.console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.evothings.ble": "0.0.1",
    "com.unarin.cordova.beacon": "3.2.2",
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.device": "0.2.13",
    "org.apache.cordova.vibration": "0.3.12"
}
// BOTTOM OF METADATA
});