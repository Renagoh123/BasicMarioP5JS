/*********Tree Render Functions*********/

//Add Tree function
function Tree(x,y,w,trunkWidth,trunkHeight)
{
  this.t_tree= 
  {
      x:x,
      y:y,
      w:w,
      trunkWidth: trunkWidth,
      trunkHeight: trunkHeight     
  };

  this.drawTree= function()
  {

    //trunk
    stroke(0);
    strokeWeight(0.5);
    fill(160, 82 , 45);
    rect(this.t_tree.x-10, 
         this.t_tree.y-50,
         this.t_tree.trunkWidth,
         this.t_tree.trunkHeight); 
    //leaf
    noStroke();
    fill(250,128,114);
    ellipse(this.t_tree.x-30,
            this.t_tree.y-70,
            this.t_tree.w,this.t_tree.w);
    ellipse(this.t_tree.x,
            this.t_tree.y-120,
            70,75);
    ellipse(this.t_tree.x+30,
            this.t_tree.y-70,
            this.t_tree.w,this.t_tree.w);
    };
    
}

// Function to add in tree object into array
function initTree()
{
    for(var i = 0; i<10; i++)
    {
        var treesGap =(width + 1000) / 6;
        var t = createTree(-200 + treesGap * i,
                            floorPos_y,
                            80,
                            20,
                            50);
        trees.push(t);
    }
}

// Function to create tree
function createTree(x,y,w,trunkWidth,trunkHeight)
{
    var t = new Tree(x,y,w,trunkWidth,trunkHeight);
    return t;
}
