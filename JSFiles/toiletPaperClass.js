class ToiletPaper{
    constructor(x, y){

        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.isActive = true;
        
    }

    update(){
        this.checkCollision(shelfArray);
        this.draw();
    }

    draw(){
        context.save();  
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.width, this.height); //at 0,0 of transformed canvas      
        context.restore();
    }

    addedWidth()
    {
        return this.x + this.width;
    }

    addedHeight()
    {
        return this.y + this.height;
    }

    checkCollision(shelfArray)
    {
        var collisionDetected = this.ShelfCollisionDetection(this, shelfArray);
        if(collisionDetected)
        {
            for(var i=0; i<shelfArray.length; i++)
            {
                this.x += shelfArray[i].width;
            }
        }
    }

    ShelfCollisionDetection(objectA, objectB)
    {
        var collision = false;
        for(var i=0; i<objectB.length; i++)
        {
            if((objectA.addedWidth() > objectB[i].x) && (objectA.x < objectB[i].addedWidth()) && (objectA.addedHeight() > objectB[i].y) && (objectA.y < objectB[i].addedHeight()))
            {
                collision = true;
                break;
            }
        }
        return collision;
    }
}
