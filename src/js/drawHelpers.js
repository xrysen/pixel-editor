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

const drawSquareOutline = (x1, y1, x2, y2, colour) => {
  line(x1, y1, x2, y1, colour); // Right
  line(x2, y1, x2, y2, colour); // Down
  line(x2, y2, x1, y2, colour); // Left
  line(x1, y2, x1, y1, colour); // Up
};

const drawCircleOutline = (xCentre, yCentre, radius, colour) => {
  let x = radius;
  let y = 0;
  let radiusError = 1 - x;

  while (x >= y) {
    setPixel(y + yCentre, x + xCentre, colour);
    setPixel(y + yCentre, -x + xCentre, colour);
    setPixel(x + yCentre, y + xCentre, colour);
    setPixel(x + yCentre, -y + xCentre, colour);
    setPixel(-y + yCentre, -x + xCentre, colour);
    setPixel(-y + yCentre, x + xCentre, colour);
    setPixel(-x + yCentre, -y + xCentre, colour);
    setPixel(-x + yCentre, y + xCentre, colour);
    y++;

    if (radiusError < 0) {
      radiusError += 2 * y + 1;
    } else {
      x--;
      radiusError += 2 * (y - x + 1);
    }
  }
};

const drawCircleStamp = (xCentre, yCentre, radius, colour) => {
  let x = radius;
  let y = 0;
  let radiusError = 1 - x;

  while (x >= y) {
    line(x + xCentre, y + yCentre, -x + xCentre, y + yCentre, colour);
    line(y + xCentre, x + yCentre, -y + xCentre, x + yCentre, colour);
    line(-x + xCentre, -y + yCentre, x + xCentre, -y + yCentre, colour);
    line(x + xCentre, -y + yCentre, x + xCentre, -y + yCentre, colour);
    line(-y + xCentre, -x + yCentre, y + xCentre, -x + yCentre, colour);
    y++;

    if (radiusError < 0) {
      radiusError += 2 * y + 1;
    } else {
      x--;
      radiusError += 2 * (y - x + 1);
    }
  }
};

const drawStar = (x, y, size, colour) => {
  switch (size) {
    case "large":
      setPixel(y - 7, x, colour);
      setPixel(y - 8, x, colour);
      line(x - 1, y - 6, x + 1, y - 6, colour);
      line(x - 1, y - 5, x + 1, y - 5, colour);
      line(x - 2, y - 4, x + 2, y - 4, colour);
      line(x - 2, y - 3, x + 2, y - 3, colour);
      line(x - 3, y - 2, x + 3, y - 2, colour);
      line(x - 10, y - 1, x + 10, y - 1, colour);
      line(x - 9, y, x + 9, y, colour);
      line(x - 8, y + 1, x + 8, y + 1, colour);
      line(x - 7, y + 2, x + 7, y + 2, colour);
      line(x - 6, y + 3, x + 6, y + 3, colour);
      line(x - 5, y + 4, x + 5, y + 4, colour);
      line(x - 5, y + 5, x + 5, y + 5, colour);
      line(x - 5, y + 6, x + 5, y + 6, colour);
      line(x - 6, y + 7, x + 6, y + 7, colour);
      line(x - 6, y + 8, x + 6, y + 8, colour);
      line(x - 7, y + 9, x - 1, y + 9, colour);
      line(x + 1, y + 9, x + 7, y + 9, colour);
      line(x - 7, y + 10, x - 3, y + 10, colour);
      line(x + 3, y + 10, x + 7, y + 10, colour);
      line(x - 8, y + 11, x - 5, y + 11, colour);
      line(x + 5, y + 11, x + 8, y + 11, colour);
      line(x - 8, y + 12, x - 7, y + 12, colour);
      line(x + 7, y + 12, x + 8, y + 12, colour);
      break;

    case "medium":
      line(x, y - 4, x, y + 2, colour);
      line(x - 1, y - 2, x + 1, y - 2, colour);
      line(x - 5, y - 1, x + 5, y - 1, colour);
      line(x - 4, y, x + 4, y, colour);
      line(x - 3, y + 1, x + 3, y + 1, colour);
      line(x - 2, y + 2, x + 2, y + 2, colour);
      line(x - 3, y + 3, x - 1, y + 3, colour);
      line(x + 1, y + 3, x + 3, y + 3, colour);
      line(x - 3, y + 4, x - 2, y + 4, colour);
      line(x + 2, y + 4, x + 3, y + 4, colour);
      line(x - 4, y + 5, x - 3, y + 5, colour);
      line(x + 3, y + 5, x + 4, y + 5, colour);
      break;
  }
  
}

const drawHeartStamp = (x, y, size, colour) => {
  switch(size) {
    case "large":
      line(x - 11, y - 5, x - 11, y, colour);
      line(x - 10, y - 7, x - 10, y + 2, colour);
      line(x - 9, y - 8, x - 9, y + 3, colour);
      line(x - 8, y - 9, x - 8, y + 4, colour);
      line(x - 7, y - 9, x - 7, y + 5, colour);
      line(x - 6, y - 9, x - 6, y + 6, colour);
      line(x - 5, y - 9, x - 5, y + 7, colour);
      line(x - 4, y - 9, x - 4, y + 8, colour);
      line(x - 3, y - 8, x - 3, y + 9, colour);
      line(x - 2, y - 7, x - 2, y + 9, colour);
      line(x - 1, y - 6, x - 1, y + 10, colour);
      line(x, y - 5, x, y + 11, colour);
      line(x + 1, y - 6, x + 1, y + 10, colour);
      line(x + 2, y - 7, x + 2, y + 9, colour);
      line(x + 3, y - 8, x + 3, y + 9, colour);
      line(x + 4, y - 9, x + 4, y + 8, colour);
      line(x + 5, y - 9, x + 5, y + 7, colour);
      line(x + 6, y - 9, x + 6, y + 6, colour);
      line(x + 7, y - 9, x + 7, y + 5, colour);
      line(x + 8, y - 9, x + 8, y + 4, colour);
      line(x + 9, y - 8, x + 9, y + 3, colour);
      line(x + 10, y - 7, x + 10, y + 2, colour);
      line(x + 11, y - 5, x + 11, y, colour);
      break;

      case "medium":
        line(x - 5, y - 3, x - 5, y, colour);
        line(x - 4, y - 4, x - 4, y + 1, colour);
        line(x - 3, y - 4, x - 3, y + 2, colour);
        line(x - 2, y - 4, x - 2, y + 3, colour);
        line(x - 1, y - 3, x - 1, y + 3, colour);
        line(x, y - 2, x, y + 4, colour);
        line(x + 1, y - 3, x + 1, y + 3, colour);
        line(x + 2, y - 4, x + 2, y + 3, colour);
        line(x + 3, y - 4, x + 3, y + 2, colour);
        line(x + 4, y - 4, x + 4, y + 1, colour);
        line(x + 5, y - 3, x + 5, y, colour);
        break;
      
      case "small":
        line(x - 2, y - 2, x - 2, y, colour);
        line(x - 1, y - 2, x - 1, y + 1, colour);
        line(x, y - 1, x, y + 2, colour);
        line(x + 1, y - 2, x + 1, y + 1, colour);
        line(x + 2, y - 2, x + 2, y, colour);
        break;
  }
}