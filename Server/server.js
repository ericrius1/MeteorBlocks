if (Meteor.is_server) {

	function Game () 
	{
		// Set up canvas
		this.setup = function() 
		{
			canvas = document.getElementById('canvas');
			ctx    = canvas.getContext('2d');
		}

		// Set up click events
		this.setupEvents = function() 
		{
			canvas.addEventListener('click', function(e) 
			{
			  Shapes.insert(
			  { 
			    positionx: e.pageX, 
			    positiony: e.pageY
			  });
			  var me = Players.findOne(Session.get('player_id'));
			  newscore = me.score + 1;
		      Players.update(Session.get('player_id'), {$set: {score: newscore }});
			});
		}

		// Set up listeners for the draw method
		this.startUpdateListener = function() 
		{
			var redrawCanvas = function() 
			{
			    var context = new Meteor.deps.Context()
			    context.on_invalidate(redrawCanvas)

			    context.run(function() 
			    {
				    var shapes = Shapes.find({})
				    shapes.forEach(function(shape) 
				    {
					    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
					    ctx.fillRect (shape.positionx, shape.positiony, 20, 20);
				    })
			    })
			}
			redrawCanvas()
		}
	}
}