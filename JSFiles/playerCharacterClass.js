class Hero{
    constructor(x, y){
        
        this.x = x;
        this.y = y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.width = 20;
        this.height = 20;
        this.rotation = 0;
        this.lives = 3;
        this.tpCount = 0;
        this.speedMultiplier = 2;
        this.friction = 0.1;
        this.myCount = 0;
        this.mentalStress = 0;
        this.wineScore = 0;
        this.pickUpWineSound = new Audio("Music/winePickUp.wav");//Sound effect from Mario 64, link: https://themushroomkingdom.net/sounds/wav/sm64/sm64_spinning_heart.wav
        this.pickUpTPSound = new Audio("Music/pickUpTP.wav"); //Sound effect from Legend of Zelda, link: http://www.noproblo.dayjo.org/ZeldaSounds/LTTP/LTTP_Item.wav
        this.hurtSound = new Audio("Music/hurtAudio.wav"); //Sound effect from Legend of Zelda, link: http://www.noproblo.dayjo.org/ZeldaSounds/LTTP/LTTP_Link_Hurt.wav
        this.bumpSound = new Audio("Music/sm64Stomp.wav"); //Sound effect from Mario 64, link: https://themushroomkingdom.net/sounds/wav/sm64/sm64_stomp.wav
        

    }

    respawn(){
        this.x = 450;
        this.y = 450;
        this.xSpeed = 0;
        this.ySpeed = 0; 
        this.speedMultiplier = 2;
        this.ResetStress();
    }

    ResetStress(){
        this.speedMultiplier = 2;
        this.mentalStress = 0;
    }

    draw()
    {
        context.save();  
        context.translate(this.x, this.y); //translate the canvas to the hero position      
        context.fillStyle = "violet";
        context.fillRect(0, 0, this.width, this.height); //at 0,0 of transformed canvas
        context.fillStyle = "black";
        context.fillRect(3, 4, 4, 3); 
        context.fillStyle = "black";
        context.fillRect(14, 4, 4, 3); 
        context.fillStyle = "white";
        context.fillRect(3, 11, 14, 7); 
        context.restore();
    }

    update(){       
            
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        this.stressSlowDown();      
        this.checkCollisionCanvas();
        this.ShelfCollision(shelfArray);
        this.EnemyCollision(karenArray);        
        this.WineCollision(boxOfWine);
        this.draw();
        
    }

    Move(moveX, moveY)
    {
        this.xSpeed = moveX * this.speedMultiplier;
        this.ySpeed = moveY * this.speedMultiplier;
    }


    addedWidth()
    {
        return this.x + this.width;
    }

    addedHeight()
    {
        return this.y + this.height;
    }

    stressSlowDown(){
        
        this.myCount++;       
        if(this.myCount === 100)
        {
            this.speedMultiplier = this.speedMultiplier - (this.speedMultiplier*this.friction);
            this.myCount = 0;   
            this.mentalStress += 5;
            
        }     
        
    }

    checkCollisionCanvas()
    {        
        if(this.x >= canvas.width - this.width ){
            this.x = canvas.width - this.width ;        //The player character is reset to a location prior to collision
            this.xSpeed *= -1;                             //The player character movements cease as they hit collision
            this.bumpSound.play();
        }
        if(this.x <= 0){
            this.x = 0;
            this.xSpeed *= -1;
            this.bumpSound.play();
                  
        }
        if(this.y >= canvas.height - this.height ){
            this.y = canvas.height - this.height;    //The player character is reset to a location prior to collision
            this.ySpeed *= -1;  
            this.bumpSound.play();
        }
        if(this.y <= 0){
            this.y = 0;
            this.ySpeed *= -1;  
            this.bumpSound.play();
        }       
    }
    
    WineCollision(boxOfWine)
    {
        if((this.addedWidth() >  boxOfWine.x) && (this.x <  boxOfWine.addedWidth()) && (this.addedHeight() > boxOfWine.y) && (this.y <  boxOfWine.addedHeight()))
        {
            boxOfWine.x = GenerateRandomNumber();
            boxOfWine.y = GenerateRandomNumber();
            this.pickUpWineSound.play();
            this.ResetStress();
        }
    }

	ShelfCollision(shelfArray){
		var collisionDetected = this.CollisionDetection(this, shelfArray);

		if(collisionDetected){
			this.xSpeed *= -1;   
            this.ySpeed *= -1;  
            this.bumpSound.play();
		}
	}

    EnemyCollision(karenArray)
    {
        var collisionDetected = this.CollisionDetection(this, karenArray);
        
        if(collisionDetected){
            this.hurtSound.play();
            this.lives -=1; 
            this.respawn();
		}  
    }

    checkCollisionWithTP(TPArray)
    {
        var tpCollected = false;
        var collisionSite = this.TPCollisionDetection(this, TPArray);
        
        
        if(collisionSite > -1)
        {           
            this.pickUpTPSound.play();
            this.tpCount++;                    
            TPArray.splice(collisionSite, 1);  
            tpCollected = true;       
        }

        return tpCollected;
        
    }

    CollisionDetection(objectA, objectB)
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

    TPCollisionDetection(objectA, objectB)
    {
        var collisionSite;
        var collision = false;
        for(var i=0; i<objectB.length; i++)
        {
            if((objectA.addedWidth() > objectB[i].x) && (objectA.x < objectB[i].addedWidth()) && (objectA.addedHeight() > objectB[i].y) && (objectA.y < objectB[i].addedHeight()))
            {
                collision = true;
                
            }

            if(collision === true)
            {
                collisionSite = i;
                break;
            }

        }
        return collisionSite;
    }

}