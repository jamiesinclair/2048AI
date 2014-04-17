


var board = new function(size) {
	
	var b = {};
	
	// default board size
	b.size = (typeof size=='undefined') ? 4 : size;
	
	b.settings = {
		delay:200,
		newSquareValues:[2,2,2,4,4]
	};
	
	
	
	var blockSize = 60;
	var blockMargin = 3;
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
		var square = {value:value,html:htmlSquare,merge:0};
		b.arr[x][y] = square;
		
		
	};
	
	
	b.makeRandomSquare = function(values) {
		values = (typeof values=='undefined' || !$.isArray(values)) ? b.settings.newSquareValues : values;
		
		var finalVal = values[Math.floor(Math.random() * values.length)];
		
		var spaces = b.freeSpaces();
		
		if(!spaces.length) {
			alert('game over!');
			return;
		}
		
		var finalSpace = spaces[Math.floor(Math.random() * spaces.length)];
		
		b.placeSquare(finalSpace.x,finalSpace.y,finalVal);
		
	};
	
	b.moveSquare = function(x,y,dx,dy) {
		
		var newX = x+dx;
		var newY = y+dy;
		
		var squarePositionLeft = ((newX*blockSize)+blockMargin+((newX*2)*blockMargin))+'px';
		var squarePositionTop = ((newY*blockSize)+blockMargin+((newY*2)*blockMargin))+'px';
		
		var square = b.arr[x][y];
		
		var callback = null;
		// console.log(b.arr[x][y]);
		if(square.merge && square.merge!==true) {
			// console.log(square.merge);
			callback = function() {
				square.html.remove();
				square.merge.html.remove();
				b.placeSquare(newX,newY,square.value*2);
			};
		}
		
		// visible
		var div = square.html.animate({left:squarePositionLeft,top:squarePositionTop},b.settings.delay,'swing',callback);
		
		
		// internal
		b.arr[x][y] = 0;
		b.arr[newX][newY]=square;
	};
	
	
	
	
	
	
	
	
	
	b.dumpBoard = function() {
		for(var i=0;i<b.arr.length;i++) {
			console.log(b.arr[i]);
		}
	};
	
	
	
	
	// generate the board and return...
	b.generate();
	
	// b.makeRandomSquare();
	// b.makeRandomSquare();
	
	// console.log(b);
	b.placeSquare(1,0,4);
	b.placeSquare(1,1,2);
	b.placeSquare(1,2,2);
	// b.placeSquare(1,3,4);
	// b.placeSquare(0,1,2);
	// b.placeSquare(2,2,2);
	// b.placeSquare(0,0,32);
	// b.placeSquare(0,3,4);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	b.swipe = function(direction) {
		
		var movementFlag = false;
		
		var x,y,dx,dy=0;
		
		// case, 'left'
		if(direction=='left') {
			for(x=1;x<b.size;x++) {
				for(y=0;y<b.size;y++) {
					if(b.arr[x][y]!=0) {
						for(dx=0,count=0;count<x;count++,dx--) {
							if(b.arr[(x+(dx-1))][y]==0) {
								continue;
							}else {
								// merge check
								if(b.arr[x][y].value==b.arr[(x+(dx-1))][y].value && !b.arr[(x+(dx-1))][y].merge) {
									// merge...
									b.arr[x][y].merge = b.arr[(x+(dx-1))][y];
									b.arr[(x+(dx-1))][y].merge = true;
									dx--;
								}
								break;
							}
						}
						if(dx!=0) {
							movementFlag = true;
							b.moveSquare(x,y,dx,0);
						}
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
								// merge check
								if(b.arr[x][y].value==b.arr[(x+(dx+1))][y].value && !b.arr[(x+(dx+1))][y].merge) {
									// merge...
									b.arr[x][y].merge = b.arr[(x+(dx+1))][y];
									b.arr[(x+(dx+1))][y].merge = true;
									dx++;
								}
								break;
							}
						}
						if(dx!=0) {
							movementFlag = true;
							b.moveSquare(x,y,dx,0);
						}
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
								// merge check
								if(b.arr[x][y].value==b.arr[x][(y+(dy-1))].value && !b.arr[x][(y+(dy-1))].merge) {
									// merge...
									
									b.arr[x][y].merge = b.arr[x][(y+(dy-1))];
									b.arr[x][(y+(dy-1))].merge=true;
									dy--;
								}
								break;
							}
						}
						if(dy!==0) {
							movementFlag = true;
							b.moveSquare(x,y,0,dy);
						}
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
								// merge check
								if(b.arr[x][y].value==b.arr[x][(y+(dy+1))].value && !b.arr[x][(y+(dy+1))].merge) {
									// merge...
									b.arr[x][y].merge = b.arr[x][(y+(dy+1))];
									b.arr[x][(y+(dy+1))].merge=true;
									dy++;
								}
								break;
							}
						}
						if(dy!==0) {
							movementFlag = true;
							b.moveSquare(x,y,0,dy);
						}
					}
				}
			}
		}
		
		if(!movementFlag) {
			// alert('you must swipe in a direction so that at least one square moves...');
			return;
		}
		
		window.setTimeout(function(){b.makeRandomSquare();},b.settings.delay+25);
		
	}; // eof swipe
	
	// setup swipe bindings...
	$(window).bind('keyup','left',function(){b.swipe('left');});
	$(window).bind('keyup','right',function(){b.swipe('right');});
	$(window).bind('keyup','up',function(){b.swipe('up');});
	$(window).bind('keyup','down',function(){b.swipe('down');});
	
	
	
	
	
	
	
	
	
	// console.log(b.freeSpaces());
	return b;
};

