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


const takeSnapshot = () => {
  snapShot = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      snapShot.push({
        x: x,
        y: y,
        colour: $(`#${y}-${x}`).css("background-color"),
      });
    }
  }
};

const undo = () => {
  for (const block of snapShot) {
    setPixel(block.y, block.x, block.colour);
  }
  snapShot = [];
  lineChoosingPoints = true;
  lineStartingPoint = [];
};

$(() => {
  
  makeGrid();
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      $(`#${i}-${j}`).on("mousedown mouseover", (event) => {
        switch (drawMode) {
          case "draw":
            if (event.type === "mousedown") {
              takeSnapshot();
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
              takeSnapshot();
              let currentColor = getPixel(i, j);
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
  
          case "line":
            if (event.type === "mousedown" && lineChoosingPoints) {
              takeSnapshot();
              lineStartingPoint[0] = j;
              lineStartingPoint[1] = i;
              setPixel(i, j, $("#colour-picker").val());
              lineChoosingPoints = false;
            } else if (event.type === "mousedown" && !lineChoosingPoints) {
              line(lineStartingPoint[0], lineStartingPoint[1], j, i, $("#colour-picker").val());
              lineStartingPoint = [];
              lineChoosingPoints = true;
            } else if (event.type === "mouseover" && !lineChoosingPoints) {
              for (const block of snapShot) {
                setPixel(block.y, block.x, block.colour);
              }
              line(lineStartingPoint[0], lineStartingPoint[1], j, i, $("#colour-picker").val());
            }
            break;
        }
      });
    }
  }
})



