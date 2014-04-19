# 2048AI

I'm building the 2048 game so I can experiment with different approaches to solving it algorithmically.


To do:


- (4/17/14) randomly place a square in an open space
- (4/17/14) swipe squares across the board
- (4/17/14) merge function that joins two squares of the same value when bumped by a swipe


- (4/17/14) Create basic "bot" that will play the game
- (4/18/14) Add controls to change animationSpeed and botDelay (utilize triggers keep visual control in sync with internal values)
- Add look ahead that can tell if a move can be made...this is necessary to know if the game is actually over (just realized that currently it ends when all the squares are placed...but maybe there are a couple 2s next to each other).
- Design said look ahead feature to be able to check direction of swipe...and use any given board config (thus could be used for AI to look ahead multiple boards)
- experiment with simple techniques (e.g. alternate up and left)
- Implement heuristics to more intelligently play the game (e.g. look ahead, keeping high values in corner)

