angular.module('hygge.device', [])

.controller('DeviceCtrl', function($scope, $state) {

  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    console.log(device.cordova);
  }

});
