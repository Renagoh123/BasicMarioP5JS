/*
Coursework 2 - Final Game Project

"The character is hungry. It wants to collect some apples on the way home. Score incrementing by 1 each time collecting the apple. Don't collect the poisonous purple apple and be careful don't fall in canyon. Get your score by collecting the red apple NOW!"

'D' or right arrow key(→) to MOVE RIGHT
'A' or left arrow key(←) to MOVE LEFT
SpaceBar to JUMP

*/

///////////////////////////////////////////////////

//global variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var gameChar_width;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees;
var canyons;
var collectables;
var flagpole;
var lives;
var game_score;

var enemies;
var platforms;

var jumpSound;
var collectSound;
var fallSound;
var loseSound;
var winSound;
var hitSound;

var soundReady;
var soundLoadCounter;
var finalGameOverSoundPlayed;
var backgroundSoundPlayed;

var brick;
var houseImg;
var stage = 0; //game control

var startTime;
var remainingTime;
var timeLimit = 12; //set time limit to 12
var timeOver;

///////////////////////////////////////////////////
// Function to load all the sound
function preload()
{
    soundReady = false;
    soundLoadCounter = 0;
    
    //load sound effects 
    soundFormats('mp3','wav');
    jumpSound = loadSound('assets/jump.wav',soundLoaded);
    collectSound = loadSound('assets/collect.wav',soundLoaded);
    fallSound = loadSound('assets/fall.wav',soundLoaded);
    loseSound = loadSound('assets/lose.wav',soundLoaded);
    winSound = loadSound('assets/win.wav',soundLoaded);
    hitSound = loadSound('assets/hit.wav',soundLoaded);
    backgroundSound = loadSound('assets/background.mp3',soundLoaded);
    
    //set sound volume
    jumpSound.setVolume(0.1);
    collectSound.setVolume(0.1);
    fallSound.setVolume(0.03);
    loseSound.setVolume(0.1);
    winSound.setVolume(0.1);
    hitSound.setVolume(0.04);
    backgroundSound.setVolume(0.05);
    
    //load image for platform
    brick = loadImage('assets/brick.png');
    houseImg = loadImage('assets/house.png');
    
}

// Function to check if all the sound files are loaded
function soundLoaded()
{
    soundLoadCounter++;
    if(soundLoadCounter == 7)
    {
        soundReady = true;
        console.log("The sounds are successfully loaded.");
    }else{
        console.log("The sounda are not successfully loaded.");
    }
}

///////////////////////////////////////////////////
function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3;
    finalGameOverSoundPlayed = false;
    backgroundSoundPlayed = false;
	startGame();
    imageMode(CENTER);
}


function draw()
{
    
    //check if all the sounds ready to play
    if(!soundReady)
    {
        return;
    }
    
    //check if stage is 0, call game splash screen  
    if(stage == 0)
    {
        splash();
    }

    //check if stage is 1, call start game function
    if(stage == 1)
    {
        game();
        playBackGroundSound(); //play background music
    }
    
    //click the splash screen to enter the game
    if(mouseIsPressed)
    {
        stage=1;
    }
    
    //call gameReplay function
    gameReplay();
    
}

//////////////////GAME FUNCTION////////////////////
function game(){
	background(250, 235, 215);  // fill the sky

	noStroke();
	fill(60, 179, 113);
	rect(0, floorPos_y, width, height/4); // draw ground
    
    //implement scrolling
    push();
    translate(scrollPos, 0);

	// Draw game scene
    drawClouds();
    
    drawMountains();
    
    drawTrees();
    
    drawPlatforms();

    drawCollectables();
        
    drawCanyons();

    renderFlagpole();
    
    drawHouse();
    
    drawPlatforms();
    
    drawEnemies();

    pop();
    
    drawGameChar();
    
    drawLives();
   
    drawCountdownTimer();
    calculateTime();
    checkIfTimeOver();
    
    drawGameScore();
    
    drawGameOver();
    
    
    ////////////INTERACTION CODE////////////
    //Logic to make the flagpole up or down
    if(!flagpole.isReached)
    {
        checkFlagpole();
    }
    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2){
			gameChar_x -= 5;
		}
		else{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8){
			gameChar_x  += 5;
		}
		else{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y)
    {
        var isContact = false;
        for(i in platforms)
            {
                if(platforms[i].checkContact(gameChar_world_x,gameChar_y))
                    {
                        isContact = true;
                        break;
                    }
            }
        if(isContact == false)
            {
                gameChar_y += 2;
            isFalling = true;
            }
        
    }else{
        isFalling = false;
    }
     
    if(isPlummeting)
    {
        gameChar_y += 5;
        checkPlayerDie();
        return;
    }

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    
}

// ---------------------
// Key control functions
// ---------------------
function keyPressed()
{
    if(keyCode == 37 || key == 'A')
    {
        isLeft = true;
    }
    else if(keyCode == 39 || key == 'D')
    {
        isRight = true;
    }else if(keyCode == 32 || key == ' ')
    {
        //ensure the character only jump when it is touching the ground
        //gameChar_y >= floorPos_y
        if(!isFalling){
            gameChar_y -= 180;
            jumpSound.play();
        }
    }else{
        console.log("The key you pressed is invalid. Please go through the game instructions.");
    }
    
}

function keyReleased()
{
    if(keyCode == 37 || key == 'A')
    {
        isLeft = false;
    }
    else if(keyCode == 39 || key == 'D')
    {
        isRight = false;

    }
}

// ---------------------
// Check functions
// ---------------------
// Flagpole check functions
function checkFlagpole()
{
    //check if character is in range of the flagpole
    var d = abs(gameChar_world_x - flagpole.x_pos);
    if(d<15)
    {
        flagpole.isReached = true;
        winSound.play(); //play win sound
        timeOver = true;
    }
}

// Lives check functions
function checkPlayerDie()
{
    //check if player falls into canyon
    if(gameChar_y>height)
    {
        lives -= 1; //decrement live
        
        if(lives>0)
        {
            startGame(); //restart the game
        }
    }
}

//Function to check the game is over
function checkIsGameOver()
{
    var gameOver = false;
    
    if(lives<1 || flagpole.isReached)
    {
        gameOver = true;
        keyReleased(); //disable moving control
    }
    return gameOver;
}

// Function to play Background Sound
function playBackGroundSound()
{   
    if(!backgroundSoundPlayed)
    {
        backgroundSound.play(); //play background sound
        backgroundSoundPlayed = true;
    }
}

// Function to play Final Game Over Sound
function playFinalGameOverSound()
{   
    if(!finalGameOverSoundPlayed)
    {
        loseSound.play(); //play lose sound
        finalGameOverSoundPlayed = true;
    }
}

// Function to draw game over
function drawGameOver()
{
    if(checkIsGameOver())
    {
        //display game over statement
        renderGameOver();
        return;
    }  
}

// Function to replay the game
function gameReplay()
{
   if(checkIsGameOver() && keyCode == 32)
    {
        //reloads the game
        document.location.reload(true); 
        return;
    }
}

// ---------------------
// Countdown timer functions
// ---------------------
/////////////////////////////////////////
// Function to draw countdown timer
function drawCountdownTimer(){
    //check if game is over
    if(checkIsGameOver()){
        return;
    }

    //draw countdown timer
    fill(255);
    strokeWeight(4);
    stroke(0);
    textSize(25);
    text("Time Remaining : " + remainingTime,780,35);
}

// Function to calculate the time remaining
function calculateTime(){
    // get current time in milliseconds
    var now = new Date().getTime();
    
    // find the interval between now and the countdown time
    var interval = now - startTime;
    
    // time calculations for seconds
    remainingTime = timeLimit - Math.floor(interval%(1000*60)/1000);
}

// Function to check if time is up
function checkIfTimeOver(){
    
    //check if time is over
    if(!timeOver)
    //check if remaining time is less than 0
    if(remainingTime<0){
        timeOver = true;
        lives--;
        if(lives>0){
            startGame();
        }
    }
}

///////////////////////////////////////////////////
// Function to start game
function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    gameChar_width = 25;
    game_score = 0;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    
    //Boolean variables to control the timer
    timeOver = false;   

	//Create empty array of objects
    //call the their init functions
    trees = [];
    initTree();
    
    clouds = [];
    initCloud();
   
    canyons = [];
    initCanyon();

    collectables = [];
    initCollectable();
    
    platforms = [];
    initPlatform();

    //Time to countdown from (in milliseconds)
    startTime = new Date().getTime();
    
    //Init flagpole
    flagpole = {x_pos:2300, isReached:false};
    
    //Init house
    house = {x:2400, y:floorPos_y-60, w:160, height:140};
    
    //Create enemy array
    enemies = [];
    //Add in enemy object into array
    enemies.push(new Enemy(300,floorPos_y-30,100));
    enemies.push(new Enemy(900,floorPos_y-30,80));
    enemies.push(new Enemy(1500,floorPos_y-30,50));
    enemies.push(new Enemy(2000,floorPos_y-30,80));    
}

// Function to draw game splash
function splash()
{ 
    // Draw scene
    noStroke();
	background(250, 235, 215); //draw background
    fill(60, 179, 113);
	rect(0, floorPos_y, width, height/4); // draw ground
    drawClouds(); 
    drawMountains();
    drawTrees();
    
    //title
    strokeWeight(10);
    stroke(0);
    fill(255);
    textSize(60);
    text("Coursework 2 : Mario Game",130,130);
    
    //instructions
    strokeWeight(5);
    stroke(0);
    fill(255);
    textSize(30);
    text("HOW TO PLAY:",400,220);
    text("- Use Arrow Keys To Move Left And Right", 240, 270);
    text("- Press Spacebar To Jump", 340, 310);
    text("- Get Point By Collecting 🍎Red Apple", 280, 350);
    strokeWeight(8);
    textSize(40);
    text("CLICK THE SCREEN TO START", 220, 450);  
}
