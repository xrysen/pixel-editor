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

$(document).keypress("z", (e) => {
  if (e.ctrlKey) {
    undo();
  }
});

const removeSelected = (current) => {
  $(current).toggleClass("selected");
};



const setMode = (type) => {
  drawMode = type;
  console.log("Mode is now: " + drawMode);
};

const removeSelectedFromAll = () => {
  $("#draw").removeClass("selected");
  $("#fill").removeClass("selected");
  $("#picker").removeClass("selected");
  $("#line").removeClass("selected");
  $("#square").removeClass("selected");
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

$("#line").on("click", () => {
  removeSelectedFromAll();
  setMode("line");
  $("#line").addClass("selected");
});

$("#square").on("click", () => {
  removeSelectedFromAll();
  setMode("square");
  $("#square").addClass("selected");
})

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
  $("#reset-confirm").css("display", "block");
});

$("#reset-no").on("click", () => {
  $("#reset-confirm").css("display", "none");
});

$("#reset-yes").on("click", () => {
  $("#reset-confirm").css("display", "none");
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      setPixel(i, j, "white");
    }
  }
});

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

$("#test").on("click", () => {
  drawCircleOutline(16, 16, 12, $("#colour-picker").val());
})
