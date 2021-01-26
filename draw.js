let mouseDown = false;
let mouseButton = 1;

let GRID_WIDTH = 32;
let GRID_HEIGHT = 32;

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
      $(`#tr${i}`).append(`<td id=${i}-${j}></td>`).css("background-color", "white");;
    }
  }
};

makeGrid();

const fillPixel = (id, id2, colour) => {
  $(`#${id}-${id2}`).css("background-color", colour);
};

const erasePixel = (id, id2) => {
  $(`#${id}-${id2}`).css("background-color", "white");
};

for (let i = 0; i < GRID_HEIGHT; i++) {
  for (let j = 0; j < GRID_WIDTH; j++) {
    $(`#${i}-${j}`).on("mousedown mouseover", (event) => {
      switch (drawMode) {
        case "draw":
          if (event.type === "mousedown") {
            switch (event.which) {
              case 1:
                fillPixel(i, j, $("#colour-picker").val());
                break;
              case 3:
                erasePixel(i, j);
            }
          }
          if (mouseDown && mouseButton === 1) {
            fillPixel(i, j, $("#colour-picker").val());
          } else if (mouseDown && mouseButton === 3) {
            erasePixel(i, j);
          }
          break;

        case "fill":
          mouseDown = false;
          if (event.type === "mousedown") {
            let currentColor = $(`#${i}-${j}`).css("background-color");
            
            for (let i = 0; i < GRID_HEIGHT; i++) {
              for (let j = 0; j < GRID_WIDTH; j++) {
                if ($(`#${i}-${j}`).css("background-color") === currentColor) {
                  fillPixel(i, j, $("#colour-picker").val());
                }
              }
            }
          }
          break;
      }
    });
  }
}

const removeSelected = (current) => {
  $(current).toggleClass("selected");
}

let drawMode = "draw";

const setMode = (type) => {
  drawMode = type;
  console.log("Mode is now: " + drawMode);
};

$("#draw").toggleClass("selected");

$("#draw").on("click", () => {
  setMode("draw");
  $("#draw").toggleClass("selected");
  removeSelected("#fill");
});



$("#fill").on("click", () => {
  setMode("fill");
  $("#fill").toggleClass("selected");
  removeSelected("#draw");
});

$("#export").on("click", () => {
  $("table").css("border", "none");
  $("tr").css("border", "none");
  $("td").css("border","none");
  $('.canvas').tableExport({fileName: "image", type: "png"});
  $("table").css("border", "1px solid black");
  $("tr").css("border", "1px solid black");
  $("td").css("border","1px solid black");
})

$("#reset").on("click", () => {
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      fillPixel(i,j,"white");
    }
  }
})