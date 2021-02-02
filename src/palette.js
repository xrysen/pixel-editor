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
}

drawPaletteBackground();
generatePalette(palettes[0]);