let X =200;
let Y =345;
let X2;
let Y2 = 0;
let X3 = 100;
let Y3 = 100;
let X4;
let Y4 = 0;
let score = 0;
let button;
let X5;
let Y5 =0;
let X6;
let Y6 =0;
let X7;
let Y7 =0;
let X8;
let Y8 =0;
let X9;
let Y9 =0;
let nacht = false;


let cnv;
function setup() {
  cnv = createCanvas(400, 400);
  X2 = random(width);
  
  
  
}

function draw() {
  
  

  
    if (nacht) {
    background(31,32,50);
    //sterren
    fill('gold');
    noStroke();
    ellipse(X5,Y5,5,5);
    ellipse(X6,Y6,5,5);
    ellipse(X6,Y6,5,5);
    ellipse(X7,Y7,5,5);
    ellipse(X8,Y8,5,5);
    ellipse(X9,Y9,5,5);
    
    //maan
     fill('darkgrey');
     ellipse(10,10,100,100);
     fill('dimgrey');
     ellipse(15,40,15,15);
     ellipse(40,15,25,25);
    
    //wolk
     fill('dimgrey');
     ellipse(X3,Y3,60,60);
     ellipse(X3 + 40,Y3,60,60);
     ellipse(X3 + 80,Y3,60,60);
     ellipse(X3 + 40,Y3 - 30,60,60);
      
    //score
     textSize(32);
     fill('white');
     text('Score:' + score, 10, 10,70);
  }    
   else {
     background('cornflowerblue');
     
     //zon
     fill('gold');
     ellipse(10,10,100,100);
     
     //wolk
     fill('white');
     ellipse(X3,Y3,60,60);
     ellipse(X3 + 40,Y3,60,60);
     ellipse(X3 + 80,Y3,60,60);
     ellipse(X3 + 40,Y3 - 30,60,60);
     
     //score
     textSize(32);
     fill(0);
     text('Score:' + score, 10, 10,70);
   }
    
  
  
  //------------------------------------zon
      
  
  //------------------------------------score
  textSize(32);
  fill(0);
  text('Score:' + score, 10, 10,70);
  
  //------------------------------------vliegtuig
  fill('dodgerblue');
  stroke('black');
  strokeWeight(1);
  ellipse(X,Y - 5,55,15);
  fill('white');
  ellipse(X,Y,15,50);
  ellipse(X - 15,Y - 12,9,7);
  ellipse(X + 15,Y - 12,9,7);
  
  //------------------------------------kokmeeuw
  noStroke();
  fill(255);
  ellipse(X2,Y2,7,35);
  fill('grey');
  ellipse(X2,Y2,35,7);
  fill('black');
  ellipse(X2,Y2 + 13,5,5);
  
  noStroke();
  fill(255);
  ellipse(X4,Y4,7,35);
  fill('grey');
  ellipse(X4,Y4,35,7);
  fill('black');
  ellipse(X4,Y4 + 13,5,5);
  
  //------------------------------------wolk
  
  
    if(keyIsDown(65)) {
      X -=3.5;
    }
    if(keyIsDown(68)) {
      X +=3.5;
    }
    
    Y2 += 6.5;
    Y4 += 7;
  
    X3 += 0.1;
  //-----------------------------------------vogels
  if (Y2 > height){
    X2 = random(width);
    Y2 = 0;
    score += 1;
    if (score % 50 === 0) {
      nacht = !nacht;
    }
  }
  if (Y4 > height){
    X4 = random(width);
    Y4 = 0;
    score += 1;
    if (score % 50 === 0) {
      nacht = !nacht;
    }
  }
  //-----------------------------------------wolk
  if (X3 > 430){
    X3 = -120;
    Y3 = 100;
  }
  //-----------------------------------------sterren
  if (Y5 > height){
    X5 = random(width);
    Y5 = 0;
    } 
  
  if (Y6 > height){
    X6 = random(width);
    Y6 = 0;
    }  
  
  if (Y7 > height){
    X7 = random(width);
    Y7 = 0;
    }
  
  
  if (Y8 > height){
    X8 = random(width);
    Y8 = 0;
    }
  
  
  if (Y9 > height){
    X9 = random(width);
    Y9 = 0;
    }
  
  Y5 += 0.2;
  Y6 += 0.5;
  Y7 += 0.3;
  Y8 += 0.1;
  Y9 += 0.4;
  
  if(X2-X<45 && X-X2<45 && Y2-Y<25 && Y-Y2<25){
    noLoop();
      button = createButton('Restart');
      button.position(cnv.position().x + 175, cnv.position().y + 200);
      button.mousePressed(restart);
    
  }
  
  if(X4-X<45 && X-X4<45 && Y4-Y<25 && Y-Y4<25){
   noLoop();
    button = createButton('Restart');
      button.position(cnv.position().x + 175, cnv.position().y + 200);
      button.mousePressed(restart);
    
      
    
  } 
  
  if(X<10) {
    X=10
  }
  if(X>390) {
    X=390
  }
}
  
  function restart(){
    button.hide();
    loop();
    X = 200;
    Y = 345;
    
    nacht = false;
    
    score = 0
     X2 = random(width);
     Y2 = 0;
    
     X4 = random(width);
     Y4 = 0;
   
  
  
  
}