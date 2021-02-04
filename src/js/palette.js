const drawPaletteBackground = () => {
  for (let i = 0; i < 16; i++) {
    $("#palette").append(
      `<div id = "colour-${i}" class = 'colour-selection'></div>`
    );
  }
};

const generatePalette = (palette) => {
  for (let i = 0; i < palette.length; i++) {
    $(`#colour-${i}`).css("background-color", palette[i]);
  }
};

const showAllPalettes = () => {
  for (let i = 0; i < palettes.length; i++) {
    $(`#choose-palette`).append(`<div id = "palette-${i}" class="palette-container"></div>`);
    for (let j = 0; j < palettes[i].length; j++) {
      $(`#palette-${i}`).append(`<div id = "colours-${i}-${j}" class = 'colour-selection'></div>`);
      
    }
  }
}

const showAll = () => {
  showAllPalettes();
  for (let i = 0; i < palettes.length; i++) {
    for (let j = 0; j < palettes[i].length; j++) {
      $(`#colours-${i}-${j}`).css("background-color", palettes[i][j]);
    }
  }
}

const setSelectedColour = (index) => {
  selectedColour = getRGBValues($(`#colour-${index}`).css("background-color"));
  selectedColour = convertRGBtoHex(
    Number(selectedColour[0]),
    Number(selectedColour[1]),
    Number(selectedColour[2])
  );
}

drawPaletteBackground();
generatePalette(palettes[0]);
$(`#colour-0`).append("<div class = 'colour-selector'></div>");
showAll();

for (let i = 0; i < 16; i++) {
  $(`#colour-${i}`).on("click", () => {
    $(".colour-selector").remove();
    $(`#colour-${i}`).append("<div class = 'colour-selector'></div>");
    setSelectedColour(i);
  });
}

