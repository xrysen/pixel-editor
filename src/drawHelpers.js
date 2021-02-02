const setPixel = (x, y, colour) => {
  $(`#${x}-${y}`).css("background-color", colour);
};

const getPixel = (x, y) => {
  return $(`#${x}-${y}`).css("background-color");
};

const erasePixel = (id, id2) => {
  $(`#${id}-${id2}`).css("background-color", "white");
};

// Converts the string returned from .css background-colour to an array of values

const getRGBValues = (rgba) => {
  let result = [];
  let str = rgba.replace("rgba(", "");
  str = str.replace("rgb(", "");
  str = str.replace(")", "");
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ",") result.push(str[i]);
  }
  return result.join("").split(" ");
};

// Converts rgb numbers to a hex number to use for colour picker

const convertRGBtoHex = (r, g, b) => {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return `#${r}${g}${b}`;
};

const floodFill = (x, y, orgColour, newColour) => {
  if (x < 0 || x > GRID_WIDTH - 1 || y < 0 || y > GRID_HEIGHT - 1) return;
  if (getPixel(x, y) !== orgColour) return;

  setPixel(x, y, newColour);
  floodFill(x - 1, y - 1, orgColour, newColour);
  floodFill(x - 1, y, orgColour, newColour);
  floodFill(x - 1, y + 1, orgColour, newColour);
  floodFill(x, y - 1, orgColour, newColour);
  floodFill(x, y + 1, orgColour, newColour);
  floodFill(x + 1, y - 1, orgColour, newColour);
  floodFill(x + 1, y, orgColour, newColour);
  floodFill(x + 1, y + 1, orgColour, newColour);
};

const line = (x1, y1, x2, y2, colour) => {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    setPixel(y1, x1, colour);
    if (x1 === x2 && y1 === y2) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
};