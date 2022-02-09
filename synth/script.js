// Put Javascript logic into here!

Tone.start();
const synth = new Tone.Synth().toDestination();
const pad = document.querySelector('#pad');
const label = document.querySelector('#label');
let dragging = false;

pad.addEventListener('pointerdown', down);
pad.addEventListener('pointerup', up); 
pad.addEventListener('pointermove', move);


function up(e) {
  dragging = false;
  synth.triggerRelease();
  label.innerHTML = 'CLICK / DRAG';
  pad.style.background = `black`;
  label.style.color = `white`;
}

function down(e) {
  dragging = true;
  const x = e.pageX;
  const value = Math.round(mapVal(x, 0, document.querySelector('body').clientWidth, 0, 750) * 1000) / 1000;
  synth.triggerAttack(value);
  label.innerHTML = Math.round(value) + 'Hz';
  pad.style.background = `hsl(${Math.round(mapVal(value, 0, 750, 0, 360))}, 100%, 50%)`;
  label.style.color = `hsl(${180 + Math.round(mapVal(value, 0, 750, 0, 360))}, 100%, 50%)`;
}

function move(e) {
  if(dragging) {
    const x = e.pageX;
    const value = Math.round(mapVal(x, 0, document.querySelector('body').clientWidth, 0, 750) * 1000) / 1000;
    synth.setNote(value);
    label.innerHTML = Math.round(value) + 'Hz';
    pad.style.background = `hsl(${Math.round(mapVal(value, 0, 750, 0, 360))}, 100%, 50%)`;
    label.style.color = `hsl(${180 + Math.round(mapVal(value, 0, 750, 0, 360))}, 100%, 50%)`;
  }
}

function mapVal (x, imin, imax, omin, omax) {
  return (x - imin) * (omax - omin) / (imax - imin) + omin;
}
