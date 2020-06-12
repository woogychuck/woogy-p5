function ColorScaler(opts) {
  this.max = opts.max || [255];
  this.min = opts.min || [0];
  this.count = opts.count || 10;
  this.mode = opts.mode || "greyscale";
  this.index = 0;
}

ColorScaler.prototype.getColor = function (alpha) {
  let result;
  alpha = alpha ? alpha : 1;
  switch (this.mode) {
    case "greyscale":
      result = this.greyscale(this.index, alpha);
    case "rainbow":
      result = this.rainbow(this.index, alpha);
  }

  this.index++;
  if(this.index == this.count){
    this.index = 0;
  }

  return result;
};

ColorScaler.prototype.greyscale = function (index,alpha) {
  const step = parseInt((this.max[0] - this.min[0]) / this.count);
  const brightness = this.min[0] + step * index;
  return `rgb(${brightness},${brightness},${brightness},${alpha})`;
};

ColorScaler.prototype.rainbow = function (index, alpha) {
  //ALPHA SUPPORT LACKING
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


function ColorRandomizer(mode){
  this.mode = mode || 'chaos';
}

ColorRandomizer.prototype.getColor = function(alpha){
  alpha = alpha ? alpha : 1;
  switch(this.mode){
    case 'chaos':
      return this.chaos(alpha);
    case 'jungle':
      return this.jungle(alpha);
    case 'water':
      return this.water(alpha);
    case 'fire':
      return this.fire(alpha);
    default:
      return this.chaos(alpha);
  }
}

ColorRandomizer.prototype.chaos = function(alpha){
  const r = parseInt(random(0,256));
  const g = parseInt(random(0,256));
  const b = parseInt(random(0,256));

  return `rgba(${r},${g},${b},${alpha})`;
}

ColorRandomizer.prototype.jungle = function(alpha){
  const r = 0;
  const g = parseInt(random(100,256));
  const b = parseInt(random(0,90));

  return `rgba(${r},${g},${b},${alpha})`;
}

ColorRandomizer.prototype.water = function(alpha){
  const r = 0;
  const g = parseInt(random(10,100));
  const b = parseInt(random(0,255));

  return `rgba(${r},${g},${b},${alpha})`;
}

ColorRandomizer.prototype.fire = function(alpha){
  const r = parseInt(random(225,265));
  const g = parseInt(random(0,265));
  const b = 0;

  return `rgba(${r},${g},${b},${alpha})`;
}