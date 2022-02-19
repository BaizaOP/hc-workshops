// this uses p5.js

// window dimensions
let HEIGHT;
let WIDTH;

// program constants
const DEPTH = 5;            //how many levels of branches we will draw
let curl = Math.PI / 6;     //the angle each new branch rotates by
const breadth = 4;          // how many branches each new one will create
let spread = Math.PI / 3; // the angle between each new branch

// create colorRadio buttons
let colorRadio;
const COLOROPTS = ['red', 'green', 'blue', 'black'];

let sizeRadio;
const SIZEOPTS = ['same - small', 'same - big', 'big and small', 'small and big'];

let weightRadio;
const WEIGHTOPTS = ['small', 'normal', 'chonky', 'EXTRA CHONK'];

let reverseRadio;
const REVERSEOPTS = ['dark to light', 'light to dark'];

let megaChonkCheckbox;

function setup() {
  HEIGHT = 800;
  WIDTH = displayWidth;
  createCanvas(WIDTH, HEIGHT);

  colorRadio = createRadio();
  COLOROPTS.forEach((index) => {
    colorRadio.option(index);
  });
  colorRadio.style('height', '30px');
  colorRadio.selected(COLOROPTS[0])

  textAlign(CENTER);
  
  reverseRadio = createRadio();
  REVERSEOPTS.forEach((index) => {
    reverseRadio.option(index);
  });
  reverseRadio.style('height', '30px');
  reverseRadio.selected(REVERSEOPTS[0])
  textAlign(CENTER);
 
  sizeRadio = createRadio();
  SIZEOPTS.forEach((index) => {
    sizeRadio.option(index);
  });
  sizeRadio.style('height', '30px');
  sizeRadio.selected(SIZEOPTS[0])
  textAlign(CENTER);
  
  weightRadio = createRadio();
  WEIGHTOPTS.forEach((index) => {
    weightRadio.option(index);
  });
  weightRadio.style('height', '150px');
  weightRadio.selected(WEIGHTOPTS[0])
  textAlign(CENTER);

  megaChonkCheckbox = createCheckbox('???', false);
}

function draw() { 
  setBackground(colorRadio.value()); 
  // set the curl angle with mouse X position
  curl = Math.PI * ((mouseX / WIDTH) * 2 - 1);
  spread = Math.PI * ((mouseX / WIDTH) * 2 - 1); // the angle between each new branch

  // the canvas has its 0, 0 at the top left part of the screen
  // we want 0,0 to be at the bottom middle part of the screen
  // so we translate to bottom middle
  translate(WIDTH/2, HEIGHT); 

  // but increasing values of y will still be going down, 
  // so we need to rotate by 180 to make increasing values of y
  // go up
  rotate(Math.PI);

  // make the scale be that 1 is half of the height
  scale(HEIGHT/2);

  // start drawing branches
  branch(DEPTH);

}

function setBackground(strokeColor) {
  if(strokeColor === COLOROPTS[3]) {
    background(230);
  } else {
    background('#222222');
  }
}

function setStrokeColor(startVal, iter, reverse) {
  let mainColor, secondaryColor; 
  if(reverse) {
    mainColor = startVal + (255-startVal) / DEPTH * (iter);
    secondaryColor = 80 - 10 * (DEPTH - iter);
  } else {
    mainColor = startVal + (255-startVal) / DEPTH * (DEPTH - iter);
    secondaryColor = 80 - 10 * (DEPTH - iter);
  }
  switch(colorRadio.value()) {
    case COLOROPTS[0]:
      stroke(mainColor, secondaryColor, secondaryColor);
      break;
    case COLOROPTS[1]:
      stroke(secondaryColor, mainColor, secondaryColor);
      break;
    case COLOROPTS[2]:
      stroke(secondaryColor, secondaryColor, mainColor);
      break;
    case COLOROPTS[3]:
      stroke(0);
      break;
    default:
      stroke(255);
  }
}

function setStrokeWeights() {
  let biggerWeight, smallerWeight;
  if(megaChonkCheckbox.checked()) {
    biggerWeight = 10;
    smallerWeight = .1;
  } else {
    switch(weightRadio.value()) {
      case WEIGHTOPTS[0]:
        biggerWeight = .15;
        smallerWeight = .1;
        break;
      case WEIGHTOPTS[1]:
        biggerWeight = .3;
        smallerWeight = .25;
        break;
      case WEIGHTOPTS[2]:
        biggerWeight = .66;
        smallerWeight = .5;
        break;
      case WEIGHTOPTS[3]:
        biggerWeight = 2;
        smallerWeight = 1.8;
        break;
      default:
        biggerWeight = .15;
        smallerWeight = .1;
        break;
    }
  }
  return [biggerWeight, smallerWeight];
}

function setStrokeOrder(index, small, big) {
  switch(sizeRadio.value()) {
    case SIZEOPTS[0]:
      strokeWeight(index == 0 ? small : small);
      break;
    case SIZEOPTS[1]:
      strokeWeight(index == 0 ? big : big);
      break;
    case SIZEOPTS[2]:
      strokeWeight(index == 0 ? small : big);
      break;
    case SIZEOPTS[3]:
      strokeWeight(index == 0 ? big : small);
      break;
    default:
      console.log("stroke weight order function error")
      break;
  }
}

// use recursion!
function branch(iter) {
  // draw a line from the botton to half way up
  setStrokeColor(70, iter, reverseRadio.value() != REVERSEOPTS[0]);

  let weights = setStrokeWeights();
  let biggerWeight = weights[0];
  let smallerWeight = weights[1];
 
  setStrokeOrder(0, smallerWeight, biggerWeight);
  line(0, 0, 0, 0.5);
  setStrokeOrder(1, smallerWeight, biggerWeight);
  line(0, 0.5, 0, 1)

  // if there are more levels to be drawn...
  if(iter > 1) {
    translate(0, 1); // translate to the top of the prev branch
    
    rotate(curl); 

    // zoom twice as far into the canvas
    scale(.5);

    for(let i = 0; i < breadth; i++) {
      // recurse for the next branch!
      branch(iter - 1);

      rotate(spread);
    }

    // undo cumulative rotation
    rotate(-spread * breadth);

    // undo the curl rotation we applied to this branch
    rotate(-curl);

    // zoom back out
    scale(2);

    // move back to start of line
    translate(0, -1)
  }
}
