const NUM_COLORS = 256

// define arrays to help us with definition of RGB color shades later
const inclist = [...range(1, NUM_COLORS, 1)]
const declist = [...range(NUM_COLORS, 1, -1)]
const lowercolor = [...range(1, NUM_COLORS, 1)].fill(0)
const uppercolor = [...range(1, NUM_COLORS, 1)].fill(NUM_COLORS - 1)
// define arrays of red, green, blue
// color order is blue shades, then green shades then red shades
// use .slice() to make sure we are copying original array
const red = uppercolor.slice(); red.push(...declist.slice()); red.push(...lowercolor.slice()); red.push(...lowercolor.slice()); red.reverse()
const green = inclist.slice(); green.push(...uppercolor.slice()); green.push(...uppercolor.slice()); green.push(...declist.slice()); green.reverse()
const blue = lowercolor.slice(); blue.push(...lowercolor.slice()); blue.push(...inclist.slice()); blue.push(...uppercolor.slice()); blue.reverse()

// function to calculate color in range
function frac2color(frac, min, max) {
  var base = (max - min);

  if (base == 0) { frac = 1; }
  else {
      frac = (frac - min) / base;
  }
  var r, g, b, idx = 0;

  if (frac <= 1 && frac >= 0){
      // get closest index
      idx = Math.max(parseInt(frac * red.length), 0);
  } else if (frac < 0){
      idx = 1;
  } else if (frac > 1){
      idx = red.length - 1;
  }
  // select RGB integer from our lists of RGBs based on fraction
  r = red[idx];
  g = green[idx];
  b = blue[idx];

  // make HEX
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}


// equivalent to python range function
function* range(start=0, end=undefined, step=1) {    
  if( arguments.length === 1) {end = start, start = 0}    

  [...arguments].forEach(arg => {    
  if( typeof arg !== 'number') {throw new TypeError("Invalid argument")}                              
  })    
  if( arguments.length === 0) {throw new TypeError("range requires at least 1 argument, got 0")}    

  if(start >= end && step > 0) return
  if(end >= start && step < 0) return
  yield start    
  yield* range(parseInt(start + step), end, step)    
}

export {frac2color}