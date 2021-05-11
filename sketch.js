var fruit, fruitGroup;
var pineapple, pomogrannete, strawberry, watermelon, apple, banana, blueberry, cherry;
var bomb, bombGroup;
var bomb1, bomb2, bomb3, bomb4, bomb5;
var frontbg, frontbgImage, s, sImage;
var sword, swordImage;
var playbg, playbgImage;
var gameOver, gameOverImage;
var restart, restartImage;
var START = 10;
var PLAY = 1;
var END = 2;
var gameState;
var score;
var life;
var fruitcut, oversound;

function preload(){
   pineapple = loadImage("Pineapple.png");
   pomogrannete = loadImage("Pomogranette.png");
   strawberry = loadImage("Strawberry.png");
   watermelon = loadImage("Watermelon.png");
   apple = loadImage("Apple.png");
   banana = loadImage("Banana.png");
   blueberry = loadImage("Blueberry.png");
   cherry = loadImage("Cherry.png");
   bomb1 = loadImage("bomb1.png");
   bomb2 = loadImage("bomb2.png");
   bomb3 = loadImage("bomb3.png");
   bomb4 = loadImage("bomb4.png");
   bomb5 = loadImage("bomb5.png");
   frontbgImage = loadImage("front.jpeg");
   sImage = loadImage("start.png");
   swordImage = loadImage("fruit ninja.png");
   playbgImage = loadImage("fruit play.jpeg");
   gameOverImage = loadImage("game_over-removebg-preview.png");
   restartImage = loadImage("restart-removebg-preview.png")
  fruitcut = loadSound("sound.mp3");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  frontbg = createSprite(296.25, 250);
  frontbg.addImage(frontbgImage);
  frontbg.scale = 2.5;
  s = createSprite(296.25, 350);
  s.addImage(sImage);
  s.scale = 0.25;

  playbg = createSprite(296.25, 250);
  playbg.addImage(playbgImage)
  playbg.scale = 0.75;
    sword = createSprite(296.25, 250);
  sword.addImage(swordImage);
  sword.scale = 0.25;
  gameOver = createSprite(296.25, 250)
  gameOver.addImage(gameOverImage);
  gameOver.scale = .50;
  restart = createSprite(296.25, 350)
  restart.addImage(restartImage);
  restart.scale = .50;
  gamestate = START;
  score = 0;
  life = 3;

  fruitGroup = new Group();
  bombGroup = new Group();
sword.debug = false;
  sword.setCollider("circle", 0, 0, 200)
}

function draw(){
  background("blue");
  console.log(gamestate)
  if(gamestate === START){
    frontbg.visible = true;
    s.visible = true;
    
    playbg.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    if(mousePressedOver(s)){
      gamestate = PLAY;
    }
    drawSprites();
  }
  else if (gamestate === PLAY){
    
    s.visible = false;
    sword.visible = true;
    playbg.visible = true;
    gameOver.visible = false;
    restart.visible = false;
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    fruits();
    bombs();
drawSprites();
      textSize(20);
  fill("red");
      text("Score: " + score, 500.5, 50)
    text("Life: " + life, 410.5, 50);
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score += 2;
      fruitcut.play();
    }
    if(bombGroup.isTouching(sword)){
      bombGroup.destroyEach();
      life -= 1;
      fruitcut.play();
    }
    if(life === 0){
      gamestate = END;
    }
  }
  else if(gamestate === END){
    frontbg.visible = false;
    s.visible = false;
    sword.visible = false;
    sword.x = 296.25;
    sword.y = 250;
    playbg.visible = true;
    gameOver.visible = true;
    restart.visible = true;
    fruitGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(-1);
    bombGroup.setLifetimeEach(-1);
    drawSprites();
      textSize(20);
  fill("yellow");
      text("Score: " + score, 500.5, 50)
    text("Life: " + life, 410.5, 50)
  }


}
function fruits(){
  if(frameCount % 80 === 0){    
    fruit = createSprite(0, 250);
    fruit.scale = 0.15;
    r = Math.round(random(1, 8))
    switch(r){
      case 1 : fruit.addImage(pineapple)
        break;
      case 2 : fruit.addImage(pomogrannete)
        break; 
      case 3 : fruit.addImage(strawberry)
        break;  
      case 4 : fruit.addImage(watermelon)
        break; 
      case 5 : fruit.addImage(apple)
        break;
      case 6 : fruit.addImage(banana)
        break;
      case 7 : fruit.addImage(blueberry)
        break;  
      case 8 : fruit.addImage(cherry)
        break;  
    }
    fruit.y = Math.round(random(50, 450));
   var position = Math.round(random(1,2))
   switch(position){
     case 1: fruit.x = 0
       fruit.velocityX = (7 + score/100)
       break;
     case 2: fruit.x = 592.5
       fruit.velocityX = -(7 + score/100)
       break;
   }
  
    fruit.lifetime = 85.2142857143;
    
    fruitGroup.add(fruit);
  }
}
function bombs(){
  if(frameCount % 200 === 0){
    bomb = createSprite(0, 250);
    bomb.scale = 0.15;
    r1 = Math.round(random(1, 5))
    switch(r1){
      case 1 : bomb.addImage(bomb1)
        break;
      case 2 : bomb.addImage(bomb2)
        break; 
      case 3 : bomb.addImage(bomb3)
        break;  
      case 4 : bomb.addImage(bomb4)
        break; 
      case 5 : bomb.addImage(bomb5)
        break; 
    }
    var pos = Math.round(random(1, 2));
    switch(pos){
      case 1: bomb.x = 0
        bomb.velocityX = (7 + score/100)
        break;
      case 2: bomb.x = 592.5;
        bomb.velocityX = -(7 + score/100)
        break;
    }
    bomb.y = Math.round(random(50, 450));
    bomb.lifetime = 85.2142857143;
    
    bombGroup.add(bomb);
  }
}
