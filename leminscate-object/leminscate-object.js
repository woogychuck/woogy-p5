let leminator;

function setup() {
  createCanvas(1000, 800);
  leminator = new Leminator({
    x: 500,
    y: 400,
    colorMode: "greyscale",
  });
  noStroke();
}

function draw() {
  background(255);
  leminator.draw();
}
