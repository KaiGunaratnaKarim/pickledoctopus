PLAY = 1
END = 0
var gamestate = PLAY
var trex, trex_running;
var score = 0
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  grounding = loadImage("ground2.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  cloud = loadImage("cloud.png")
  trex_dy = loadImage("trex_collided.png")
  gameover = loadImage("gameOver.png")
  restart = loadImage("startre.png")
  boop = loadSound("beeeeep.wav")
  woo = loadSound("celebrate.wav")
  piggyback = loadSound("dy.wav")
}

function setup(){
  createCanvas(600,200)
  
 trex = createSprite(35, 180, 30, 15)
 trex.addAnimation("running", trex_running)
 trex.addAnimation("ded", trex_dy)
 trex.scale = 0.5
 ground = createSprite(0, 180, 600, 200)
 ground.addImage("ground2.png", grounding)
 ground.velocityX = -5
 ground.x = ground.width / 2
 ground.debug = false
 ground1 = createSprite(0,190,600,10)
 ground1.visible = false
 cactusgroup = createGroup()
 cloudgroup = createGroup()
 no = createSprite(300, 80, 100, 50)
 no.addImage("non", gameover)
 yes = createSprite(300, 120, 50, 50)
 yes.addImage("oui", restart)
 yes.scale = 0.03
}

function draw(){
  background("white")
  drawSprites()
  if(gamestate==PLAY) {
    if(ground.x <= 0) {
      ground.x = ground.width / 2
    }

    ground.velocityX = -5

    if(keyDown("space")&&trex.y>160) {
      trex.velocityY = -10
      boop.play()
    }
  
    trex.velocityY = trex.velocityY + 0.8

    if(cactusgroup.isTouching(trex)) {
      gamestate=END
      
      piggyback.play()
    }

    score = score + Math.round(getFrameRate())

    if(score% 100==0) {
      console.log("celebrate")
      woo.play()
    }

    no.visible = false
    yes.visible = false

    cactus()
    clood()

  }

  if (gamestate==END) {
    trex.changeAnimation("ded")
    ground.velocityX = 0
    trex.velocityX = 0
    cactusgroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    no.visible = true
    yes.visible = true

    if (mousePressedOver(yes)) {
    reset()
    }
  }

  trex.collide(ground1)

  textSize(18)
  text("Score: " + score, 480, 40)
}

function cactus(){
  if(frameCount% 70==0) {
  obs = createSprite(590, 165, 10, 20)
  obs.velocityX = -5
  obs.scale = 0.4
  rand = Math.round(random(1,6))
  switch(rand) {
    case 1: obs.addImage(ob1)
    break;
    case 2: obs.addImage(ob2)
    break;
    case 3: obs.addImage(ob3)
    break;
    case 4: obs.addImage(ob4)
    break;
    case 5: obs.addImage(ob5)
    break;
    case 6: obs.addImage(ob6)
    break;
    }
    cactusgroup.add(obs)
  }
}

function clood(){
 if(frameCount% 100==0) {
  bg = createSprite(590, 55, 60, 15)
  bg.velocityX = -3
  bg.scale = 0.6
  bg.addImage(cloud)
  bg.y = Math.round(random(45,65))
  cloudgroup.add(bg)
 }
}

function reset() {
  gamestate=PLAY
      score = 0
      no.visible = false
      yes.visible = false
      cactusgroup.destroyEach()
}