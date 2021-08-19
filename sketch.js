//Create variables here
var dog,dogImage,happyDogImage,database,foodS,foodStroke;


function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodStoke = database.ref("Food");
  foodStoke.on("value",readStoke);
  foodStoke.set(20);

  dog = createSprite(250,350,10,60)
  dog.addImage(dogImage);
  dog.scale = 0.2;

  
}


function draw() {
  background("green")
  
  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("note:press UP ARROW to feed DRAGO milk", 50,50);
    text("food Remaining: "+foodS,150,150)

    if(keyWentDown(UP_ARROW)){
      writeStoke(foodS);
      dog.addImage(happyDogImage);

    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImage)

    }

    if(foodS === 0){
      foodS = 20;

    }

  drawSprites();

 }

}

function writeStoke(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
     food:x
  });
}

function readStoke(data){
  foodS = data.val();

}

