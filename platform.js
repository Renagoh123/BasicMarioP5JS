/*********Platform Render Functions*********/

//Add Platform function
function Platform(x,y,length)
{
    this.x= x;
    this.y= y;
    this.length=length;

    this.draw= function()
    {
        fill(255,255,0); image(brick,this.x,this.y,this.length,40);
    };

    this.checkContact= function(gc_x, gc_y)
    {
        //check for x axis
        if(gc_x > this.x && gc_x < this.x + this.length)
        {
            //check for y axis - gameChar is on platform
            var d = this.y - gc_y;
            if(d>=0 && d<20)
                {
                    return true;
                }
        }
        return false;
    }

}

// Function to create platform
function createPlatform(x,y,length)
{
    var p = new Platform(x,y,length);
    return p;
}

// Function to add in platform object into array
function initPlatform()
{
    for(var i = 0; i<5; i++)
    {
        var platformGap =(width + 500) / 4;
        var t = createPlatform(100 + platformGap * i,
                            floorPos_y - random(70,150),
                            random(50,150));
        platforms.push(t);
    }
}


