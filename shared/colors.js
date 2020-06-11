function ColorScaler(opts) {
  this.max = opts.max || [255];
  this.min = opts.min || [0];
  this.count = opts.count || 10;
  this.mode = opts.mode || "greyscale";
}

ColorScaler.prototype.getColor = function (index) {
  switch (this.mode) {
    case "greyscale":
      return this.greyscale(index);
    case "rainbow":
      return this.rainbow(index);
  }
};

ColorScaler.prototype.greyscale = function (index) {
  const step = parseInt((this.max[0] - this.min[0]) / this.count);
  const brightness = this.min[0] + step * index;
  return `rgb(${brightness},${brightness},${brightness})`;
};

ColorScaler.prototype.rainbow = function (index) {
  const rainbowColors = [
    '#FF0000',
    '#FF7700',
    '#FFDD00',
    '#00FF00',
    '#0000FF',
    '#8A2BE2',
    '#C77DF3'
  ];

  const colorIndex = index % rainbowColors.length;
  return rainbowColors[colorIndex];
};
