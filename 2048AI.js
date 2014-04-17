


var board = new function(size) {
	
	var b = {};
	
	// default board size
	b.size = (typeof size=='undefined') ? 4 : size;
	
	
	
	
	
	var blockSize = 80;
	var blockMargin = 5;
	b.generate = function() {
		
		// the visible board backdrop...
		
		b.htmlBoard = $('<div>').attr('id','board2048');
		var containerSize = ((blockSize*b.size)+((blockMargin*2)*(b.size)))+'px';
		b.htmlBoard.css({width:containerSize,height:containerSize});
		
		for(i=0;i<(b.size*b.size);i++) {
			temp = $('<div>').addClass('block').css({width:blockSize,height:blockSize,margin:blockMargin});
			b.htmlBoard.append(temp);
		}
		
		// append this to the body...
		$('body').append(b.htmlBoard);
		
		
		
		
		// the internal board:
		for(i=0;i<b.size;i++) {
			b.arr = [];
			for(x=0;x<b.size;x++) {
				b.arr[x]=[];
				for(y=0;y<b.size;y++) {
					b.arr[x][y] = 0;
				}
			}
		}
		
	};
	
	
	b.countFreeSpaces = function() {
		var count = 0;
		for(x=0;x<b.size;x++) {
			for(y=0;y<b.size;y++) {
				if(b.arr[x][y]==0) {
					count++;
				}
			}
		}
		
		console.log(count);
		return count;
	};
	
	b.placeSquare = function(x,y,value) {
		if(typeof x == 'undefined' || typeof y == 'undefined' || typeof value == 'undefined') {return false;}
		
		// internal...
		var square = {value:value};
		b.arr[x][y] = square;
		
		// visible
		var squarePositionLeft = ((x*blockSize)+blockMargin+((x*2)*blockMargin))+'px';
		
		var squarePositionTop = ((y*blockSize)+blockMargin+((y*2)*blockMargin))+'px';
		
		var htmlSquare = $('<div>').addClass('square').addClass('val'+value)
		.css({left:squarePositionLeft,top:squarePositionTop,width:blockSize,height:blockSize})
		.html(value);
		
		b.htmlBoard.append(htmlSquare);
		
	};
	
	
	
	// generate the board and return...
	b.generate();
	
	console.log(b);
	b.placeSquare(1,1,2);
	b.placeSquare(0,0,32);
	b.placeSquare(0,3,4);
	
	b.countFreeSpaces();
	return b;
};

