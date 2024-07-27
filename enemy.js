//Add Enemy function
function Enemy(x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
       this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    };

    this.draw = function()
    {
        this.update();
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = 1;
        drawingContext.shadowBlur = 40;
        drawingContext.shadowColor = 'black';
        
        stroke(0);
        strokeWeight(2);
       
        fill(186,  85, 211);
        ellipse(this.currentX, this.y+20,30);
        
        fill(160,82,45)
        rect(this.currentX-2,this.y-2,5,20);   
    };
    
    this.checkContact = function(gc_x,gc_y)
    {
        //distance between gameChar and enemy
        var d = dist(gc_x,gc_y,this.currentX,this.y);
        
        if(d < 35)
            {
                hitSound.play(); //play hit sound
                return true; 
            }
        return false;
    };
    
}

// Function to create enemy
function createEnemy(x,y,range)
{
    var e = newEnemy(x,y,range);
    return e;
}

//Function to check if gameChar contact with enemy
function checkIfContactEnemy()
{
    
    //check if game is over
    if(checkIsGameOver())
    {
        return;
    }
    
    //check if in contact with enemies
    for(var i=0; i<enemies.length; i++){
          var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
            
            if(isContact)
                {
                    lives -= 1; //decrement live
                    
                    //if still have life
                    if(lives > 0)
                        {               
                            //call the startGame function
                            startGame();
                            break;
                        }
                }
    }
}


