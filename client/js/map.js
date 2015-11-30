//Only run function once "map" template has finished rendering
//in order to avoid errors
Template.map.rendered = function() {
	// Draw each section
	//Initialise the map according to OSM_maps.js in lib
	osm_maps.initialise();

	//Run the following when the Sections Meteor collection changes
	//i.e. new coordinates inserted or old ones removed
	Deps.autorun(function() {
		var secs = Sections.find().fetch();
		var latlngs = [];
		//Check that collection is not empty
		if (secs) {
			// Temporarily set the type to "A"
			var t = "A";
			var heat = 0;
			//For each section, add the line to the map
			_.each(secs, function(section) {
				// console.log(section);
				latlngs = [];

				if (typeof section.start !== 'undefined' &&
		                	typeof section.finish !== 'undefined') {
					// Add section start and end to coordinate data
					latlngs.push(new L.LatLng(section.start.lat, section.start.lng));
					latlngs.push(new L.LatLng(section.finish.lat, section.finish.lng));
					
					// Set user type
					var type = "A";
					/*
					if(heat == 9) {
						heat = 1
					} else {
						heat = heat + 1;
					} */
					
					
					// Generate heat rankings
					var heat = 0;
					if (section.count > 1000) {
						heat = 9;
					} else if (section.count > 500) {
						heat = 8;
					} else if (section.count > 250) {
						heat = 7;
					} else if (section.count > 100) {
						heat = 6;
					} else if (section.count > 50) {
						heat = 5;
					} else if (section.count > 25) {
						heat = 4;
					} else if (section.count > 10) {
						heat = 3;
					} else if (section.count > 1) {
						heat = 2;
					} else {
						heat = 1;
						type = "C";
					}
					
					// Generate a line from the section data
					osm_maps.addLine(latlngs, type, heat);
				}
				


			});
		}
	});
}