// TODO: Doesn't seem to work on reload, debug?

let fft; // p5.js Fast Fourier Transform
let galaxy;

let w, h;

function setup() {
  w = windowWidth;
  h = windowHeight;

  createCanvas(windowWidth, windowHeight);
  noStroke();

  let mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
  galaxy = new Galaxy(1024);
  galaxy.positionParticles();
  galaxy.drawParticles();
}

function draw() {
  background(0,0,0,60);
  galaxy.drawParticles();
  let spectrum = fft.analyze();
  galaxy.updateParticles(spectrum);

}

class Particle {
  constructor (position) {
    this.position = position;
    this.speed = createVector(0, 1);
    this.diameter = 10;
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.color = [this.r, this.g, this.b, 75];
  }
  draw() {
    circle(this.position.x, this.position.y, this.diameter);
    fill(this.color);
  }
  update(energy) {
    this.diameter = random(5, 7) + energy / 7.5;
    this.position.y += this.speed.y * energy / 30;
    let a = 100 + energy * 1.3;
    this.color = [this.r, this.g, this.b, a];
    if(this.position.y > h) {
      this.position.y = 0;
    }
  }
}

class Galaxy {
  constructor (num) {
    this.num = num; 
    this.particles = [];
  }
  positionParticles () {
    for (let i = 0; i < this.num; i++) {
      const particle = new Particle (createVector(Math.round(Math.random() * w), 
                                                  Math.round(Math.random() * h)));
      this.particles.push(particle);
    }
  }
  drawParticles() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  }
  updateParticles(energy) {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(energy[i % 248]);
    }
  }
}
