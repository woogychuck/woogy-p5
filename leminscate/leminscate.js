let currentDegreePosition = 0;
const centerX = 500;
const centerY = 400;
const radius = 2000;
const speed = 2;
const circleCount = 7;
const circleMaxRadius = 100;
const trailBy = 10;
const shrink = 10;

const maxR = 0;
const rChange = 0;
const maxG = 100;
const gChange = -10;
const maxB = 255;
const bChange = -40;

//Called Once
function setup() {
  createCanvas(1000, 800);
  noStroke();
}

//Called every frame
function draw() {
  background("#fff");
  currentDegreePosition = currentDegreePosition + speed;
  if (currentDegreePosition > 360) {
    currentDegreePosition = currentDegreePosition - 360;
  }

  for (let i = 0; i < circleCount; i++) {
    drawCircle(i);
  }
}

function drawCircle(index) {
  setFill(index);
  const circleDegrees = currentDegreePosition - trailBy * index;
  const circleSize = circleMaxRadius - shrink * index;
  const theta = (circleDegrees * Math.PI) / 180;

  const position = positionOnBernoulli(centerX, centerY, radius, theta);
  ellipse(position.x, position.y, circleSize, circleSize);
}

function setFill(index) {
  let currentR = maxR + rChange * index;
  if (currentR < 0) {
    currentR = 0;
  }

  let currentG = maxG + gChange * index;
  if (currentG < 0) {
    currentG = 0;
  }

  let currentB = maxB + bChange * index;
  if (currentB < 0) {
    currentB = 0;
  }

  fill(currentR, currentG, currentB);
}
