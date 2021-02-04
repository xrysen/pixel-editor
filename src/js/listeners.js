$(document)
  .on("mousedown", (event) => {
    switch (event.which) {
      case 1:
        mouseButton = 1;
        break;
      case 3:
        mouseButton = 3;
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

const addUnselectedToAll = () => {
  $("#draw").addClass("unselected");
  $("#fill").addClass("unselected");
  $("#picker").addClass("unselected");
  $("#line").addClass("unselected");
  $("#square").addClass("unselected");
  $("#circle").addClass("unselected");
  $("#circle-stamp").addClass("unselected");
};

$("#draw").addClass("selected");

$("#draw").on("click", () => {
  setMode("draw");
  addUnselectedToAll();
  $("#draw").removeClass("unselected");
});

$("#fill").on("click", () => {
  setMode("fill");
  addUnselectedToAll();
  $("#fill").removeClass("unselected");
});

$("#picker").on("click", () => {
  addUnselectedToAll();
  setMode("picker");
  $("#picker").removeClass("unselected");
});

$("#line").on("click", () => {
  addUnselectedToAll();
  setMode("line");
  $("#line").removeClass("unselected");
});

$("#square").on("click", () => {
  addUnselectedToAll();
  setMode("square");
  $("#square").removeClass("unselected");
});

$("#circle").on("click", () => {
  addUnselectedToAll();
  setMode("circle");
  $("#circle").removeClass("unselected");
});

$("#circle-stamp").on("click", () => {
  addUnselectedToAll();
  setMode("circle-stamp");
  $("#circle-stamp").removeClass("unselected");
})

$("#palette-icon").on("click", () => {
  addUnselectedToAll();
  $("#palette-icon").toggleClass("unselected");
  $("#choose-palette").slideToggle();
})

for (let i = 0; i < palettes.length; i++) {
  $(`#palette-${i}`).on("click", () => {
    generatePalette(palettes[i]);
    $('#choose-palette').slideToggle();
    $(".colour-selector").remove();
    $(`#colour-0`).append("<div class = 'colour-selector'></div>");
    setSelectedColour(0);
  })
}

$("#undo").on("click", () => {
  undo();
});

$("#test").on("click", () => {
  drawCircleStamp(16, 16, 10, selectedColour);
})

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
  drawCircleOutline(16, 16, 4, $("#colour-picker").val());
});
