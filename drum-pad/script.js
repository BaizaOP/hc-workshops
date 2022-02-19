// Put Javascript logic into here!

// figure out how to make links an array and programmatically add event listeners to each box?

const pad = document.querySelector(".pad");
const muzak = [
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0025.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0010.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0000.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/RS.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/OH25.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/MA.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CY0010.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CH.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CB.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/BD0010.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/BD0000.mp3',
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CP.mp3',
];

for(let i = 0; i < pad.children.length; i++) {
  pad.children[i].addEventListener("click", () => {
    play(muzak[i]);
  });
}

function play(link) {
  let audio = new Audio(link);
  audio.load();
  audio.play();
}

// got this addEvent from: https://stackoverflow.com/questions/16089421/simplest-way-to-detect-keypresses-in-javascript
addEvent(document, "keypress", function (e) {
  e = e || window.event;
  const selected = document.querySelector(`#${String.fromCharCode(e.keyCode).toUpperCase()}`);
  if(e.keyCode >= "A".charCodeAt() && e.keyCode <= "L".charCodeAt()) {
    play(muzak[e.keyCode - "A".charCodeAt()]); 
    selected.classList.add('on'); // kinda janky but whatever
    setTimeout(() => {
      selected.classList.add('off'); 
      selected.classList.remove('on');
      selected.classList.remove('off');
    }, 100);
  } else if (e.keyCode >= "a".charCodeAt() && e.keyCode <= "l".charCodeAt()) {
    play(muzak[e.keyCode - "a".charCodeAt()]); 
    selected.classList.add('on');
    setTimeout(() => {
      selected.classList.add('off'); 
      selected.classList.remove('on');
      selected.classList.remove('off');
    }, 100);
  }
  
});

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}
