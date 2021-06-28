var tower,towerImg;
var door,doorImg
var doorsGroup;
var railings,railingsImg;
var railingsGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleblockGroup;
var gamestate = "play";
var sound;

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  doorsGroup = new Group();
  
  sound = loadSound("spooky.wav");
  
  railingsImg = loadImage("climber.png");
  railingsGroup = new Group();
  
  ghostImg = loadImage("ghost-standing.png");
  
  invisibleblockGroup = new Group();
}

function setup(){
  createCanvas(600,600);
  
  sound.loop()
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
}

function draw(){
background(0);
  
  if(gamestate === "play"){
  
  if(invisibleblockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    
    gamestate = "end";
  }
  
  if(tower.y > 500){
    tower.y = 300;
  }

  if(railingsGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(keyDown("space")){
  ghost.velocityY = -5;  
  }
  if(keyDown(LEFT_ARROW)){
  ghost.x = ghost.x-3;  
  }
  if(keyDown(RIGHT_ARROW)){
  ghost.x = ghost.x+3;  
  }
  
  ghost.velocityY = ghost.velocityY+0.8; 
  
    spawnDoors();
  
  drawSprites();
  }else if(gamestate === "end"){
    stroke("blue");
    
    fill("red");
    
    textSize(30);
    text("game over",230,250)
  }
  
}     

function spawnDoors(){
  if(frameCount % 240 ===0){
  door = createSprite(200,-50);
  door.addImage("door",doorImg);
  door.velocityY = 1;
  door.x = Math.round(random(120,400));
  door.lifetime = 800;
  doorsGroup.add(door);
    
  railings = createSprite(200,10);
  railings.addImage("rail",railingsImg);
  railings.velocityY = 1;
  railings.x = door.x;
  railings.lifetime = 800;
  railingsGroup.add(railings);
    
  ghost.depth = door.depth;
    ghost.depth+=1;
 
  invisibleBlock = createSprite(200,15);
  invisibleBlock.width = railings.width;
  invisibleBlock.height = 2;
  invisibleBlock.velocityY = 1;
  invisibleBlock.x = door.x;
  invisibleBlock.debug = true;
  invisibleblockGroup.add(invisibleBlock)
  }
}
