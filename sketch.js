let face1, face2, bg, sc2, sc3, sc4, sc5, sc6, sc7, sc10, sc11, sc12, head, blood1, blood2,bit, sound, left, right, down, redd, blackk,start,wall;
let currentImage;
let currentScene = "scene1";
let images = []; // store the pics
let movedImages = Array(35).fill(false); // tracking the pics
let specialImages = [3,12, 14, 26, 27]; 
let switchTimer = 0; 
let headX, headY;
let fallSpeed = 10;
let rotationAngle = -0.1; // rotation angle
let rotationSpeed = 0.01;
let isFalling = false; 
let lastClickTime = { left: 0, right: 0, down: 0 };
let positions = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 }, down: { x: 0, y: 0 } };
let displayTimes = { left: 1000, right: 2000, down: 3000 }; // jumpscaretime
let scene6StartTime = 0; 
////avatar place sc10////
let blackkX = 280; // X
let blackkY = 400; // Y
/////words for slection//////
let messages = [
  "Do you often feel tense or anxious?",
  "Do small things make you uneasy?",
  "Do you struggle to focus?",
  "Do you find it hard to relax?",
  "Do you wake up and can’t fall back asleep?",
  "Do you worry about things going wrong?",
  "Does worry disrupt your day?",
  "Do you often feel dizzy or get headaches?",
  "Do you feel tired or low on energy?",
  "Do you fear or worry about future tasks?",
  "Do you avoid social events due to anxiety?",
  "Do you feel uneasy even after issues are solved?",
  "Do you feel things are out of control?",
  "Do you feel tense in social situations?",
  "Do you struggle to stop worrying?",
  "Has anxiety affected your appetite?",
  "Do you get a racing heart or sweaty palms?",
  "Do you feel chest tightness or breathless from anxiety?",
  "Are daily tasks harder than usual?",
  "Does anxiety make it hard to enjoy life?",
  "Do you feel restless or on edge often?",
  "Do you often feel overwhelmed by simple tasks?",
  "Do you find it hard to make decisions?",
  "Do you feel others are judging you?",
  "Do you worry excessively about health issues?",
  "Do you avoid crowded places due to anxiety?",
  "Do you feel overly self-conscious?",
  "Does your mind frequently go blank?",
  "Do you struggle with sleep despite feeling tired?",
  "Do you find it hard to manage stress?"
];
let index = 0;
//shake
let shakeMagnitude = 0;
let shakeIncrement = 0.5; 

let MyFont;

//easter egg for the last scene(flash)///
let isFlashing = false; 
let flashInterval = 30; 
let lastFlashTime = 0; 
let showingSc12 = false; 

function preload() {
  MyFont = loadFont('word.ttf');
  face1 = loadImage("face1.png");
  face2 = loadImage("face2.png");
  bg = loadImage("bg1.png");
  sc2 = loadImage("sc2.png");
  sc3 = loadImage("sc3.png");
  sc4 = loadImage("sc4.png");
  sc5 = loadImage("sc5.png");
  sc6 = loadImage("sc6.png");
  sc7 = loadImage("sc7.png");
  sc10 = loadImage("sc10.png");
  sc11 = loadImage("sc11.png");
  sc12 = loadImage("sc12.png");
  head = loadImage("head.png");
  left = loadImage("left.png");
  right = loadImage("right.png");
  down = loadImage("down.png");
  blood1 = loadImage("sc7.1.png");
  blood2 = loadImage("sc7.2.png");
  sound = loadSound("music.mp3");
  redd = loadImage("red.png");
  blackk = loadImage("black.png");
  start = loadImage("start.png");
  hit = loadImage("bit.png");
  wall = loadImage("wall.png");
  
///loading the calender//
  images[0] = loadImage("days/00.PNG");
  images[1] = loadImage("days/0.PNG");
  for (let i = 0; i <= 33; i++) {
    let imgName = `days/${i}.PNG`;
    images[i] = loadImage(imgName);
    /////////
  }
}

function setup() {
  createCanvas(600, 400);
  sound.loop();
  currentImage = face1;
  headX = 0;
  headY = -100;
}

function draw() {
  if (millis() >= 28600 && currentScene === "scene1") {
    changeScene("scene2");
  }
  //console.log(mouseX,mouseY)
///swicth scene///
  switch (currentScene) {
    case "scene1":
      scene1();
      break;
    case "scene2":
      scene2();
      break;
    case "scene3":
      scene3();
      break;
    case "scene4":
      scene4();
      break;
    case "scene5":
      scene5();
      break;
    case "scene6":
      scene6();
      if (millis() - scene6StartTime >= 25000) {
        changeScene("scene7");
      }
      break;
    case "scene7":
      scene7();
      break;
    case "scene8":
      scene8();
      break;
    case "scene9":
      scene9();
      break;
    case "scene10":
      scene10();
      break;
    case "scene11":
      scene11();
      break;
  }
//////scene 10 avatar move/////
  if (currentScene === "scene10") {
    image(blackk, blackkX, blackkY, 50, 70);
  }

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    blackkX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    blackkX += 5;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    blackkY -= 5;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    blackkY += 5;
  }

  blackkX = constrain(blackkX, 250, 300);
  blackkY = constrain(blackkY, 0, 370);

  if ((blackkX === 0 || blackkY === 0) && currentScene === "scene10") {
    changeScene("scene11");
  }

  if (switchTimer > 0 && millis() - switchTimer >= 1000) {
    changeScene("scene4");
    switchTimer = 0;
  }
  
  if (currentScene === "scene11") {
    scene11();
  }

  //easter egg flashing scene for scene 11
  if (isFlashing && currentScene === "scene11") {
    if (millis() - lastFlashTime > flashInterval) {
      showingSc12 = !showingSc12;
      lastFlashTime = millis();
    }
    if (showingSc12) {
      image(sc12, 0, 0, width, height);
      push();
  translate(width / 2 , height / 2 );
  textAlign(CENTER, CENTER);
  textFont(MyFont);
  textSize(25);
  fill(255);
  text("Eternal Madness Till Death", 0, 0);
  pop();
    } else {
      image(sc11, 0, 0, width, height);
    }
  }
}


function scene1() {
  image(bg, 0, 0, width, height);

  if (millis() >= 15000) {
    currentImage = face2;
  }

  image(currentImage, 0, 0, width, height);
  if (millis() >= 28000) {
    push();
    fill(0);
    rect(0, 0, 800, 800);
    pop();
  }

//shake
  let xOffset = random(-shakeMagnitude, shakeMagnitude);
  let yOffset = random(-shakeMagnitude, shakeMagnitude);

//words and choices 
  push();
  translate(width / 2 + xOffset, height / 2 + yOffset);
  textAlign(CENTER, CENTER);
  textFont(MyFont);
  textSize(20);
  fill(255);
  text(messages[index], 0, -20);
  pop();

 
  textAlign(CENTER, CENTER);
  textFont(MyFont);
  textSize(24); 
  fill(0,0,255);
  text("Yes", width / 2 - 80, height - 60);
  text("No", width / 2 + 80, height - 60);
}


function scene2() {
  image(sc2, 0, 0, width, height);
  image(start, 0, 0, width, height);
}

function scene3() {
  image(sc3, 0, 0, width, height);

  for (let i = 0; i < images.length; i++) {
    if (movedImages[i]) {
      image(images[i], 800, 800, width, height);
    } else {
      image(images[i], 0, 0, width, height);
    }
  }
}


function scene4() {
  image(sc4, 0, 0, width, height);
}

function scene5() {
  image(sc5, 0, 0, width, height);

  if (rotationAngle < 0) {
    rotationAngle += rotationSpeed;
  } else {
    isFalling = true;
  }

  if (isFalling) {
    headY += fallSpeed;
    fallSpeed += 0.2;
  }

  push();
  translate(headX, headY);
  rotate(rotationAngle);
  image(head, 0, 0, width, height);
  pop();
}
function scene6() {
  //the clowns merging////
  image(sc6, 0, 0, width, height);
  if (millis() >= displayTimes.left) {
    image(left, positions.left.x, positions.left.y);
  }
  if (millis() >= displayTimes.right) {
    image(right, positions.right.x, positions.right.y);
  }
  if (millis() >= displayTimes.down) {
    image(down, positions.down.x, positions.down.y);
  }

  ["left", "right", "down"].forEach((item) => {
    if (millis() - lastClickTime[item] >= 500 && lastClickTime[item] > 0) {
      positions[item] = { x: 0, y: 0 };
      lastClickTime[item] = 0;
    }
  });
  image(hit, mouseX, mouseY);
}
function scene7() {
  image(sc7, 0, 0, width, height);
}

function scene8() {
  image(blood1, 0, 0, width, height);
}

function scene9() {
  image(blood2, 0, 0, width, height);
}

function scene10() {
  image(sc10, 0, 0, width, height);
  image(redd, 0, 0, width, height);
  image(wall, 0, blackkY, width, height);

}

function scene11() {
  if (!isFlashing) {
    image(sc11, 0, 0, width, height);
  }
    push();
  translate(width / 2 , height / 2 );
  textAlign(CENTER, CENTER);
  textFont(MyFont);
  textSize(25);
  fill(255);
  text("You are safe here", 0, -20);
  pop();
}

function mousePressed() {
  if (currentScene === "scene1") {
    // click yes or no////
    if (mouseX > width / 2 - 100 && mouseX < width / 2 - 60 && mouseY > height - 70 && mouseY < height - 50) {
      nextMessage();
      increaseShake(); //////yes then shake more
    } 
    else if (mouseX > width / 2 + 60 && mouseX < width / 2 + 100 && mouseY > height - 70 && mouseY < height - 50) {
      nextMessage();
    }
  }
 if (currentScene === "scene2") {
    if (mouseX > 235 && mouseX < 360 && mouseY > 279 && mouseY < 314) {
      changeScene("scene3");
    }
  } else if (currentScene === "scene3") {
    // Check and move images code
  } else if (currentScene === "scene4") {
    changeScene("scene5");
  } else if (currentScene === "scene5") {
    changeScene("scene6");
  } else if (currentScene === "scene7") {
    changeScene("scene8");
  } else if (currentScene === "scene8") {
    changeScene("scene9");
  } else if (currentScene === "scene9") {
    changeScene("scene10");
  }
  if (currentScene === "scene3") {
    ////the calender game//
    ////detecting whether the speicla image or not(with the help oflet specialImages = [3,12, 14, 26, 27]; )////

    if (mouseX > 104 && mouseX < 166 && mouseY > 92 && mouseY < 147) {
      movedImages[0] = true;
    }
    if (mouseX > 176 && mouseX < 235 && mouseY > 85 && mouseY < 147) {
      movedImages[1] = true;
    }
    if (mouseX > 246 && mouseX < 307 && mouseY > 85 && mouseY < 147) {
      movedImages[2] = true;
    }
    if (mouseX > 317 && mouseX < 372 && mouseY > 85 && mouseY < 147) {
      movedImages[3] = true;
      checkSwitchTimer(3);
    }
    if (mouseX > 380 && mouseX < 459 && mouseY > 85 && mouseY < 147) {
      movedImages[4] = true;
    }
    if (mouseX > 468 && mouseX < 561 && mouseY > 85 && mouseY < 147) {
      movedImages[5] = true;
    }
    if (mouseX > 34 && mouseX < 98 && mouseY > 160 && mouseY < 216) {
      movedImages[6] = true;
    }
    if (mouseX > 105 && mouseX < 169 && mouseY > 159 && mouseY < 214) {
      movedImages[7] = true;
    }
    if (mouseX > 174 && mouseX < 234 && mouseY > 149 && mouseY < 209) {
      movedImages[8] = true;
    }
    if (mouseX > 240 && mouseX < 308 && mouseY > 152 && mouseY < 209) {
      movedImages[9] = true;
    }
    if (mouseX > 315 && mouseX < 371 && mouseY > 155 && mouseY < 207) {
      movedImages[10] = true;
    }
    if (mouseX > 382 && mouseX < 462 && mouseY > 159 && mouseY < 207) {
      movedImages[11] = true;
    }
    if (mouseX > 469 && mouseX < 557 && mouseY > 159 && mouseY < 207) {
      movedImages[12] = true;
      checkSwitchTimer(12);
    }
    if (mouseX > 37 && mouseX < 94 && mouseY > 221 && mouseY < 268) {
      movedImages[13] = true;
    }
    if (mouseX > 98 && mouseX < 168 && mouseY > 221 && mouseY < 268) {
      movedImages[14] = true;
      checkSwitchTimer(14);
    }
    if (mouseX > 173 && mouseX < 232 && mouseY > 221 && mouseY < 268) {
      movedImages[15] = true;
    }
    if (mouseX > 237 && mouseX < 307 && mouseY > 221 && mouseY < 268) {
      movedImages[16] = true;
    }
    if (mouseX > 313 && mouseX < 375 && mouseY > 221 && mouseY < 268) {
      movedImages[17] = true;
    }
    if (mouseX > 382 && mouseX < 460 && mouseY > 221 && mouseY < 268) {
      movedImages[18] = true;
    }
    if (mouseX > 469 && mouseX < 555 && mouseY > 221 && mouseY < 268) {
      movedImages[19] = true;
    }
    if (mouseX > 37 && mouseX < 93 && mouseY > 277 && mouseY < 314) {
      movedImages[20] = true;
    }
    if (mouseX > 97 && mouseX < 165 && mouseY > 277 && mouseY < 314) {
      movedImages[21] = true;
    }
    if (mouseX > 172 && mouseX < 223 && mouseY > 277 && mouseY < 314) {
      movedImages[22] = true;
      checkSwitchTimer(22);
    }
    if (mouseX > 232 && mouseX < 307 && mouseY > 277 && mouseY < 314) {
      movedImages[23] = true;
    }
    if (mouseX > 309 && mouseX < 377 && mouseY > 277 && mouseY < 314) {
      movedImages[24] = true;
    }
    if (mouseX > 380 && mouseX < 464 && mouseY > 277 && mouseY < 314) {
      movedImages[25] = true;
    }
    if (mouseX > 467 && mouseX < 560 && mouseY > 277 && mouseY < 314) {
      movedImages[26] = true;
      checkSwitchTimer(26);
    }
    if (mouseX > 37 && mouseX < 92 && mouseY > 325 && mouseY < 358) {
      movedImages[27] = true;
      checkSwitchTimer(27);
    }
    if (mouseX > 97 && mouseX < 162 && mouseY > 325 && mouseY < 358) {
      movedImages[28] = true;
    }
    if (mouseX > 177 && mouseX < 228 && mouseY > 325 && mouseY < 358) {
      movedImages[29] = true;
    }
    if (mouseX > 233 && mouseX < 306 && mouseY > 325 && mouseY < 358) {
      movedImages[30] = true;
    }
    if (mouseX > 310 && mouseX < 377 && mouseY > 325 && mouseY < 358) {
      movedImages[31] = true;
    }
    if (mouseX > 383 && mouseX < 460 && mouseY > 325 && mouseY < 358) {
      movedImages[32] = true;
    }
    if (mouseX > 470 && mouseX < 561 && mouseY > 325 && mouseY < 358) {
      movedImages[33] = true;
    }
  }
  if (currentScene === "scene6") {
    if (mouseX > 142 && mouseX < 217 && mouseY > 71 && mouseY < 154) {
      positions.left = { x: 800, y: 800 };
      lastClickTime.left = millis();
    } else if (mouseX > 332 && mouseX < 422 && mouseY > 28 && mouseY < 97) {
      positions.right = { x: 800, y: 800 };
      lastClickTime.right = millis();
    } else if (mouseX > 360 && mouseX < 490 && mouseY > 259 && mouseY < 327) {
      positions.down = { x: 800, y: 800 };
      lastClickTime.down = millis();
    }
  }
  if (currentScene === "scene11") {
    isFlashing = !isFlashing;
  }
}

//if the player wins they still lose!
function checkSwitchTimer(index) {
  if (specialImages.includes(index) || checkAllOthersClicked()) {
    switchTimer = millis();
  }
}

function checkAllOthersClicked() {
  for (let i = 0; i < images.length; i++) {
    if (!movedImages[i] && !specialImages.includes(i)) {
      return false;
    }
  }
  return true;
}
function changeScene(newScene) {
  currentScene = newScene;
  
  if (newScene === "scene6") {
    scene6StartTime = millis();
  }
}
//show next text(scene1)
function nextMessage() {
  index = (index + 1) % messages.length;
}

//shake more
function increaseShake() {
  shakeMagnitude += shakeIncrement;
}
