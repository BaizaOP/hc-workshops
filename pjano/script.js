// Put Javascript logic into here!
Tone.start();
const synth = new Tone.Synth().toDestination();

function playNote(note) {
  synth.triggerAttackRelease(`${note}4`, '8n');
  document.querySelector(`#${note}`).style.background = '#33d6a6';
  setTimeout(() => {
     document.querySelector(`#${note}`).style.background = 'white';
  }, 200);
}

document.onkeydown = (e) => {
  e = e || window.event;
  var key = e.which || e.keyCode;
  switch(key) {
    case "S".charCodeAt(): 
      playNote('C');
      break;
    case "D".charCodeAt(): 
      playNote('D');
      break;
    case "F".charCodeAt(): 
      playNote('E');
      break;
    case "G".charCodeAt(): 
      playNote('F');
      break;
    case "H".charCodeAt(): 
      playNote('G');
      break;
    case "J".charCodeAt(): 
      playNote('A');
      break;
    case "K".charCodeAt(): 
      playNote('B');
      break;
    default:
      break;
  }
}

