let table;

function preload() {
  // put preload code here
  table = loadTable("dataset.csv", "csv", "header");

}

function setup() {
  // put setup code here
  let outerPadding = 20;
  let innerPadding = 10;
  let itemSize = 30;

  // calcolo il numero di colonne 
  let cols =  floor((windowWidth - outerPadding * 2) / (itemSize + innerPadding));
  let rows = table.getRowCount() / cols;

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * innerPadding;

  // creo il canvas 
  createCanvas(windowWidth, windowHeight);
  background(0, 150, 150);

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber ++) {
     
    // carico dati della riga 
    let data = table.getRow(rowNumber).obj;
    console.log(data);
  }
// test 
console.log ("tabella:", table);
console.log ("colonne:", cols);
console.log ("cols:", cols, "rows:", rows);

}

function draw() {
  // put drawing code here
}
