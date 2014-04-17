
var test = new function() {
	var test = {};
	
	var count = 0;
	test.scores = [];

	test.runTest = function() {
		if(count>10) {
			console.log(test.scores);
			return;
		}
		count++;
		
		board.reset();
		
		window.setTimeout(function(){bot.start();},1000);
	}

	$(window).on('gameOver',function(e,score) {
		test.scores.push(score);
		window.setTimeout(function(){test.runTest();},1000);
	});
	
	return test;
}

