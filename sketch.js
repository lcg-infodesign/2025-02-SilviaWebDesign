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

  let colCount = 0;
  let rowCount = 0;

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber ++) {
    
    // carico dati della riga 
    let data = table.getRow(rowNumber).obj;
    
    // prendo valore epr dimensione
    let myValue = data["column0"];

    // calcolo min e max
    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map (myValue, minValue, maxValue, 1, itemSize);

    // variabile per il colore 
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color("red");
    let c2 = color("blue");

    let mappedColor = lerpColor (c1, c2, value2mapped);
    fill(mappedColor);

    let xPos = outerPadding + colCount * (itemSize + innerPadding);
    let yPos = outerPadding + rowCount * (itemSize + innerPadding);

    rect(xPos, yPos, scaledValue, scaledValue);

// aumento colCount
colCount++;

// controllo se siamo a fine riga 
if(colCount == cols) {
  colCount = 0;
  rowCount++;
}
  }
// test 
console.log ("tabella:", table);
console.log ("colonne:", cols);
console.log ("cols:", cols, "rows:", rows);

}

function draw() {
  // put drawing code here
}
