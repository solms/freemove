var dummy_coords = [
	{type: 'A', lat: -33.932536, lon: 18.868616, set: 1},
	{type: 'A', lat: -33.932604, lon: 18.867879, set: 1},
	{type: 'A', lat: -33.931161, lon: 18.867707, set: 1},
	{type: 'A', lat: -33.932336, lon: 18.858781, set: 1}
];

Meteor.methods({
	//Adds the above defined data to the collection
	loadDummyData: function () {
		dummy_coords.forEach(function (dummy_coord) {
			Coordinates.insert(dummy_coord);
			console.log("Added the dummy coordinates.");
		});
	},
	//Clears the database
	DBclear: function () {
		Coordinates.remove({});
		Sections.remove({});
		Intersecs.remove({});
		console.log("Cleared the database.");
	},
	// Returns the coordinates in the data store
	COORDshow: function () {
		console.log(Coordinates.find({}).fetch());
	},
	// Returns the sections in the data store
	SECshow: function () {
		console.log(Sections.find({}).fetch());
	}
});