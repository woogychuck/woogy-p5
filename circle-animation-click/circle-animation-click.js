let currentDegreePosition = 0;
const centerX = 500;
const centerY = 400;
const radius = 200;
let speed = 2;

//Called Once
function setup() {
  createCanvas(1000, 800);
  fill("#FC0");
  stroke("#C90");
}

//Called every frame
function draw() {
  background("#fff");
  currentDegreePosition = currentDegreePosition + speed;
  if (currentDegreePosition > 360) {
    currentDegreePosition = currentDegreePosition - 360;
  }

  const position = positionOnCircle(
    centerX,
    centerY,
    radius,
    currentDegreePosition
  );
  ellipse(position.x, position.y, 100, 100);
}

function mouseClicked() {
  speed = speed + 2;
  console.log(`New Speed: ${speed}`);
}
