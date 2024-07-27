/*********Canyon render and check functions*********/

// Function to draw canyon.
function drawCanyon(t_canyon)
{
    fill(139,  69,  19);
    rect(t_canyon.x,t_canyon.y,t_canyon.w,t_canyon.h); 
}

// Function to add in canyon object into array
function initCanyon()
{
    for(var i=0; i<4; i++)
    {
        var canyonGap = 2000/4;
        var canyon = {x: 50 + canyonGap * i, 
                      y:floorPos_y,
                      w:random(80,150),
                      h:150};
        
        canyons.push(canyon);
    }
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon)
{
    if(checkIsGameOver())
    {
        return;
    }
    
    //check when gameChar is on the floor
    var cond1 = gameChar_y >= floorPos_y;
    //check if gameChar is from the left of canyon
    var cond2 = gameChar_world_x - (gameChar_width/2) > t_canyon.x; 
    //check if gameChar is from the right of canyon
    var cond3 = gameChar_world_x + (gameChar_width/2) < t_canyon.x + t_canyon.w;
    
    if(cond1 && cond2 && cond3)
    {
        isPlummeting = true;
        fallSound.play();
    }
    
}

