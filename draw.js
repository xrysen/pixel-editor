let mouseDown = false;
let mouseButton = 1;

let GRID_WIDTH = 32;
let GRID_HEIGHT = 32;

let snapShot = [];

$(document)
  .on("mousedown", (event) => {
    switch (event.which) {
      case 1:
        mouseButton = 1;
        console.log("Left click");
        break;
      case 3:
        mouseButton = 3;
        console.log("Right click");
        break;
    }
    mouseDown = true;
  })
  .on("mouseup", () => {
    mouseDown = false;
    mouseButton = 0;
  });

const makeGrid = () => {
  for (let i = 0; i < GRID_HEIGHT; i++) {
    $(".canvas").append(`<tr id=tr${i}></tr>`);
  }

  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      $(`#tr${i}`)
        .append(`<td id=${i}-${j}></td>`)
        .css("background-color", "white");
    }
  }
};

makeGrid();

const takeSnapshot = () => {
  snapShot = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      snapShot.push({ x: x, y: y, colour: $(`#${y}-${x}`).css("background-color")});
    }
  }
}

const undo = () => {
  for (const block of snapShot) {
    setPixel(block.y, block.x, block.colour);
  }
  snapShot = [];
}

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

for (let i = 0; i < GRID_HEIGHT; i++) {
  for (let j = 0; j < GRID_WIDTH; j++) {
    $(`#${i}-${j}`).on("mousedown mouseover", (event) => {
      switch (drawMode) {
        case "draw":
          if (event.type === "mousedown") {
            takeSnapshot();
            console.log(snapShot);
            switch (event.which) {
              case 1:
                setPixel(i, j, $("#colour-picker").val());
                break;
              case 3:
                erasePixel(i, j);
            }
          }
          if (mouseDown && mouseButton === 1) {
            setPixel(i, j, $("#colour-picker").val());
          } else if (mouseDown && mouseButton === 3) {
            erasePixel(i, j);
          }
          break;

        case "fill":
          mouseDown = false;
          if (event.type === "mousedown") {
            let currentColor = getPixel(i, j);
            // for (let i = 0; i < GRID_HEIGHT; i++) {
            //   for (let j = 0; j < GRID_WIDTH; j++) {
            //     if ($(`#${i}-${j}`).css("background-color") === currentColor) {
            //       setPixel(i, j, $("#colour-picker").val());
            //     }
            //   }
            // }
            floodFill(i, j, currentColor, $("#colour-picker").val());
          }
          break;

        case "picker":
          mouseDown = false;
          let currentColor = getRGBValues(getPixel(i, j));
          if (event.type === "mousedown") {
            $("#colour-picker").val(
              convertRGBtoHex(
                Number(currentColor[0]),
                Number(currentColor[1]),
                Number(currentColor[2])
              )
            );
          }
          break;
      }
    });
  }
}

const removeSelected = (current) => {
  $(current).toggleClass("selected");
};

let drawMode = "draw";

const setMode = (type) => {
  drawMode = type;
  console.log("Mode is now: " + drawMode);
};

const removeSelectedFromAll = () => {
  $("#draw").removeClass("selected");
  $("#fill").removeClass("selected");
  $("#picker").removeClass("selected");
};

$("#draw").addClass("selected");

$("#draw").on("click", () => {
  setMode("draw");
  removeSelectedFromAll();
  $("#draw").addClass("selected");
});

$("#fill").on("click", () => {
  setMode("fill");
  removeSelectedFromAll();
  $("#fill").addClass("selected");
});

$("#picker").on("click", () => {
  removeSelectedFromAll();
  setMode("picker");
  $("#picker").addClass("selected");
});

$("#undo").on("click", () => {
  undo();
});

$("#export").on("click", () => {
  $("table").css("border", "none");
  $("tr").css("border", "none");
  $("td").css("border", "none");
  $(".canvas").tableExport({ fileName: "image", type: "png" });
  $("table").css("border", "1px solid black");
  $("tr").css("border", "1px solid black");
  $("td").css("border", "1px solid black");
});

$("#reset").on("click", () => {
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      setPixel(i, j, "white");
    }
  }
});

let grid = "on";

$("#toggle-grid").on("click", () => {
  if (grid === "on") {
    $("table").css("border", "1px solid transparent");
    $("tr").css("border", "1px solid transparent");
    $("td").css("border", "1px solid transparent");
    grid = "off";
  } else {
    $("table").css("border", "1px solid black");
    $("tr").css("border", "1px solid black");
    $("td").css("border", "1px solid black");
    grid = "on";
  }
});
