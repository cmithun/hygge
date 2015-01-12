angular.module('hygge.contextControllers', ['ngResource'])

.controller('ContextCtrl', function($scope, contextLocations) {

  $scope.locations = contextLocations.query();

});
