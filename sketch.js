var dogImg1, dogImg2;
var dog, database, foodS, foodStock;

function preload() {
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250, 250);
  dog.addImage(dogImg1);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", (data)=>{
    foodS = data.val();
  })
}


function draw() {
  background(46, 139, 87);

  if(keyWentDown("UP_ARROW") && foodS < 20){
    foodS = foodS + 1;
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  if(foodS === undefined){
    foodS = "_";
  }

  if(foodS < 0){
    foodS = 0;
  }
  if(foodS < 21) {
    foodS = foodS - 0.005;
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  textSize(16);
  fill(5, 5, 100);
  text("food level: " + Math.round(foodS), 190, 140);
  text("Note: Press up arrow key to feed the dog", 100, 50);
}

//function to write in the database
function writeStock(x){

  database.ref('/').update({
    Food:x
  });
}