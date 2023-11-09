class WineBox{
    constructor(){

        this.x = GenerateRandomNumber();
        this.y = GenerateRandomNumber();
        this.width = 15;
        this.height = 20;      
        this.min = 25;
        this.max = canvas.width-10;
    }

    update(){
       
       
        this.checkCollision(shelfArray);     
        this.draw();
    }

    draw(){
        context.save();  
        context.fillStyle = "purple";
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

    GenerateRandomNumber()
    {
        let number;
    
        number = Math.floor(Math.random() * (this.max - this.min) + this.min);

        if(number<=10 && number>=canvas.width)
        {
            number = Math.floor(Math.random() * (this.max - this.min) + this.min);
        }
        return number;

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