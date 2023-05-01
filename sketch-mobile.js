let t = 0; // time variable
let circleSize;

function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvas-intro-container');
  noStroke();
  fill(255);
  circleSize = min(windowWidth, windowHeight) * 1.9;
}

function draw() {
  background(0, 30); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on scroll position
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const xAngle = map(scrollPos, 0, height, -4 * PI, 4 * PI, true);
      const yAngle = map(scrollPos, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      // only draw circles within a certain distance from the center
      if (dist(width / 2, height / 2, myX, myY) < circleSize / 2) {
        ellipse(myX, myY, 10); // draw particle
      }
    }
  }

  t = t + 0.01; // update time
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circleSize = min(windowWidth, windowHeight) * 0.9;
}
