angular.module('hygge.contextServices', ['ionic'])

.factory('contextLocations', function ($ionicPlatform, $http, $resource,$ionicLoading) {

  var locations = [];
  
   // Mock data for console UI debug
   if (!window.cordova) {
     locations = [{
       major: 13,
       minor: 1,
       floor: 13,
       x: 50,
       y: 50,
       message: 'test beacon 1'
     },{
       major: 13,
       minor: 2,
       floor: 13,
       x: 100,
       y: 100,
       message: 'test beacon 2'
     }];
   }
   else {
    $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i><br>Updating content...'
    })       
    $http.get('http://mithun-46828.azurewebsites.net/?post_type=beacon&json=1')
    //$http.get('http://mithun-46828.azurewebsites.net/locationsjson?json=1')
      .success(function(data, status, headers, config){
        $ionicLoading.hide();
        //console.log('Success', status);
        //fire directive to show tabs
        //alert("bind");
      })
      .error(function(data, status, headers, config){
        //console.log('Error', status);
      })
      .then(function(response){
        var jsonData = response.data;
        //console.log(jsonData);
        var rawlocs = jsonData.posts;

        //Walk the list and create our own data structure
        for (var i = 0; i < rawlocs.length; i++){
          var loc = {};
          loc.slug = rawlocs[i].slug;
          loc.title = rawlocs[i].title;
          loc.excerpt = rawlocs[i].excerpt;
          loc.content = rawlocs[i].content;
          loc.major = rawlocs[i].custom_fields.major[0];
          loc.minor = rawlocs[i].custom_fields.minor[0];
          loc.x = rawlocs[i].custom_fields.x[0];
          loc.y = rawlocs[i].custom_fields.y[0];
          loc.floor = rawlocs[i].custom_fields.floor[0];

          locations.push(loc);
        }
        //console.log("all locations: " + JSON.stringify(locations));
      });

   }
  //

  // Return context data to controllers
  return {
    all: function () {

      return locations;
    },
    get: function(major, minor) {
      for (var i = 0; i < locations.length; i++){
          console.log("TESTING " + locations[i].major + locations[i].minor);
          if (locations[i].major == major && locations[i].minor == minor) {
                console.log('Locations: ', locations[i]);
              return locations[i];
          }
      }
    }
  };

});
