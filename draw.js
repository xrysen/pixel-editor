let mouseDown = false;
let mouseButton = 1;

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
  for (let i = 0; i < 32; i++) {
    $(".canvas").append(`<tr id=tr${i}></tr>`);
  }

  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      $(`#tr${i}`).append(`<td id=${i}-${j}></td>`).css("background-color", "white");;
    }
  }
};

makeGrid();

const fillPixel = (id, id2) => {
  $(`#${id}-${id2}`).css("background-color", $("#colour-picker").val());
};

const erasePixel = (id, id2) => {
  $(`#${id}-${id2}`).css("background-color", "white");
};

for (let i = 0; i < 32; i++) {
  for (let j = 0; j < 32; j++) {
    $(`#${i}-${j}`).on("mousedown mouseover", (event) => {
      switch (drawMode) {
        case "draw":
          if (event.type === "mousedown") {
            switch (event.which) {
              case 1:
                fillPixel(i, j);
                break;
              case 3:
                erasePixel(i, j);
            }
          }
          if (mouseDown && mouseButton === 1) {
            fillPixel(i, j);
          } else if (mouseDown && mouseButton === 3) {
            erasePixel(i, j);
          }
          break;

        case "fill":
          mouseDown = false;
          if (event.type === "mousedown") {
            let currentColor = $(`#${i}-${j}`).css("background-color");
            console.log(currentColor);
            for (let i = 0; i < 32; i++) {
              for (let j = 0; j < 32; j++) {
                if ($(`#${i}-${j}`).css("background-color") === currentColor) {
                  fillPixel(i, j);
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