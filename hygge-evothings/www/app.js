var app = (function()
{
	// Application object.
	var app = {};

	// Specify your beacon UUIDs here.
	var regions =
	[
		// Hygge & Mithun UUIDs
		{uuid:'113F44CF-4850-4891-B48C-0E5A337DF580'}
	];

	// Dictionary of beacons.
	var beacons = {};

    // Variables for view display.
    var onfloor = 0;
    var atbeacon = 0;
    var lastfloor = 0;
    var lastbeacon = 0;
    var coordinates = 0;

	// Timer that displays list of beacons.
	var updateTimer = null;

	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	function onDeviceReady()
	{
		// Specify a shortcut for the location manager holding the iBeacon functions.
		window.locationManager = cordova.plugins.locationManager;

		// Start tracking beacons!
		startScan();

        //Get Beacon coodinates
            var thisurl = "http://mithun-46828.azurewebsites.net/beacon-xy/";
             $.get(thisurl, function(response) {
                  $("#beacon-xy").html(response);
                  showBeacon(onfloor,atbeacon);
             });
		// Display refresh timer.
		updateTimer = setInterval(updateBeaconList, 5000);
	}

	function startScan()
	{
		// The delegate object holds the iBeacon callback functions
		// specified below.
		var delegate = new locationManager.Delegate();

		// Called continuously when ranging beacons.
		delegate.didRangeBeaconsInRegion = function(pluginResult)
		{
			//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
			for (var i in pluginResult.beacons )
			{
				// Insert beacon into table of found beacons.
				var beacon = pluginResult.beacons[i];
				beacon.timeStamp = Date.now();
				var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
				beacons[key] = beacon;
			}
		};

		// Called when starting to monitor a region.
		// (Not used in this example, included as a reference.)
		delegate.didStartMonitoringForRegion = function(pluginResult)
		{
			//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
		};

		// Called when monitoring and the state of a region changes.
		// (Not used in this example, included as a reference.)
		delegate.didDetermineStateForRegion = function(pluginResult)
		{
			//console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
		};

		// Set the delegate object to use.
		locationManager.setDelegate(delegate);

		// Request permission from user to access location info.
		// This is needed on iOS 8.
		locationManager.requestAlwaysAuthorization();

		// Start monitoring and ranging beacons.
		for (var i in regions)
		{
			var beaconRegion = new locationManager.BeaconRegion(
				i + 1,
				regions[i].uuid);

			// Start ranging.
			locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail(console.error)
				.done();

			// Start monitoring.
			// (Not used in this example, included as a reference.)
			locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done();
		}
	}

    function helloGoodbye(){
        //if thisbeacon = 0 and lastbeacon !=0 user has left say goodbye
        //if lastbeacon = 0 and thisbeacon !=0 user has arrived say hello
    }
    function clearView(){
        lastbeacon = atbeacon;
        lastfloor = onfloor;
        //clearfloor
        for(i=14;i>9;i--){
            $("#floor-"+i).removeClass("onfloor");
            $("#pin-"+i).hide();
        }
    }
    function showBeacon(thisfloor,thisbeacon){
        var xy = $("#"+thisfloor+"-"+thisbeacon).html().split(',');
        $("#pin-"+thisfloor).show().css({left:parseInt(xy[0],10),top:parseInt(xy[1],10)});
    }
    function updateLocation(thisfloor,thisbeacon){
				console.log("updateLocation:" + thisfloor + ", " + thisbeacon);
        if(thisbeacon!=lastbeacon){
            helloGoodbye();
            clearView();
            $("#floor-"+thisfloor).addClass("onfloor");
            //position beacon
            showBeacon(thisfloor,thisbeacon);
            //load content into beacon-cms
            var thisurl = "http://mithun-46828.azurewebsites.net/"+thisfloor+"-"+thisbeacon+"/";
             $.get(thisurl, function(response) {
                  $('#beacon-cms').html(response);
             });
        }
    }

	function updateBeaconList()
	{
		// Clear beacon list.
		$('#found-beacons').empty();

		console.log("updateBeaconList");
		var timeNow = Date.now();
		// Update beacon list.
		$.each(beacons, function(key, beacon)
		{
			// Only show beacons that are updated during the last 60 seconds.
			if (beacon.timeStamp + 60000 > timeNow)
			{
				// Map the RSSI value to a width in percent for the indicator.
				var rssiWidth = 1; // Used when RSSI is zero or greater.
				if (beacon.rssi < -100) { rssiWidth = 100; }
				else if (beacon.rssi < 0) { rssiWidth = 100 + beacon.rssi; }

				// Create tag to display beacon data.
				var element = $(
					'<li style="color:#888" data-major="' + beacon.major + '" data-minor="' + beacon.minor + '" data-distance="'+beacon.accuracy+'">'
					+	'<strong>UUID: ' + beacon.uuid + '</strong><br />'
					+	'Major: ' + beacon.major + '<br />'
					+	'Minor: ' + beacon.minor + '<br />'
					+	'Proximity: ' + beacon.proximity + '<br />'
					+ 'Distance:' + beacon.accuracy + '<br />'
					+	'RSSI: ' + beacon.rssi + '<br />'
					+ 	'<div style="background:rgb(255,128,64);height:20px;width:'
					+ 		rssiWidth + '%;"></div>'
					+ '</li>'
				);
            $('#found-beacons').append(element);
            var ul = $('#found-beacons'),
                li = ul.children('li');
                if (li.is(':empty')){
                    onfloor = 0;
                    atbeacon = 0;
                } else {
                    li.detach().sort(function(a,b) {
                        return $(a).data('distance') - $(b).data('distance');
                    });
                    ul.append(li);
                    var closest = li.first();
                    onfloor = closest.data('major');
                    atbeacon = closest.data('minor');
                    $('#closest-beacon').html("Floor:"+onfloor+"<br>Beacon:"+atbeacon);
                }
			}
		});
        updateLocation(onfloor,atbeacon);
	}

	return app;
})();

app.initialize();
