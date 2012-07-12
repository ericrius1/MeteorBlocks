if (Meteor.is_client) 
{
	canvas = null;
	ctx    = null;

	Meteor.startup(function() 
	{
		// Set up the player
		var player_name = prompt("Player Name", "Player");
		var player_id = Players.insert({name: player_name, score: 0});
		Session.set('player_id', player_id);

		// Start the canvas game
		var game = new Game();
		game.setup();
		game.setupEvents();
		game.startUpdateListener();
	});

	// Show the template for the players
	Template.leaderboard.players = function () {
	    return Players.find({}, {sort: {score: -1, name: 1}});
	};
}