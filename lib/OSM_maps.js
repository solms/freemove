osm_maps = {
	map: null,

	A: null,
	B: null,
	C: null,

	//Add the line to the appropriate map layer, based on type
	addLine : function (latlngs, type, heat) {
		var c;
		switch (heat) {
			case 1:
				c = 'Aqua';
				break;
			case 2:
				c = 'DeepSkyBlue';
				break;
			case 3:
				c = 'Teal';
				break;
			case 4:
				c = 'Blue';
				break;
			case 5:
				c = 'MediumBlue';
				break;
			case 6:
				c = 'DarkBlue';
				break;
			case 7:
				c = 'Navy';
				break;
			case 8:
				c = 'MidnightBlue';
				break;
			case 9:
				c = 'Black';
				break;
		}
		switch (type) {
			case 'A':
				var polyline = L.polyline(latlngs, {
					color: c,
					weight: heat
				});
				this.A.addLayer(polyline);
				break;
			case 'B':
				var polyline = L.polyline(latlngs, {
					color: 'red',
					weight: 2
				});
				this.B.addLayer(polyline);
				break;
			case 'C':
				var polyline = L.polyline(latlngs, {
					color: 'green',
					weight: 2
				});
				this.C.addLayer(polyline);
				break;

		}
	},

	// Adds a polygon to the map
	addPolygon : function(latlngs) {
		var polygon = L.polygon(latlngs).addTo(this.map);
	},

	// Adds a marker to the map
	addMarker : function(latlng, t) {
		//var marker = L.marker(latlng).addTo(this.map);
		if (t == "A"){
			var circle = L.circle(latlng, 0.1, {
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.5
			}).addTo(this.map);
		} else {
			var circle = L.circle(latlng, 0.1, {
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.7
			}).addTo(this.map);
		}
		

	},

	//Initialise the map, centered on the student part of Stellenbosch, and add the appropriate
	//layers
	initialise : function () {
		console.log("Initialising the map...");
		var cloudmadeUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg';
	    var subDomains = ['otile1','otile2','otile3','otile4'];
	    var cloudmadeAttrib = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>';
	    var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib, subdomains: subDomains});

	    var dagbreek = new L.LatLng(-33.932607, 18.868643);

	    var A = L.layerGroup(); //Wheelchair user
	    this.A = A;
	    var B = L.layerGroup(); //Sight disabled
	    this.B = B;
	    var C = L.layerGroup(); //Singular traffic section
	    this.C = C;

	    this.map = new L.Map('map-canvas', {center: dagbreek, zoom: 14, layers : [cloudmade, this.A, this.B, this.C]});

	    //Add map controller
	    //Reference: http://leafletjs.com/examples/layers-control.html
	    var baseMaps = {
		    "Open Street Maps": cloudmade
		};
		var overlayMaps = {
		    "Wheelchair users" : this.A,
		    "Sight disabled" : this.B,
		    "Routes only used once" : this.C
		};
		L.control.layers(baseMaps, overlayMaps).addTo(this.map);
	}

}