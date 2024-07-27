/**********Game character render functions**********/

// Function to draw the game character.
function drawGameChar()
{
    if(isLeft && isFalling)
	{
		drawJumpingLeft();
	}
	else if(isRight && isFalling)
	{
       drawJumpingRight();
	}
	else if(isLeft)
	{
		drawWalkingLeft();
	}
	else if(isRight)
	{
		drawWalkingRight();
	}
	else if(isFalling || isPlummeting)
	{
		drawJumpingFacingForward();
	}
	else
	{
		drawStandingFrontFacingForward();
	}
}

// Function to draw Jumping Left
function drawJumpingLeft()
{
    //Head
    fill(56,97,140);
    ellipse(gameChar_x, gameChar_y-60, 25,25);

    //Body
    fill(255,50,0);
    rect(gameChar_x-12,gameChar_y-48,25,35);

    //Shoes
    fill('#ffe74c');
    ellipse(gameChar_x-18,gameChar_y-5,15,15);
    ellipse(gameChar_x+19,gameChar_y-5,15,15);

    //Arms and Legs
    strokeWeight(2);
    stroke(0);
    line(gameChar_x-20,gameChar_y-38,gameChar_x-13,gameChar_y-38);//left hand
    line(gameChar_x-20,gameChar_y-38,gameChar_x-20,gameChar_y-50);
    line(gameChar_x+20,gameChar_y-35,gameChar_x+13,gameChar_y-35);//right hand
    line(gameChar_x+20,gameChar_y-35,gameChar_x+20,gameChar_y-22);
    line(gameChar_x-20,gameChar_y-20,gameChar_x-13,gameChar_y-20);//left leg
    line(gameChar_x-20,gameChar_y-20,gameChar_x-20,gameChar_y-10);
    line(gameChar_x+6,gameChar_y-13,gameChar_x+6,gameChar_y-5);//right leg
    line(gameChar_x+6,gameChar_y-5,gameChar_x+14,gameChar_y-5);
    
}

// Function to draw Jumping Right
function drawJumpingRight()
{
    //Head
    fill(56,97,140);
    ellipse(gameChar_x, gameChar_y-60, 25,25);

    //Body
    fill(255,50,0);
    rect(gameChar_x-12,gameChar_y-48,25,35);

    //Shoes
    fill('#ffe74c');
    ellipse(gameChar_x-18,gameChar_y-5,15,15);
    ellipse(gameChar_x+19,gameChar_y-5,15,15);

    //Arms and Legs
    strokeWeight(2);
    stroke(0);
    line(gameChar_x-20,gameChar_y-37,gameChar_x-13,gameChar_y-37);//left hand
    line(gameChar_x-20,gameChar_y-37,gameChar_x-20,gameChar_y-25);
    line(gameChar_x+20,gameChar_y-38,gameChar_x+13,gameChar_y-38);//right hand
    line(gameChar_x+20,gameChar_y-38,gameChar_x+20,gameChar_y-51);
    line(gameChar_x-13,gameChar_y-5,gameChar_x-5,gameChar_y-5);//left leg
    line(gameChar_x-5,gameChar_y-5,gameChar_x-5,gameChar_y-13);
    line(gameChar_x+13,gameChar_y-20,gameChar_x+20,gameChar_y-20);//right leg
    line(gameChar_x+20,gameChar_y-20,gameChar_x+20,gameChar_y-10);
    
}

// Function to draw Walking Left
function drawWalkingLeft()
{
    //Head
    fill(56,97,140);
    ellipse(gameChar_x, gameChar_y-60, 25,25);

    //Body
    fill(255,50,0);
    rect(gameChar_x-12,gameChar_y-48,25,35);

    //Shoes
    fill('#ffe74c');
    ellipse(gameChar_x-10,gameChar_y-8,15,15);
    ellipse(gameChar_x+10,gameChar_y-8,15,15);

    //Arms
    strokeWeight(2);
    stroke(0);
    line(gameChar_x-20,gameChar_y-38,gameChar_x-13,gameChar_y-38);//left hand
    line(gameChar_x-20,gameChar_y-38,gameChar_x-20,gameChar_y-50);
    line(gameChar_x+20,gameChar_y-35,gameChar_x+13,gameChar_y-35);//right hand
    line(gameChar_x+20,gameChar_y-35,gameChar_x+20,gameChar_y-22);
    
}

// Function to draw Walking Right
function drawWalkingRight()
{
    //Head
    fill(56,97,140);
    ellipse(gameChar_x, gameChar_y-60, 25,25);
    
    //Body
    fill(255,50,0);
    rect(gameChar_x-12,gameChar_y-48,25,35);

    //Shoes
    fill('#ffe74c');
    ellipse(gameChar_x-10,gameChar_y-8,15,15);
    ellipse(gameChar_x+10,gameChar_y-8,15,15);

    //Arms
    strokeWeight(2);
    stroke(0);
    line(gameChar_x-20,gameChar_y-37,gameChar_x-13,gameChar_y-37);//left hand
    line(gameChar_x-20,gameChar_y-37,gameChar_x-20,gameChar_y-25);
    line(gameChar_x+20,gameChar_y-38,gameChar_x+13,gameChar_y-38);//right hand
    line(gameChar_x+20,gameChar_y-38,gameChar_x+20,gameChar_y-51);
    
}

// Function to Jumping Facing Forward
function drawJumpingFacingForward()
{
    //Head
    fill(56,97,140);
    ellipse(gameChar_x, gameChar_y-60, 25,25);

    //Body
    fill(255,50,0);
    rect(gameChar_x-12,gameChar_y-48,25,35);

    //Shoes
    fill('#ffe74c');
    ellipse(gameChar_x-18,gameChar_y-5,15,15);
    ellipse(gameChar_x+19,gameChar_y-5,15,15);

    //Arms and Legs
    strokeWeight(2);
    stroke(0);
    line(gameChar_x-20,gameChar_y-30,gameChar_x-13,gameChar_y-40);//left hand
    line(gameChar_x+20,gameChar_y-30,gameChar_x+13,gameChar_y-40);//right hand
    line(gameChar_x-20,gameChar_y-20,gameChar_x-13,gameChar_y-20);//left leg
    line(gameChar_x-20,gameChar_y-20,gameChar_x-20,gameChar_y-10);
    line(gameChar_x+13,gameChar_y-20,gameChar_x+20,gameChar_y-20);//right leg
    line(gameChar_x+20,gameChar_y-20,gameChar_x+20,gameChar_y-10);
	
}

// Function to Standing Front Facing Forward
function drawStandingFrontFacingForward()
{
    //Head
    fill(56,97,140);
    ellipse(gameChar_x, gameChar_y-60, 25,25);

    //Body
    fill(255,50,0);
    rect(gameChar_x-12,gameChar_y-48,25,35);

    //Shoes
    fill('#ffe74c');
    ellipse(gameChar_x-10,gameChar_y-8,15,15);
    ellipse(gameChar_x+10,gameChar_y-8,15,15);

    //Arms
    strokeWeight(2);
    stroke(0);
    line(gameChar_x-20,gameChar_y-30,gameChar_x-13,gameChar_y-40);//left hand
    line(gameChar_x+20,gameChar_y-30,gameChar_x+13,gameChar_y-40);//right hand
    
}
