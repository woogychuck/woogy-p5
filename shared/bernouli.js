function squareNumber(val) {
  return Math.pow(val, 2);
}

function positionOnBernoulli(centerX, centerY, size, theta) {
  var scale = size / (Math.pow((Math.sin(theta), 2), 2) + 1);
  var x = scale * Math.cos(theta) + centerX;
  var y = (scale * Math.sin(2 * theta)) / 2 + centerY;
  return { x, y };
}
