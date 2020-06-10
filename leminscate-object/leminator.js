function Leminator(opts) {
  this.centerX = opts.x;
  this.centerY = opts.y;
  this.initialPosition = opts.initialPosition || 0;
  this.currentPosition = this.initialPosition;
  this.velocity = opts.velocity || 2;
  this.size = opts.size || 2000;

  this.trailBy = opts.trailBy || 10;

  this.shape = opts.shape || "circle";
  this.initalSize = opts.initalSize || 100;
  this.sizeScale = opts.sizeScale || -10;
  this.shapeCount = opts.shapeCount || 10;

  if (opts.colorMode) {
    switch (opts.colorMode) {
      case "greyscale":
        this.colorScaler = new ColorScaler({
          count: this.shapeCount,
          mode: "greyscale",
        });
        break;
    }
  } else {
    this.colorScaler = {
      getColor: function () {
        return 0;
      },
    };
  }
}

Leminator.prototype.draw = function () {
  //Update position
  this.currentPosition = this.currentPosition + this.velocity;

  //Draw the shapes
  for (let i = 0; i < this.shapeCount; i++) {
    this.drawShape(i);
  }
};

Leminator.prototype.drawShape = function (index) {
  fill(this.colorScaler.getColor(index));
  const circleDegrees = this.currentPosition - this.trailBy * index;
  const circleSize = this.initalSize + this.sizeScale * index;
  const theta = (circleDegrees * Math.PI) / 180;

  const position = positionOnBernoulli(
    this.centerX,
    this.centerY,
    this.size,
    theta
  );
  circle(position.x, position.y, circleSize);
};
