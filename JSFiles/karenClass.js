class Karen{
    constructor(x, y, speed, colour){
        
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.speed = speed;
        this.colour = colour;
        this.xVelocity = this.speed;
        this.yVelocity = this.speed;
        this.width = 30;
        this.height = 30;
        this.rotation = 0;
        this.rangeY = 400;
        this.rangeX = 50;
        
        this.changeDirectionY = 2;
    }

    draw()
    {
        context.save();  
        context.translate(this.x, this.y);         
        context.fillStyle = this.colour;
        context.fillRect(0, 0, this.width, this.height);
        context.fillStyle = "black";
        context.fillRect(7, 7, 4, 7); 
        context.fillStyle = "black";
        context.fillRect(18, 7, 4, 7);         
        context.fillStyle = "black";
        context.fillRect(5, 20, 19, 2); 
        context.restore();
    }

    update(){       
        
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        
        if(this.y>this.rangeY || this.y<  this.initialY)
        {
            this.yVelocity = -this.yVelocity;
            
        }
        if(this.x>this.rangeX  || this.x< this.initialX)
        {
            this.xVelocity = -this.xVelocity;
            
        }
        this.draw();
    }

    addedWidth()
    {
        return this.x + this.width;
    }

    addedHeight()
    {
        return this.y + this.height;
    }
    
}