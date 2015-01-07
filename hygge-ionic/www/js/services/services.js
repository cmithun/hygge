angular.module('hygge.services', [])

.factory('DeviceService', function () {

    return {
      getDevice: function () {
        return window.device;
      }
    };

});
