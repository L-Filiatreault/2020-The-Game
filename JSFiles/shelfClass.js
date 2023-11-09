class Shelf{
    constructor(x, y){
        
        this.x = x;
        this.y = y;        
        this.width = 30;
        this.height = 400;
        this.rotation = 0;
    }

    draw()
    {
        context.save();  
        context.fillStyle = "orange";
        context.fillRect(this.x, this.y, this.width, this.height); //at 0,0 of transformed canvas      
        context.restore();
    }

    update()
    {
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