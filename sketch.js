var trex ,ta,ground,ga,invisibleGround,ca,oa1,oa2,oa3,oa4,oa5,oa6,score,gameState;
var CloudsGroup,ObstaclesGroup,ta2,gameOver,restart,goa,ra;

function preload(){
ta=loadAnimation("trex1.png","trex3.png","trex4.png");
  ga=loadImage("ground2.png");
  ca=loadImage("cloud.png");
  oa1=loadImage("obstacle1.png");
  oa2=loadImage("obstacle2.png");
  oa3=loadImage("obstacle3.png");
  oa4=loadImage("obstacle4.png");
  oa5=loadImage("obstacle5.png");
  oa6=loadImage("obstacle6.png");
  ta2=loadAnimation("trex_collided.png");
  goa=loadImage("gameOver.png");
  ra=loadImage("restart.png");
}


function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,50);
  trex.addAnimation("tra",ta);
  trex.addAnimation("ta2",ta2);
  trex.scale=0.5;
  
  ground=createSprite(300,190,600,10);
  ground.addImage(ga);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  gameState=1;
  
  score=0;
  
  invisibleGround=createSprite(300,195,600,10);
  invisibleGround.visible=false;
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
  
  gameOver = createSprite(300,100,20,20);
  restart = createSprite(300,140,20,20);
  gameOver.addImage(goa);
  gameOver.scale = 0.5;
  restart.addImage(ra);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background("white");
  
  if (gameState===1){
   score = Math.round(score+getFrameRate()/60);
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
    if(keyDown("space")&&trex.y>=166){
      trex.velocityY = -12 ;
    }
    ground.velocityX = -6;
    spawnClouds();
    spawnObstacles();
    trex.velocityY = trex.velocityY + 0.8;
    if (ObstaclesGroup.isTouching(trex)){
        gameState=0;
       
    }
  
  }
  else if(gameState===0){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    trex.changeAnimation("ta2",ta2);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  text("Score: "+ score, 450, 50);
   
  trex.collide(invisibleGround);
  
  

  //console.log(trex.y);
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(ca);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,173,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage(oa1); break;
      case 2: obstacle.addImage(oa2); break;
      case 3: obstacle.addImage(oa3); break;
      case 4: obstacle.addImage(oa4); break;
      case 5: obstacle.addImage(oa5); break;
      case 6: obstacle.addImage(oa6); break;
      default:break;
    }
         
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = 1;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("tra",ta);
  
 
  score = 0;
  
}


