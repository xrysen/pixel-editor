let mouseDown = false;
let mouseButton = 1;

let GRID_WIDTH = 32;
let GRID_HEIGHT = 32;

let selectedColour = "#DC2F31";

let snapShot = [];
let lineChoosingPoints = true;
let lineStartingPoint = [];
let placingStamp = false;

let circleRadius = 0;
let mouseY = 0;

let drawMode = "draw";

let grid = "on";

const palettes = [
  ["#DC2F31", "#E0843B", "#E9E635", "#8DE543", "#1C921A", "#4DBCD7", "#389DD5", "#4744D9", "#9357DB", "#E06ACB", "#E6B4AB", "#945A4C", "#EAEAEA", "#797979", "#010101", "white"],
  ["#720E0E", "#743509", "#7B770B", "#4D861B", "#064204", "#066F84", "#095883", "#0D0B70", "#48197F", "#831A6F", "#784B45", "#310A03", "#797979", "#343434", "#010101", "white"],
  ["#E3888D", "#E3A880", "#ECE793", "#AEE683", "#6CBE6A", "#9CD7E7", "#7FBCE8", "#8787E1", "#A676E3", "#E298D5", "#EAC9C2", "#D79F90", "#EAEAEA", "#B5B5B7", "#8D888E", "white"],
  ["#E2907B", "#E6B191", "#E8C8B9", "#E6979A", "#E07879", "#BBDCC9", "#A4CDA5", "#5AA587", "#ACCD76", "#EAD792", "#E6CB56", "#CBA461", "#EBDBDE", "#B18991", "#764A5B", "white"],
  ["#504FCE", "#7C8EE2", "#88D9B9", "#51C096", "#2F8779", "#E8C1E0", "#E397C8", "#AB4297", "#CF5270", "#E1B047", "#EAE96A", "#B5B23F", "#DFE3EC", "#849CA8", "#064266", "white"],
  ["#CA6750", "#D69E3D", "#E7BF81", "#B1805F", "#784B45", "#AFCD85", "#79A46F", "#527849", "#6B867F", "#A6C0BD", "#9594BC", "#6764AB", "#EBE1C6", "#967B74", "#583C30", "white"],
  ["#732C30", "#C76969", "#EBE875", "#AAA551", "#6B6819", "#405C84", "#56218D", "#222955", "#395431", "#5A8651", "#81A599", "#5F7872", "#D4D1DC", "#5E707A", "#0E1C36", "white"],
  ["#E8EA59", "#ECDEBB", "#E7C219", "#E7B463", "#E39E15", "#6C80E1", "#4643D8", "#0E0B8E", "#185B85", "#E9A6DB", "#E079A6", "#DE595A", "#EDE9EA", "#8A8AB0", "#100A52", "white"],
  ["#8E0360", "#D355D3", "#B57FD5", "#8B50CE", "#5029C2", "#EBE81F", "#E7C219", "#E3A22E", "#E0833D", "#CDE843", "#8BCA57", "#33A464", "#EBE8E1", "#5A8651", "#064204", "white"],
  ["#EAE9B1", "#EBE81F", "#E7C219", "#E39D17", "#E07211", "#D46166", "#B32428", "#7E0305", "#9A0364", "#CD2F79", "#E2899F", "#E7B5B8", "#E9DDDD", "#A66667", "#400C0E", "white"],
  ["#AFE8C5", "#4ED8A7", "#31B09B", "#52CAE3", "#2A9FE2", "#2270D4", "#1542C1", "#0D0C96", "#5231B4", "#803FD1", "#530282", "#340052", "#DFE6EE", "#5F6AA0", "#100A52", "white"],
  ["#100A52", "#E5CAB9", "#EAB89D", "#E3A880", "#CB8B65", "#E6979D", "#E2787C", "#C5696E", "#BA6B5A", "#965E51", "#976B4E", "#775339", "#563929", "#311706", "#000103", "white"],
  ["#EBE1DF", "#E9D483", "#E7C219", "#E7B463", "#E59D15", "#E6A89B", "#E0846D", "#D56446", "#B53F17", "#8F2D08", "#B16B38", "#9F5319", "#743509", "#532605", "#310A03", "white"],
  ["#310A03", "#DCDCDC", "#CFCFCF", "#C1C1C3", "#B8B4B5", "#A6A6A8", "#999896", "#8B868C", "#797979", "#6D686C", "#5B5758", "#494544", "#343436", "#201F1D", "#020001", "white"]
];