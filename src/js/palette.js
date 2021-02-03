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
  $(`#colour-0`).append("<div class = 'colour-selector'></div>");
};

drawPaletteBackground();
generatePalette(palettes[0]);

for (let i = 0; i < 16; i++) {
  $(`#colour-${i}`).on("click", () => {
    $(".colour-selector").remove();
    $(`#colour-${i}`).append("<div class = 'colour-selector'></div>");
    selectedColour = getRGBValues($(`#colour-${i}`).css("background-color"));
    selectedColour = convertRGBtoHex(
      Number(selectedColour[0]),
      Number(selectedColour[1]),
      Number(selectedColour[2])
    );
    console.log(selectedColour);
  });
}
