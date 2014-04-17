


var board = new function(size) {
	
	var b = {};
	
	// default board size
	b.size = (typeof size=='undefined') ? 4 : size;
	
	
	
	
	
	var blockSize = 60;
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
	
	
	b.freeSpaces = function() {
		var spaces = [];
		for(x=0;x<b.size;x++) {
			for(y=0;y<b.size;y++) {
				if(b.arr[x][y]==0) {
					spaces.push({x:x,y:y});
				}
			}
		}
		
		return spaces;
	};
	
	b.placeSquare = function(x,y,value) {
		if(typeof x == 'undefined' || typeof y == 'undefined' || typeof value == 'undefined') {return false;}
		
		// visible
		var squarePositionLeft = ((x*blockSize)+blockMargin+((x*2)*blockMargin))+'px';
		var squarePositionTop = ((y*blockSize)+blockMargin+((y*2)*blockMargin))+'px';
		
		var htmlSquare = $('<div>').addClass('square').addClass('val'+value)
		.css({left:squarePositionLeft,top:squarePositionTop,width:blockSize,height:blockSize})
		.html(value);
		
		b.htmlBoard.append(htmlSquare);
		
		
		
		// internal...
		var square = {value:value,html:htmlSquare};
		b.arr[x][y] = square;
		
		
	};
	
	
	b.makeRandomSquare = function(values) {
		values = (typeof values=='undefined' || !$.isArray(values)) ? [2, 2,4] : values;
		
		var finalVal = values[Math.floor(Math.random() * values.length)];
		
		var spaces = b.freeSpaces();
		
		var finalSpace = spaces[Math.floor(Math.random() * spaces.length)];
		
		b.placeSquare(finalSpace.x,finalSpace.y,finalVal);
		
	};
	
	b.moveSquare = function(x,y,dx,dy) {
		
		var newX = x+dx;
		var newY = y+dy;
		
		var squarePositionLeft = ((newX*blockSize)+blockMargin+((newX*2)*blockMargin))+'px';
		var squarePositionTop = ((newY*blockSize)+blockMargin+((newY*2)*blockMargin))+'px';
		
		
		
		// visible
		var div = b.arr[x][y].html.animate({left:squarePositionLeft,top:squarePositionTop},1000);
		
		// internal
		var temp = b.arr[x][y];
		b.arr[x][y] = 0;
		b.arr[newX][newY]=temp;
	};
	
	b.swipe = function(direction) {
		// console.log('swipe '+direction);
		var x,y,dx,dy=0;
		
		// case, 'left'
		if(direction=='left') {
			for(x=1;x<b.size;x++) {
				for(y=0;y<b.size;y++) {
					if(b.arr[x][y]!=0) {
						for(dx=0,count=0;count<x;count++,dx--) {
							// console.log((x+(dx-1)));
							if(b.arr[(x+(dx-1))][y]==0) {
								continue;
							}else {
								break;
							}
						}
						b.moveSquare(x,y,dx,0);
						// console.log('move square at '+x+','+y+' by dx=='+dx);
					}
				}
			}
		} // eof 'left'
		
		
		// case, 'right'
		if(direction=='right') {
			for(x=b.size-2;x>=0;x--) {
				for(y=0;y<b.size;y++) {
					if(b.arr[x][y]!=0) {
						for(dx=0,count=0;count<(b.size-x-1);count++,dx++) {
							// console.log((x+(dx+1)));
							if(b.arr[(x+(dx+1))][y]==0) {
								continue;
							}else {
								break;
							}
						}
						b.moveSquare(x,y,dx,0);
						// console.log('move square at '+x+','+y+' by dx=='+dx);
					}
				}
			}
		}
		
		
		// case, 'up'
		if(direction=='up') {
			for(y=1;y<b.size;y++) {
				for(x=0;x<b.size;x++) {
					if(b.arr[x][y]!=0) {
						// console.log(x+','+y);
						for(dy=0,count=0;count<y;count++,dy--) {
							// console.log((y+(dy+1)));
							if(b.arr[x][(y+(dy-1))]==0) {
								continue;
							}else {
								break;
							}
						}
						b.moveSquare(x,y,0,dy);
						// console.log('move square at '+x+','+y+' by dy=='+dy);
					}
				}
			}
		}
		
		
		// case, 'down'
		if(direction=='down') {
			for(y=b.size-2;y>=0;y--) {
				for(x=0;x<b.size;x++) {
					if(b.arr[x][y]!=0) {
						// console.log(x+','+y);
						for(dy=0,count=0;count<(b.size-y-1);count++,dy++) {
							// console.log((y+(dy+1)));
							if(b.arr[x][(y+(dy+1))]==0) {
								continue;
							}else {
								break;
							}
						}
						b.moveSquare(x,y,0,dy);
						// console.log('move square at '+x+','+y+' by dy=='+dy);
					}
				}
			}
		}
		
	};
	$(window).bind('keyup','left',function(){b.swipe('left');});
	$(window).bind('keyup','right',function(){b.swipe('right');});
	$(window).bind('keyup','up',function(){b.swipe('up');});
	$(window).bind('keyup','down',function(){b.swipe('down');});
	
	// generate the board and return...
	b.generate();
	
	// console.log(b);
	// b.placeSquare(1,1,2);
	// b.placeSquare(0,0,32);
	// b.placeSquare(0,3,4);
	
	// console.log(b.freeSpaces());
	return b;
};

