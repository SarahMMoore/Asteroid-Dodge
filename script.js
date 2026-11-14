// Global variables to store the player, background, obstacles, and score
var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;

// Sets up the starting scene and launches a simple 2D space-themed browser game.
function startGame() {
    myGamePiece = new component(40, 33, "no-fuel.gif", 10, 120, "image");
    myBackground = new component(500, 300, "space.jpg", 0, 0, "background");
    myScore = new component("24px", "Arial", "lime", 280, 40, "text");
    myGameArea.start();
}

// Game loop that updates the game area, checks for collisions, and handles the movement of obstacles and the player's spaceship.
function updateGameArea() {
    // Check if the player's spaceship has crashed into any active asteroid
    for (var i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }

    // Clear the canvas before drawing the next frame
    myGameArea.clear();

    // Scroll the space background slowly to the left
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();

    // Advance the frame counter and spawn a new asteroid every 100 frames
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        var x = myGameArea.canvas.width;
        var asteroidHeight = 40;
        var y = Math.floor(Math.random() * (myGameArea.canvas.height - asteroidHeight));
        myObstacles.push(new component(40, asteroidHeight, "asteroid.gif", x, y, "image"));
    }

    // Move all active asteroids to the left and redraw them
    for (var i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }

    // Update the score display based on how many frames the player has survived
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();

    // Update and redraw the player's spaceship position
    myGamePiece.newPos();
    myGamePiece.update();
}

// Manages the HTML5 canvas element and the main game timer
var myGameArea = {
    canvas : document.createElement("canvas"),
    // Creates the canvas, adds it to the page, and starts the 20ms game loop
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    // Wipes the entire canvas clean between frames
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // Stops the game loop timer when the player crashes
    stop : function() {
        clearInterval(this.interval);
    }
}

// Constructor function used to create game objects 
function component(width, height, color, x, y, type) {
    this.type = type;
    // Load an image file if the component is a sprite or background
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    // Draws the component onto the canvas based on its type
    this.update = function() {
        var ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "image" || this.type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            // Draw a second copy of the background for seamless scrolling
            if (this.type == "background") {
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Updates the component's coordinates using its current speed
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Reset background position once it scrolls off the left edge
        if (this.type == "background") {
            if (this.x <= -(this.width)) {
                this.x = 0;
            }
        }
    }

    // Checks if this component's bounding box overlaps with another object
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

// Helper function that returns true whenever the current frame number is a multiple of n
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

// Moves the spaceship in the given direction and switches to the thruster animation
function move(dir) {
    myGamePiece.image.src = "space-ship.gif";
    if (dir == "up") { myGamePiece.speedY = -1; }
    if (dir == "down") { myGamePiece.speedY = 1; }
    if (dir == "right") { myGamePiece.speedX = 1; }
    if (dir == "left") { 
        myGamePiece.image.src = "no-fuel.gif";
        myGamePiece.speedX = -1; 
    }
}

// Stops spaceship movement and resets the sprite to the idle image
function clearmove() {
    myGamePiece.image.src = "no-fuel.gif";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
