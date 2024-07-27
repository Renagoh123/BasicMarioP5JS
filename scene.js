/**********Background render functions**********/

// Function to draw cloud objects.
function drawClouds()
{
    for(var i=0; i<clouds.length;i++)
    {
        clouds[i].drawCloud();
        clouds[i].animateCloud();
        clouds[i].returnCloud();
    }
}

/////////////////////////////////////////
// Function to draw tree objects.
function drawTrees()
{
    for(var i=0; i<trees.length;i++)
    {
        trees[i].drawTree();
    }
    
}

/////////////////////////////////////////
//Create argument to drawMountain
function drawMountain(x,y,w,h)
{
    fill(105,105,105);
    triangle(x - w, y,
             x, y-h,
             x + w, y);
}

// Function to draw mountains.
function drawMountains()
{   
    for(var i=0; i<15; i++)
    {
        drawMountain(30 + i*220,
                     floorPos_y,
                     120,
                     300);
    }
    
}

/////////////////////////////////////////
// function to draw canyon objects.
function drawCanyons()
{
    for(var i=0; i<canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
}

/////////////////////////////////////////
// Function to draw canyon objects.
function drawCollectables()
{
    for(var i=0; i<collectables.length; i++)
    {
        if(collectables[i].isFound == false)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }
        
}

/////////////////////////////////////////
// Function to draw flagpole object.
function renderFlagpole()
{
    //draw flagpole
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-250);
    noStroke();
    fill(65,105,225);
    
    //check the state of the flag to draw it up or down
    if(flagpole.isReached){
        //draw flag up
        rect(flagpole.x_pos,floorPos_y-250,80,60);
    }else{
        //draw flag on the ground
         rect(flagpole.x_pos,floorPos_y-60,80,60);
    }
   
}

/////////////////////////////////////////
// Function to draw platform object.
function drawPlatforms()
{
    for(i in platforms)
    {
        platforms[i].draw();
    }
}

/////////////////////////////////////////
// Function to draw enemies object.
function drawEnemies()
{
    //draw enemies
    for(var i=0; i<enemies.length; i++)
    {
        enemies[i].draw();
    }
    checkIfContactEnemy();
}

/////////////////////////////////////////
// Function to draw game score
function drawGameScore()
{
    fill(255);
    strokeWeight(4);
    stroke(0);
    textSize(25);
    text("score: " + game_score, 30, 30);
}

/////////////////////////////////////////
// Function to draw life tokens
function drawLives()
{
    for(var i=0; i<lives; i++)
    {
        noStroke();
        fill(65,105,225);
        ellipse(28* i + 40, 50, 20, 20);
    }
}

/////////////////////////////////////////
// Function to render game over statement
function renderGameOver()
{
    fill(255);
    strokeWeight(8);
    stroke(0);
    textSize(80);
    
    //when the game is over,check the num of lives to render the statement
    if(lives>0){
        text("Level complete", 250, height/2);
    }else{
        text("Game Over", 300, height/2);
        playFinalGameOverSound();//play game over sound
    }
    
    textSize(50);
    text("Press space to replay the game.",160, height-200);
}

/////////////////////////////////////////
// Function to draw house object.
function drawHouse()
{
    fill(255,0,0);
    image(houseImg,house.x,house.y,house.w,house.height);
    
}
