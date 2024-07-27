/*********Collectable render and check functions*********/

// Function to draw collectable.
function drawCollectable(t_collectable)
{
    stroke(0);
    strokeWeight(0.5);
    fill(255 ,0 ,0);
    ellipse(t_collectable.x,t_collectable.y-10,t_collectable.size);

    noStroke();
    fill(160,82,45)
    rect(t_collectable.x-2,t_collectable.y-30,t_collectable.size-20,t_collectable.size-5);
}

// Function to add in collectable object into array
function initCollectable()
{
    var total_collectable = 5;
    while(collectables.length < total_collectable){
        var collectable = {x : random(300,2200),
                           y : floorPos_y,
                           size: 25, 
                           isFound: false};
        if(!checkCollectableOnCanyon(collectable)){
            collectables.push(collectable);
        }
    }
}

// Function to check if collectable is on canyon
function checkCollectableOnCanyon(t_collectable)
{
    var onCanyon = false;
    
    for(i in canyons)
    {
        //check if collectable is from the left of canyon
        var x1_limit = canyons[i].x - t_collectable.size;
        //check if collectable is from the right of canyon
        var x2_limit = canyons[i].x + canyons[i].w;
        if(t_collectable.x > x1_limit && t_collectable.x < x2_limit)
        {
            onCanyon = true;
            break;
        }
    }
    return onCanyon;
}

// Function to check if character collect collectable
function checkCollectable(t_collectable)
{
   //distance between gameChar and collectable
    var d = dist(gameChar_world_x, gameChar_y, t_collectable.x, t_collectable.y);
    
   if(d<20)
    {
        t_collectable.isFound = true;
        game_score += 1;  //increment game score
        collectSound.play(); //play collect sound
    }
}