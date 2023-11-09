//2020: The Game
//By Lauren Filiatreault, Student ID: 0474461
//Final Project for Web Programming I
//Taught by Helen Katalifos

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 500; 
const startX = 430; //The x-axis location where the player character spawns
const startY = 470; //The y-axis location where the player character spawns
const speedIncrease = 0.1;
var shelfArray;
var karenArray;
var TPArray = [];
const tpLimit = 10;
var boxOfWine; //The variable holding the box of wine
var moveX; //The player character's movement along the x-axis
var moveY; //The player character's movement along the y-axis
const STARTBTN = document.getElementById("startButton");

//Music used in the game
var bgMusic = new Audio("Music/HillbillySwing.mp3"); //This song is by Kevin Macleod, link: https://incompetech.com/music/royalty-free/music.html
var victorySong = new Audio("Music/victory.mp4"); //This song is from Legend of Zelda, link: http://www.gamemusicthemes.com/sheetmusic/supernintendo/thelegendofzeldaalinktothepast/victory/index.html
var gameOverSong = new Audio("Music/ManDown.mp3"); //This song is by Kevin Macleod, link: https://incompetech.com/music/royalty-free/music.html

//The game's splash screen function
GameStartSplashPage();

function GameStartSplashPage(){

    var splashImg = document.getElementById("splash"); //Image was from USA Today, link: https://www.usatoday.com/story/money/2020/04/08/coronavirus-shortage-where-has-all-the-toilet-paper-gone/2964143001/

    function  animateSplashScreen(){    

        requestAnimationFrame(animateSplashScreen);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(splashImg, 65, 10); 
                   
        context.font = "15px Orbitron";
        context.textAlign = "left";
        context.fillText("The year is 2020, the Covid-19 pandemic causes society to ", 4,270);     
        context.fillText("fall apart, making thousands of people panic and buy", 4, 290);  
        context.fillText("toilet paper en masse. ", 4,310); 
        context.fillText("You're sent to Costco to retrieve 10 packs of toilet paper ", 4,330);  
        context.fillText("while dodging maskless Karens and trying to remain calm. ", 4,350); 
        
        context.fillText("To begin playing, press the 'START' button.", 4,390);
        context.fillText("To restart your game, press the 'RESET' button.", 4,410);
        context.fillText("To understand how to play the game, click on the ", 4,430);
        context.fillText("'HOW TO PLAY' button.", 4, 450);             
    

    }

    canvas.focus();
    animateSplashScreen();
}

function StartAnimate(){

    bgMusic.volume = 0.3;
    bgMusic.play();
    
    //The Stat button is disabled so no one can press on it during the game, on the Reset button can be used
    STARTBTN.disabled = true;
    
    //The different shelves which are obstacles
    shelfArray = [new Shelf(111, 40), new Shelf(222, 40), new Shelf(333, 40)];

    //The enemy character Karen which causes harm to the player character
    karenArray = [new Karen(10, 0, 1, "red"), new Karen(165, 40, 1.5, "yellow"), new Karen(285, 50, 2, "pink"), new Karen(420, 30, 1.5, "blue")];
    
    //Spawning the new box of wine after each time the player character consumes it
    boxOfWine = new WineBox();
    
    //The initial speed of the player character is set to 0 so it doesn't float away
    moveX = 0;
    moveY = 0;

    //Creating the new instance of the player character
    hero = new Hero(startX, startY);

    //Function to create the toilet paper and put it into an array
    CreateTP();
    canvas.tabIndex=1;
    canvas.focus();
    animate();
}


//Main animate function to move the objects on the screen
function animate(){

    //Variable to make the game continue
    var gameover = false;
    
    //The condition to make the game continue or not
    if(!gameover)
    {
        
        requestAnimationFrame(animate); //Recursively calling the function to animate
        context.clearRect(0, 0, canvas.width, canvas.height);   //Clears rectangle for each new drawing     
        UpdateToiletPaper(); //This makes the drawings of toilet paper appear on screen
        UpdateShelves();  //This makes the drawings of shelves appear on screen
        ReleaseTheKaren();  //This makes the drawings of Karens appear on screen
        boxOfWine.update(); //This spawns and draws the box of wine in random locations on the screen
        SpeedUpKaren(); //Each toilet paper picked up by the player character will cause the Karens' speed to increase
        hero.update(); // Gives collision, drawing updates of the player character
        ScoreTracker(); //Updates the values of the toilet paper, lives and stress of the player character
        gameover = GameOver();
     
    }      
    
}

function ScoreTracker(){

    var stressLevel = document.getElementById("mentalHealthBar");
    var toiletPaperScore = document.getElementById("toiletPaperScore");
    var livesCount = document.getElementById("lives");

    stressLevel.innerHTML = "Stress level: " + hero.mentalStress + "%";
    toiletPaperScore.innerHTML = "Toilet paper collected: " + hero.tpCount+"/10";
    livesCount.innerHTML ="Lives remaining:  " + hero.lives;
}

function SpeedUpKaren()
{
    if(hero.checkCollisionWithTP(TPArray))
        {
            for(var i=0; i<karenArray.length; i++)
            {
                karenArray[i].xVelocity += (karenArray[i].xVelocity *speedIncrease );
                karenArray[i].yVelocity += (karenArray[i].yVelocity *speedIncrease );
            }
            
        }
}

function GameOver(){  

    let verifyEnding = false;

    if(hero.tpCount === tpLimit)
    {
        verifyEnding = true;
        hero.mentalStress = 0;
        WinSplashScreen();
    }
    else if(hero.lives <= 0)
    {            
        verifyEnding = true;
        hero.mentalStress = 0;
        hero.lives = 0; 
        GameOverScreen();
    }
    else if(hero.mentalStress >= 101)
    {
        verifyEnding = true;
        hero.mentalStress = 0;
        hero.lives = 0;  
        GameOverScreen();
    }

    return verifyEnding;

}

function WinSplashScreen(){
    
    function animateWin()
    {
        hero.bumpSound.pause();
        hero.hurtSound.pause();
        bgMusic.pause();
        victorySong.play();

        STARTBTN.disabled = true;
        var win = document.getElementById("winningTP"); //I made this image from a search of toilet paper from DuckDuckGO

        requestAnimationFrame(animateWin);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "30px Comic Sans MS";
        context.fillStyle = "red";
        context.textAlign = "center";        
        context.drawImage(win, 50, 100); 
        context.fillText("You Win!", canvas.width/2, 30);   
        context.fillText("You're fully stocked for a week!", canvas.width/2, 60);  
        context.fillText("Do you want to play again?", canvas.width/2, 440); 
        context.fillText("Click on the reset button!", canvas.width/2, 490);   
    }
    canvas.focus();
    animateWin();
}

function GameOverScreen(){

    hero.bumpSound.pause();
    hero.hurtSound.pause();
    bgMusic.pause();    
    gameOverSong.play();  

    function animateGameOver(){

        STARTBTN.disabled = true;
        
        var dump = document.getElementById("dumpfire"); //This is images was made by Felix Nguyen, link:https://pixels.com/featured/dumpster-fire-2020-trash-garbage-fire-felix.html
        requestAnimationFrame(animateGameOver);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";        
        context.drawImage(dump, 20, 40);     
        context.fillText("Game Over!", canvas.width/2, 100);     
        context.fillText("Do you want to play again?", canvas.width/2, 150); 
        context.fillText("Click on the reset button!", canvas.width/2, 200); 
        }

        canvas.focus();      
        animateGameOver();
}

//The controls to move the player character 
canvas.addEventListener('keydown', e => {
    if(e.key =='ArrowRight') moveX = 1;
    if(e.key =='ArrowLeft') moveX = -1;
    if(e.key =='ArrowUp') moveY = -1;
    if(e.key =='ArrowDown') moveY = 1;

    hero.Move(moveX, moveY);
  
})

//The event for the player character to stop moving 
canvas.addEventListener('keyup', e => {
    if(e.key =='ArrowRight') moveX = 0;
    if(e.key =='ArrowLeft') moveX = 0;
    if(e.key =='ArrowUp') moveY = 0;
    if(e.key =='ArrowDown') moveY = 0;

    hero.Move(moveX, moveY);
  
    
})

//Whenever the user wants to play the game again, the website is refreshed so all properties are reset.
function RestartGame(){
    location.reload();
   
}

//This creates new instances of the toilet paper and puts them into an array
function CreateTP(){

    for(let i=0; i<tpLimit; i++)
    {
        let tp = new ToiletPaper(GenerateRandomNumber(), GenerateRandomNumber()); 
        TPArray.push(tp);
      
    } 
}

function UpdateToiletPaper(){

    TPArray.forEach(function(TPArray){
        TPArray.update();
    }); 
}


function UpdateShelves(){ 
   
    shelfArray.forEach(function(shelfArray){
        shelfArray.update();
    });          
}


function ReleaseTheKaren(){ 
   
    karenArray.forEach(function(karenArray){
        karenArray.update();
    })
}

//Generates random numbers for the locations of the toilet paper and boxes of wine
function GenerateRandomNumber()
{
    let number;
    let min = 25;
    let max = canvas.width-10;
   
    number = Math.floor(Math.random() * (max - min) + min);

    if(number<=10 && number>=canvas.width)
    {
        number = Math.floor(Math.random() * (max - min) + min);
    }
    return number;

}





