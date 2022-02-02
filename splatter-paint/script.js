//TODO: Maybe add a slider to change the amount of offset and
//      the radius of the circles, p5?

tool.fixedDistance = 10;
function onMouseMove(event) {
  var randOffsetX = Math.random() * 20 - 10;
  var randOffsetY = Math.random() * 20 - 10;
  var rad = Math.round(Math.random() * 10 + 5);
  var path = new Path.Circle({
    center: [event.middlePoint.x + randOffsetX, 
             event.middlePoint.y + randOffsetY],
    radius: rad,
  });
  path.fillColor = {
    hue: event.middlePoint.x + event.middlePoint.y % 360,
    saturation: .7,
    brightness: 1,
  }
  document.querySelector('canvas').style.backgroundColor = 'rgb(10,10,10)'; // tried to do hsl, but I like this better lol
}
