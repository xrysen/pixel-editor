const setPixel = (x, y, colour) => {
  $(`#${x}-${y}`).css("background-color", colour);
  $(`#prev-${x}-${y}`).css("background-color", colour);
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

const pencil = (x, y, size, colour) => {
  switch (size) {
    case "small":
      setPixel(x, y, colour);
      break;

    case "medium":
      setPixel(x, y, colour);
      setPixel(x + 1, y, colour);
      setPixel(x, y + 1, colour);
      setPixel(x + 1, y + 1, colour);
      break;

    case "large":
      setPixel(x, y, colour);
      setPixel(x + 1, y, colour);
      setPixel(x + 2, y, colour);

      setPixel(x, y + 1, colour);
      setPixel(x + 1, y + 1, colour);
      setPixel(x + 2, y + 1, colour);

      setPixel(x, y + 2, colour);
      setPixel(x + 1, y + 2, colour);
      setPixel(x + 2, y + 2, colour);
      break;
  }
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

const completeFill = (colour) => {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      setPixel(y, x, colour);
    }
  }
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

const drawCircleStamp = (x, y, size, colour) => {
  switch (size) {
    case "large":
      line(x - 2, y - 11, x + 3, y - 11, colour);
      line(x - 4, y - 10, x + 5, y - 10, colour);
      line(x - 6, y - 9, x + 7, y - 9, colour);
      line(x - 7, y - 8, x + 8, y - 8, colour);
      line(x - 8, y - 7, x + 9, y - 7, colour);
      line(x - 8, y - 6, x + 9, y - 6, colour);
      line(x - 9, y - 5, x + 10, y - 5, colour);
      line(x - 9, y - 4, x + 10, y - 4, colour);
      line(x - 10, y - 3, x + 11, y - 3, colour);
      line(x - 10, y - 2, x + 11, y - 2, colour);
      line(x - 10, y - 1, x + 11, y - 1, colour);
      line(x - 10, y, x + 11, y, colour);
      line(x - 10, y + 1, x + 11, y + 1, colour);
      line(x - 10, y + 2, x + 11, y + 2, colour);
      line(x - 9, y + 3, x + 10, y + 3, colour);
      line(x - 9, y + 4, x + 10, y + 4, colour);
      line(x - 8, y + 5, x + 9, y + 5, colour);
      line(x - 8, y + 6, x + 9, y + 6, colour);
      line(x - 7, y + 7, x + 8, y + 7, colour);
      line(x - 6, y + 8, x + 7, y + 8, colour);
      line(x - 4, y + 9, x + 5, y + 9, colour);
      line(x - 2, y + 10, x + 3, y + 10, colour);
      break;

    case "medium":
      line(x - 2, y - 4, x + 1, y - 4, colour);
      line(x - 4, y - 3, x + 3, y - 3, colour);
      line(x - 4, y - 2, x + 3, y - 2, colour);
      line(x - 5, y - 1, x + 4, y - 1, colour);
      line(x - 5, y, x + 4, y, colour);
      line(x - 5, y + 1, x + 4, y + 1, colour);
      line(x - 5, y + 2, x + 4, y + 2, colour);
      line(x - 4, y + 3, x + 3, y + 3, colour);
      line(x - 4, y + 4, x + 3, y + 4, colour);
      line(x - 2, y + 5, x + 1, y + 5, colour);
      break;

    case "small":
      line(x, y - 1, x + 1, y - 1, colour);
      line(x - 1, y, x + 2, y, colour);
      line(x - 1, y + 1, x + 2, y + 1, colour);
      line(x, y + 2, x + 1, y + 2, colour);
      break;
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

    case "small":
      line(x, y - 2, x, y, colour);
      line(x - 2, y - 1, x + 2, y - 1, colour);
      line(x - 1, y - 1, x - 1, y + 1, colour);
      line(x + 1, y - 1, x + 1, y + 1, colour);
      break;
  }
};

const drawHeartStamp = (x, y, size, colour) => {
  switch (size) {
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
};

const drawSelectorBorder = (y, x, id, size) => {
  switch (size) {
    case "small":
      $(`#${y}-${x}`).append(
        `<div id = 'border-top-left-${id}' class = 'cursor-1'></div>`
      );
      break;

    case "medium":
      $(`#${y}-${x}`).append(
        `<div id = "border-top-left-${id}" class = "cursor-top-left"></div>`
      );
      $(`#${y}-${x + 1}`).append(
        `<div id = "border-top-right-${id}" class = "cursor-top-right"></div>`
      );
      $(`#${y + 1}-${x}`).append(
        `<div id = "border-bottom-left-${id}" class = "cursor-bottom-left"></div>`
      );
      $(`#${y + 1}-${x + 1}`).append(
        `<div id = "border-bottom-right-${id}" class = "cursor-bottom-right"></div>`
      );
      break;

    case "large":
      $(`#${y}-${x}`).append(
        `<div id = "border-top-left-${id}" class = "cursor-top-left"></div>`
      );
      $(`#${y}-${x + 1}`).append(
        `<div id = "border-top-mid-${id}" class = "cursor-top-mid"></div>`
      );
      $(`#${y}-${x + 2}`).append(
        `<div id = "border-top-right-${id}" class = "cursor-top-right"></div>`
      );
      $(`#${y + 1}-${x}`).append(
        `<div id = "border-left-${id}" class = "cursor-left"></div>`
      );
      $(`#${y + 2}-${x}`).append(
        `<div id = "border-bottom-left-${id}" class = "cursor-bottom-left"></div>`
      );
      $(`#${y + 2}-${x + 1}`).append(
        `<div id = "border-bottom-mid-${id}" class = "cursor-bottom-mid"></div>`
      );
      $(`#${y + 2}-${x + 2}`).append(
        `<div id = "border-bottom-right-${id}" class = "cursor-bottom-right"></div>`
      );
      $(`#${y + 1}-${x + 2}`).append(
        `<div id = "border-right-${id}" class = "cursor-right"></div>`
      );
  }
};

const removeAllBorders = () => {
  $(`#border-top-left-1`).remove();
  $(`#border-top-right-1`).remove();
  $(`#border-bottom-left-1`).remove();
  $(`#border-bottom-right-1`).remove();
  $(`#border-top-mid-1`).remove();
  $(`#border-bottom-mid-1`).remove();
  $(`#border-left-1`).remove();
  $(`#border-right-1`).remove();

  $(`#border-top-left-2`).remove();
  $(`#border-top-right-2`).remove();
  $(`#border-bottom-left-2`).remove();
  $(`#border-bottom-right-2`).remove();
  $(`#border-top-mid-2`).remove();
  $(`#border-bottom-mid-2`).remove();
  $(`#border-left-2`).remove();
  $(`#border-right-2`).remove();
};