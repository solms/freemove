 Router.configure({
   layoutTemplate: 'layout'  //can be any template name
 });


Router.map(function () {
	this.route('home', {
		path: '/',
		waitOn: function () {return Meteor.subscribe('all_coords')},
		data: function () {
			return {
				loggedIn: Meteor.user()
			};
		}
	});

	this.route('map', {
		onBeforeAction: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                toastr.error('You need to log in to see this.', 'Oh no!')
                this.redirect('home');
            }
    	},
		waitOn: function () {return Meteor.subscribe('all_coords')},
		data: function () {
			var coords = Coordinates.find({}).fetch();
			return {
				coords : coords
			};
		}
	});

	this.route('data', {
		onBeforeAction: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
            	toastr.error('You need to log in to see this.', 'Oh no!')
                this.redirect('home');
            }
    	},
		waitOn: function () {return Meteor.subscribe('all_coords')}
	})

})