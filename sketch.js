let table;

function preload() {
  // put preload code here
  table = loadTable("dataset.csv", "csv", "header");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
// test 
console.log (table);
}

function draw() {
  // put drawing code here
}
