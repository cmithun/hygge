angular.module('hygge.contextServices', ['ionic'])

.factory('contextLocations', function ($ionicPlatform, $http, $resource,$ionicLoading) {

  var locations = [];
        Parse.initialize("esEzAijFsA4sLXUjFHtzuJuqwODQqoopF9oIqYPo", "DzDkPd6TYxYCEhMJdbDMuVoM7jMOmXEwziqnJV1l");
        console.log("parse initialized in contextService");
        var KontorRun = Parse.Object.extend("KontorRun");
        var krun = new KontorRun();
          krun.save({run: 1}, {
          success: function(object) {
            //$(".success").show();
          },
          error: function(model, error) {
            //$(".error").show();
          }
        });  
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
       var zentext = new Array("Patience.", "To know and not to do is not yet to know.", "It's not how good you are, it's how good you want to be.", "What we do today is what matters most.", "Chop wood, carry water.", "Concentrate on the present moment.","A family is a place where minds come in contact with one another.","A jug fills drop by drop.","Listen.","Move and the way will open.","Simplify.","You must unlearn what you have learned.","Hustle.");
    $ionicLoading.show({
        template: '<img src="img/square-loader.gif" style="height:43px"><br>'+zentext[Math.floor(Math.random() * 12)]
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
          loc.radius = rawlocs[i].custom_fields.radius[0];

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
          console.log("BEACON DATA FOR " + locations[i].major +"-"+ locations[i].minor);
          if (locations[i].major == major && locations[i].minor == minor) {
              //console.log('Locations: ', locations[i]);
              return locations[i];
          }
      }
    }
  };

})

.factory('contextPeople', function ($ionicPlatform, $http, $resource,$ionicLoading) {

  var people = [];
  
    $ionicLoading.show({
        template: '<img src="img/square-loader.gif" style="height:43px"><br>Updating people and locations...'
    })       
    $http.get('http://mithun-46828.azurewebsites.net/?post_type=person&json=1')
    //$http.get('http://mithun-46828.azurewebsites.net/locationsjson?json=1')
      .success(function(data, status, headers, config){
        $ionicLoading.hide();
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
          var ped = {};
          ped.name = rawlocs[i].custom_fields.name[0];
          ped.seat = rawlocs[i].custom_fields.seat[0];
          ped.title = rawlocs[i].custom_fields.title[0];
          ped.imgsrc = rawlocs[i].custom_fields.imgsrc[0];
          ped.floor = rawlocs[i].custom_fields.floor[0];
          ped.x = rawlocs[i].custom_fields.x[0];
          ped.y = rawlocs[i].custom_fields.y[0];

          people.push(ped);
        }
        //console.log("all locations: " + JSON.stringify(locations));
      });

  // }
  //

  // Return context data to controllers
  return {
    all: function () {
      return people;
    }
  };

});
