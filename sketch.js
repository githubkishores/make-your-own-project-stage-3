var PLAY=1;
var END=0;
var gameState=PLAY;
var rocket,rocketImg;
var missile,missileImg;
var obstaclesGroup,obstacle1,obstacle2;

function preload(){
    rocketImg=loadImage("assets/rocket.png");
    missileImg=loadImage("assets/missile.png");
    obstacle1 = loadImage("assets/obstacle1.png");
    obstacle2 = loadImage("assets/obstacle2.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);

    var message = "This is a message";
    console.log(message);

    rocket=createSprite(650,500,50,50);
    rocket.addImage(rocketImg);
    rocket.scale=0.3;

    obstaclesGroup=createGroup();
    missileGroup =createGroup();
    score=0;
}

function draw(){
    background("#03045e");
    text("score:"+ score,1200,50);

    if(gameState === PLAY){
        obstacle2.visible=false;
        if(keyDown("right")){
            rocket.x=rocket.x+8;
        }
        if(keyDown("left")){
            rocket.x=rocket.x-8;
        }
        if(obstaclesGroup.isTouching(rocket)){
            gameState = END;
        }  
        
        spawnObstacles();
        
        if(keyDown("enter")) {
            missile=createSprite(rocket.x,300,20,20);
            missile.addImage(missileImg);
            missile.scale=0.2;
            missile.velocityY=-12;
            missileGroup.add(missile);
        } 
        if(obstaclesGroup.isTouching(missileGroup)){
            obstaclesGroup.destroyEach();
        }
    }
    drawSprites()
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
        var obstacle = createSprite((Math.round(random(400,800))),100,20,20);

        obstacle.velocityY = +(6+score/900);
        var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
              break;
       case 2: obstacle.addImage(obstacle2);
              break;
       default: break;
     }
     obstacle.scale = 0.3;
     obstacle.lifetime = 500;
     obstaclesGroup.add(obstacle);
    }    
}