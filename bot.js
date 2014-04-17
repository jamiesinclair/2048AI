var bot = new function() {
	
	var bot = {};
	
	bot.settings = {
		moveSpeed:50,
		gameAnimationSpeed:20
	};
	
	board.settings.delay = bot.settings.gameAnimationSpeed;
	
	var directions = ['left','right','up','down'];
	
	var playing = false;
	var loop = function() {
		
		if(!playing) {
			return;
		}
		
		var temp = 0;
		var dir = null;
		while(true) {
			dir = directions[Math.floor(Math.random() * directions.length)];
			temp = board.swipe(dir);
			
			if(temp===-2) {
				// console.log('cannot move '+dir)
				continue;
			} else if(temp===-3) {
				var score = board.score();
				console.log('oops, I failed to win. My score was '+score.total+' with a high square of '+score.highest);
				playing = false;
				$(window).trigger('gameOver',score);
				return;
			}else {
				break;
			}
		}
		
		// randomly move...
		window.setTimeout(loop,bot.settings.moveSpeed);
	};

	bot.start = function() {
		playing = true;
		loop();
	};
	
	
	bot.stop = function() {
		playing = false;
		// window.clearInterval(interval);
		// interval = null;
	};
	
	
	
	return bot;
};