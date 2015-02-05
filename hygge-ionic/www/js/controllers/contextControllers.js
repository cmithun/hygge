angular.module('hygge.contextControllers', ['ngResource'])

.controller('ContextCtrl', function($scope, contextLocations) {

  //$scope.locations = contextLocations.query();
  $scope.locations = contextLocations.all();
  //$scope.getLocation = function(major, minor){ return contextLocations.get(major, minor);}
})

.controller('PersonContext', function($scope, contextPeople, $ionicScrollDelegate) {
    $scope.personSearch = {name: ''};
    $scope.people = contextPeople.all();
/*    $scope.people = new Array();  
    $scope.people.push({"name":"Sean O'Brien", "title":"Chief Technologist", "seat":"3809", "imgsrc":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/v/t1.0-1/c0.39.160.160/p160x160/228418_10150582365685134_6219213_n.jpg?oh=f90a7efc0e564767170a38c5e1dc6580&oe=55527F52&__gda__=1430910712_8b273fc4329b98a7e05d94524f45d978"});
    $scope.people.push({"name":"Jane Smith", "title":"26", "seat":"1000"});
    $scope.people.push({"name":"William Andrews", "title":"32", "seat":"2000"});
    $scope.people.push({"name":"Allison Brown", "title":"55", "seat":"3000"});
    $scope.people.push({"name":"Stephanie Wayne", "title":"40", "seat":"4000"});
    */
});
