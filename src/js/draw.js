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

const moveDesign = (xOffset, yOffset) => {
  for (const pixel of snapShot) {
    setPixel(pixel.y + yOffset, pixel.x + xOffset, pixel.colour);
  }
  snapShot = [];
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
      $(`#${i}-${j}`).on("mouseleave", () => {
        removeAllBorders();
      });
      $(`#${i}-${j}`).on("mousedown mouseover mousemove", (event) => {
        switch (drawMode) {
          case "draw":
            if (!$(`#border-top-left-1`).length) {
              drawSelectorBorder(i, j, "1", selectedSize);
            }

            if (event.type === "mousedown") {
              takeSnapshot();
              switch (event.which) {
                case 1:
                  pencil(i, j, selectedSize, selectedColour);
                  break;
                case 3:
                  erasePixel(i, j);
              }
            }
            if (mouseDown && mouseButton === 1) {
              pencil(i, j, selectedSize, selectedColour);
            } else if (mouseDown && mouseButton === 3) {
              erasePixel(i, j);
            }
            break;

          case "mirror":
            let x1 = j - 16;
            let offset = 15;
            switch (selectedSize) {
              case "small":
                offset = 15;
                break;
              case "medium":
                offset = 14;
                break;
              case "large":
                offset = 13;
                break;
            }
            if (!$(`#border-top-left-1`).length && j !== 15) {
              drawSelectorBorder(i, j, "1", selectedSize);
              drawSelectorBorder(i, offset - x1, "2", selectedSize);
            }
            if (event.type === "mousedown") {
              takeSnapshot();
              switch (event.which) {
                case 1:
                  pencil(i, j, selectedSize, selectedColour);
                  pencil(i, offset - x1, selectedSize, selectedColour);
                  break;
                case 3:
                  erasePixel(i, j);
                  erasePixel(i, offset - x1);
                  break;
              }
            }
            if (mouseDown && mouseButton === 1) {
              pencil(i, j, selectedSize, selectedColour);
              pencil(i, offset - x1, selectedSize, selectedColour);
            } else if (mouseDown && mouseButton === 3) {
              erasePixel(i, j);
              erasePixel(i, offset - x1);
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
              selectedColour = convertRGBtoHex(
                Number(currentColor[0]),
                Number(currentColor[1]),
                Number(currentColor[2])
              );
            }
            break;

          case "line":
            if (!$(`#border-top-left-1`).length) {
              $(`#${i}-${j}`).append(
                `<div id = 'border-top-left-1' class = 'cursor-1'></div>`
              );
            }
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
            if (!$(`#border-top-left-1`).length) {
              $(`#${i}-${j}`).append(
                `<div id = 'border-top-left-1' class = 'cursor-1'></div>`
              );
            }
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
            if (!$(`#border-top-left-1`).length && event.type === "mouseover") {
              $(`#${i}-${j}`).append(
                `<div id = 'border-top-left-1' class = 'cursor-1'></div>`
              );
            }
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
            } else if (event.type === "mousedown") {
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

          case "complete-fill":
            if (event.type === "mousedown") {
              takeSnapshot();
              completeFill(selectedColour);
            }
            break;

          case "move":
            if (event.type === "mousedown") { 
              mouseY = i;
              mouseX = j;
            }
            console.log(mouseY);
            takeSnapshot();
            $(`#${i}-${j}`).on("mouseout", () => {
              if (mouseDown && mouseButton === 1) {
                if (i > mouseY) {
                  moveDesign(0, 1);
                  mouseY = i;
                }
                if (i < mouseY) {
                  moveDesign(0, -1);
                  mouseY = i;
                }
                if ( j > mouseX) {
                  moveDesign(1, 0);
                  mouseX = j;
                }
                if (j < mouseX) {
                  moveDesign(-1, 0);
                  mouseX = j;
                }
              }
            });
            $(`#${i}-${j}`).on("mouseup", () => {
             return;
            })
            break;
        }
      });
    }
  }
});
