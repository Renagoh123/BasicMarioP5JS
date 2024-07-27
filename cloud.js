/********** Cloud Render Functions**********/

//Add cloud function
function Cloud(x,y,r,dx)
{
    this.t_cloud =
    {
        x:x,
        y:y,
        r:r,
        dx:dx
    };

    this.drawCloud = function()
    {
        fill(255);
        ellipse(this.t_cloud.x,
                this.t_cloud.y,
                this.t_cloud.r+30,
                this.t_cloud.r+10);

        ellipse(this.t_cloud.x+50,
                this.t_cloud.y+5,
                this.t_cloud.r+30,
                this.t_cloud.r+10);

        ellipse(this.t_cloud.x+50,
                this.t_cloud.y+30,
                this.t_cloud.r+70,
                this.t_cloud.r);

        ellipse(this.t_cloud.x-20,
                this.t_cloud.y+20,
                this.t_cloud.r+70,
                this.t_cloud.r); 
    };

    this.animateCloud = function()
    {
        this.t_cloud.x += this.t_cloud.dx;
    };

    this.returnCloud = function()
    {   
        if(this.t_cloud.x>3200)
        {
            this.t_cloud.x=-100;
        }
    };   
            
}

// Function to add in cloud object into array
function initCloud()
{
    for (var i = 0; i < 8; i++)
	{
        var cloudGap= 2000/5;
        var c = createCloud(random(0,300) + i * cloudGap,
                                random(10,180),
                                40,
                                random(0.5,1.5));
        clouds.push(c);
    }
}

// Function to create cloud
function createCloud(x,y,r,dx)
{
    var c = new Cloud(x,y,r,dx);
    return c;
}