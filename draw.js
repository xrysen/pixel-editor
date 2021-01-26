const makeGrid = () => {
  for (let i = 0; i < 32; i++) {
    $(".canvas").append(`<tr id=tr${i}></tr>`);
  }

  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      $(`#tr${i}`).append(`<td id=${i}-${j}></td>`);
    }
  }
}

makeGrid();

for (let i = 0; i < 32; i++) {
  for (let j = 0; j < 32; j++) {
    $(`#${i}-${j}`).on('mousedown', () => {
      $(`#${i}-${j}`).css("background-color", $("#colour-picker").val());
    })
  }
}

console.log($("#colour-picker"));