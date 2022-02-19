// TODO: if there is a color word AT ALL in the sentence, display the color
let prevOKColor = "white";
                                         // call back func we can use!
const speech = new p5.SpeechRec('en-US', () => {
  if(speech.resultValue) {
    const rawText = speech.resultString.toUpperCase();
    const color = rawText.split(' ').join('');
    // TODO: implement rainbow, maybe tile rectangles on screen and color differently?
    // make a func?
    /* if(color == "RAINBOW") {
      background("YELLOW");
      prevOKColor = "YELLOW";
      text("RAINBOW", width/2, height/2);
    } else */ if(isColor(color)) { 
      background(color);
      prevOKColor = color;
      text(color, width/2, height/2);
    } else {
      background(prevOKColor);
      text(rawText, width/2, height/2);
    }
    console.log(color, text);
  }
});

// speech api stuffs
speech.continuous = true;
speech.interimResults = false;

// setup initial screen
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(25);

  textSize(48);
  textAlign(CENTER);
  textStyle(BOLDITALIC);
  textFont('"Avenir Next", system-ui, sans-serif');
  text('SAY A COLOR!', width/2, height/2);
  
  // start the speech api
  speech.start();
}

function draw() {
  /* dont really need this */
}

// function to determine if a word is a color,
// only change screen color if valid color
function isColor(strColor) {
  let s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}
