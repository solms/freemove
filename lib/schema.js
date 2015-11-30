// _id, type, lat, lon, time, set
Coordinates = new Meteor.Collection("coordinates");
// _id, sec_ID, start (lat, lng), finish (lat, lng), centre(lat, lng), 
// bounds (cnr1-4(lat, lng)), short_bb, long_bb, lat_min, lat_max, 
// lng_min, lng_max, count
Sections = new Meteor.Collection("sections");
// Temporary storage for all the intersections
Intersecs = new Meteor.Collection("intersecs");