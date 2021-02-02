const drawPaletteBackground = () => {
  for (let i = 0; i < 16; i++) {
    $("#palette").append(`<div id = "colour-${i}" class = 'colour-selection'></div>`);
  }
};

const generatePalette = (palette) => {
  for (let i = 0; i < palette.length; i++) {
    $(`#colour-${i}`).css("background-color", palette[i]);
    console.log(palette[i]);
  }
  $(`#colour-15`).append("<div class = 'colour-selector'></div>");
}

drawPaletteBackground();
generatePalette(palettes[0]);

for (let i = 0; i < 16; i++) {
  $(`#colour-${i}`).on("click", () => {
    $(".colour-selector").remove();
    $(`#colour-${i}`).append("<div class = 'colour-selector'></div>");   
  })
}
