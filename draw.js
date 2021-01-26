
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
    $(`#${i}-${j}`).on('mousedown', (e) => {
      switch(e.which) {
        case 1:
        $(`#${i}-${j}`).css("background-color", $("#colour-picker").val());
        break;
        case 3:
        $(`#${i}-${j}`).css("background-color", "white"); 
        break;
      }
    })
  }
}