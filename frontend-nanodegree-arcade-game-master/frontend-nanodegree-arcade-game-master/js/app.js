// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = startX * -100;
    this.y = startY * 83; // each enemy appears on the next row (changed to 83 to align rows)
    this.speed = this.getSpeed();
    return this;
};

// getSpeed() returns the speed the bugs travel
//base speed is 100, can increase up to 300
Enemy.prototype.getSpeed = function() {
	var speed = Math.floor(Math.random()*9)*25 + 100; //speed increases by 25 up to 300
    return speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += ( this.speed * dt );

    // check to see if the bug has gone off its respective edge;
    // if so, reset the bug
    
	if( this.x > 588 ) {
		this.reset();
		return;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.sprite = 'images/enemy-bug.png';
	this.x = -100;
    this.speed = this.getSpeed();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function( startX, startY ) {
    // image chosen for the player
    this.sprite = 'images/char-boy.png';
    // player will start at the given location
    this.x = startX;
    this.y = startY;
    // initialize the movement to zero
    this.changeX = 0;
    this.changeY = 0;
	
    return this;
};

Player.prototype.update = function() {
    // player attempts to move off the left edge of the board
    if( this.x + this.changeX < 0 ) {
        this.x = 0;
    }

    // player attempts to move off the right edge of the board
    else if( this.x + this.changeX > 402 ) {
        this.x = 402;
    }

    // player attempts to move off the top edge of the board
    else if( this.y + this.changeY < 0 ) {
        this.y = 0;
		player.reset(); //reset if player reaches water
		console.log('You reached the water!');   

    }

    // player attempts to move off the bottom edge of the board
    else if( this.y + this.changeY > 435 ) {
        this.y = 435;
    }

    // otherwise, move the player according to the directional button pressed
    else {
        this.x += this.changeX;
        this.y += this.changeY;
    }

    // reset current movement
    this.changeX = 0;
    this.changeY = 0;
};

Player.prototype.render = function() {
    ctx.drawImage( Resources.get( this.sprite ), this.x, this.y );
};

// this function uses the event listener defined below to determine
// which key was pressed and then how to move the player;
// the player moves in 101/2 or 83/2 to align with blocks
Player.prototype.handleInput = function( key ) {
    switch( key ) {
        case 'left':
            this.changeX = -101/2;
            break;

        case 'up':
            this.changeY = -83/2;
            break;

        case 'right':
            this.changeX = 101/2;
            break;

        case 'down':
            this.changeY = 83/2;
            break;

        default:
            break;
    }
};

// reset() puts the player back at the starting position, with no movement values, and zero score
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 600;

    this.changeX = 0;
    this.changeY = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// number of enemies to start with
var totalEnemies = 5;
var allEnemies = [];

// add the enemies to the allEnemies array
// the counter determines which row the enemy appears on
for( var row = 0; row < totalEnemies; row++ ) {
    allEnemies.push( new Enemy(1, row ) );
}

var player = new Player( 200, 600 );


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});