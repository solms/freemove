Meteor.publish('all_coords', function () {
	return Coordinates.find({});
});