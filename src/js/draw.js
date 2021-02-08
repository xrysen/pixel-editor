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
  $("#draw").removeClass("unselected");
  sizeTools("draw");
  makeGrid();
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      $(`#${i}-${j}`).on("mousedown mouseover mousemove", (event) => {
        console.log(j, i);
        switch (drawMode) {
          case "draw":
            if (event.type === "mousedown") {
              takeSnapshot();
              switch (event.which) {
                case 1:
                  setPixel(i, j, selectedColour);
                  break;
                case 3:
                  erasePixel(i, j);
              }
            }
            if (mouseDown && mouseButton === 1) {
              setPixel(i, j, selectedColour);
            } else if (mouseDown && mouseButton === 3) {
              erasePixel(i, j);
            }
            break;

          case "fill":
            mouseDown = false;
            if (event.type === "mousedown") {
              takeSnapshot();
              let currentColor = getPixel(i, j);
              floodFill(i, j, currentColor, selectedColour);
            }
            break;

          case "picker":
            mouseDown = false;
            let currentColor = getRGBValues(getPixel(i, j));
            if (event.type === "mousedown") {
              selectedColour = 
                convertRGBtoHex(
                  Number(currentColor[0]),
                  Number(currentColor[1]),
                  Number(currentColor[2])
                );
            }
            break;

          case "line":
            if (event.type === "mousedown" && lineChoosingPoints) {
              takeSnapshot();
              lineStartingPoint[0] = j;
              lineStartingPoint[1] = i;
              setPixel(i, j, selectedColour);
              lineChoosingPoints = false;
            } else if (event.type === "mousedown" && !lineChoosingPoints) {
              line(
                lineStartingPoint[0],
                lineStartingPoint[1],
                j,
                i,
                selectedColour
              );
              lineStartingPoint = [];
              lineChoosingPoints = true;
            } else if (event.type === "mouseover" && !lineChoosingPoints) {
              for (const block of snapShot) {
                setPixel(block.y, block.x, block.colour);
              }
              line(
                lineStartingPoint[0],
                lineStartingPoint[1],
                j,
                i,
                selectedColour
              );
            }
            break;

          case "square":
            if (event.type === "mousedown" && lineChoosingPoints) {
              takeSnapshot();
              lineStartingPoint[0] = j;
              lineStartingPoint[1] = i;
              setPixel(i, j, selectedColour);
              lineChoosingPoints = false;
            } else if (event.type === "mousedown" && !lineChoosingPoints) {
              drawSquareOutline(
                lineStartingPoint[0],
                lineStartingPoint[1],
                j,
                i,
                selectedColour
              );
              lineStartingPoint = [];
              lineChoosingPoints = true;
            } else if (event.type === "mouseover" && !lineChoosingPoints) {
              for (const block of snapShot) {
                setPixel(block.y, block.x, block.colour);
              }
              drawSquareOutline(
                lineStartingPoint[0],
                lineStartingPoint[1],
                j,
                i,
                selectedColour
              );
            }
            break;

          case "circle":
            if (event.type === "mousedown" && lineChoosingPoints) {
              mouseY = event.clientY;
              takeSnapshot();
              setPixel(i, j, selectedColour);
              lineStartingPoint[0] = j;
              lineStartingPoint[1] = i;
              lineChoosingPoints = false;
            } else if (event.type === "mousedown" && !lineChoosingPoints) {
              drawCircleOutline(
                lineStartingPoint[0],
                lineStartingPoint[1],
                circleRadius,
                selectedColour
              );
              lineStartingPoint = [];
              lineChoosingPoints = true;
              circleRadius = 0;
            } else if (event.type === "mouseover" && !lineChoosingPoints) {
              for (const block of snapShot) {
                setPixel(block.y, block.x, block.colour);
              }

              if (event.clientY > mouseY) {
                circleRadius += 1;
                mouseY = event.clientY;
              } else {
                circleRadius -= 1;
                mouseY = event.clientY;
              }

              drawCircleOutline(
                lineStartingPoint[0],
                lineStartingPoint[1],
                circleRadius,
                selectedColour
              );
            }
            break;

            case "circle-stamp":
              if (event.type === "mouseover") {
                if (!placingStamp) {
                  takeSnapshot();
                  placingStamp = true;
                }
                for (const block of snapShot) {
                  setPixel(block.y, block.x, block.colour);
                }
                drawCircleStamp(j, i, selectedSize, selectedColour);
              } else if (event.type === "mousedown") {
                takeSnapshot();
                drawCircleStamp(j, i, selectedSize, selectedColour);
                placingStamp = false;
              }
              break;

              case "star-stamp":
                if (event.type === "mouseover") {
                  if (!placingStamp) {
                    takeSnapshot();
                    placingStamp = true;
                  }
                  for (const block of snapShot) {
                    setPixel(block.y, block.x, block.colour);
                  }
                  drawStar(j, i, selectedSize, selectedColour);
                } else if(event.type === "mousedown") {
                  takeSnapshot();
                  drawStar(j, i, selectedSize, selectedColour);
                  placingStamp = false;
                }
                break;

              case "heart-stamp":
                if (event.type === "mouseover") {
                  if (!placingStamp) {
                    takeSnapshot();
                    placingStamp = true;
                  }
                  for (const block of snapShot) {
                    setPixel(block.y, block.x, block.colour);
                  }
                  drawHeartStamp(j, i, selectedSize, selectedColour);
                } else if (event.type === "mousedown") {
                  takeSnapshot();
                  drawHeartStamp(j, i, selectedSize, selectedColour);
                  placingStamp = false;
                }
                break;
        }
      });
    }
  }
});
