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

const sizeTools = (type) => {
  let icon = [];

  switch (type) {
    case "draw":
      icon[0] =
        "<i class='fas fa-pencil-alt' style='font-size: 20px; padding-top: 20px'></i>";
      icon[1] =
        "<i class='fas fa-pencil-alt' style='font-size: 30px; padding-top: 18px'></i>";
      icon[2] =
        "<i class='fas fa-pencil-alt' style='font-size: 40px; padding-top: 12px'></i>";
      break;

    case "circle-stamp":
      icon[0] =
        "<i class='fas fa-circle' style='font-size: 20px; padding-top: 20px'></i>";
      icon[1] =
        "<i class='fas fa-circle' style='font-size: 30px; padding-top: 18px'></i>";
      icon[2] =
        "<i class='fas fa-circle' style='font-size: 40px; padding-top: 12px'></i>";
      break;

    case "star-stamp":
      icon[0] =
        "<i class='fas fa-star' style='font-size: 20px; padding-top: 20px'></i>";
      icon[1] =
        "<i class='fas fa-star' style='font-size: 30px; padding-top: 18px'></i>";
      icon[2] =
        "<i class='fas fa-star' style='font-size: 40px; padding-top: 12px'></i>";
      break;

    case "heart-stamp":
      icon[0] =
        "<i class='fas fa-heart' style='font-size: 20px; padding-top: 20px'></i>";
      icon[1] =
        "<i class='fas fa-heart' style='font-size: 30px; padding-top: 18px'></i>";
      icon[2] =
        "<i class='fas fa-heart' style='font-size: 40px; padding-top: 12px'></i>";
      break;
  }

  $(".size-selector").append(
    `<div id = 'size-small' class = "size-selectors  size-selected">${icon[0]}</div>`
  );
  $(".size-selector").append(
    `<div id='size-medium' class = "size-selectors"'>${icon[1]}</div>`
  );
  $(".size-selector").append(
    `<div id='size-large' class = "size-selectors "'>${icon[2]}</div`
  );

  $("#size-small").on("click", () => {
    removeSizeSelected();
    selectedSize = "small";
    $("#size-small").addClass("size-selected");
  });

  $("#size-medium").on("click", () => {
    removeSizeSelected();
    selectedSize = "medium";
    $("#size-medium").addClass("size-selected");
  });

  $("#size-large").on("click", () => {
    removeSizeSelected();
    selectedSize = "large";
    $("#size-large").addClass("size-selected");
  });
};

const removeSizeTools = () => {
  $("#size-small").remove();
  $("#size-medium").remove();
  $("#size-large").remove();
};

const addUnselectedToAll = () => {
  $("#draw").addClass("unselected");
  $("#fill").addClass("unselected");
  $("#picker").addClass("unselected");
  $("#line").addClass("unselected");
  $("#square").addClass("unselected");
  $("#circle").addClass("unselected");
  $("#circle-stamp").addClass("unselected");
  $("#star-stamp").addClass("unselected");
  $("#heart-stamp").addClass("unselected");
  selectedSize = "small";
};

const removeSizeSelected = () => {
  $("#size-small").removeClass("size-selected");
  $("#size-medium").removeClass("size-selected");
  $("#size-large").removeClass("size-selected");
  selectedSize = "small";
};

$("#draw").addClass("selected");

$("#draw").on("click", () => {
  removeSizeTools();
  setMode("draw");
  sizeTools("draw");
  addUnselectedToAll();
  $("#draw").removeClass("unselected");
});

$("#fill").on("click", () => {
  removeSizeTools();
  setMode("fill");
  addUnselectedToAll();
  $("#fill").removeClass("unselected");
});

$("#picker").on("click", () => {
  removeSizeTools();
  addUnselectedToAll();
  setMode("picker");
  $("#picker").removeClass("unselected");
});

$("#line").on("click", () => {
  removeSizeTools();
  addUnselectedToAll();
  setMode("line");
  $("#line").removeClass("unselected");
});

$("#square").on("click", () => {
  removeSizeTools();
  addUnselectedToAll();
  setMode("square");
  $("#square").removeClass("unselected");
});

$("#circle").on("click", () => {
  removeSizeTools();
  addUnselectedToAll();
  setMode("circle");
  $("#circle").removeClass("unselected");
});

$("#circle-stamp").on("click", () => {
  removeSizeTools();
  addUnselectedToAll();
  sizeTools("circle-stamp");
  setMode("circle-stamp");
  $("#circle-stamp").removeClass("unselected");
});

$("#star-stamp").on("click", () => {
  removeSizeTools();
  sizeTools("star-stamp");
  addUnselectedToAll();
  setMode("star-stamp");
  $("#star-stamp").removeClass("unselected");
});

$("#heart-stamp").on("click", () => {
  removeSizeTools();
  sizeTools("heart-stamp");
  addUnselectedToAll();
  setMode("heart-stamp");
  $("#heart-stamp").removeClass("unselected");
});

$("#palette-icon").on("click", () => {
  $("#palette-icon").toggleClass("unselected");
  $("#choose-palette").slideToggle();
});

for (let i = 0; i < palettes.length; i++) {
  $(`#palette-${i}`).on("click", () => {
    generatePalette(palettes[i]);
    $("#choose-palette").slideToggle();
    $(".colour-selector").remove();
    $(`#colour-0`).append("<div class = 'colour-selector'></div>");
    $("#palette-icon").toggleClass("unselected");
    setSelectedColour(0);
  });
}

$("#undo").on("click", () => {
  placingStamp = false;
  undo();
});

$(".canvas").on("mouseleave", () => {
  if (placingStamp) {
    undo();
    placingStamp = false;
  }
});

$("#test").on("click", () => {
  drawHearStamp(14, 18, "large", selectedColour);
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
  window.location.reload();
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
