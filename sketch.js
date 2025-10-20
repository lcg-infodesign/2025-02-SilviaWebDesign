let table; 

function calcolaNumeroElementiPerRiga(windowWidth, outerPadding, glifoSize, innerPadding) {
  return floor((windowWidth - outerPadding * 2) / (glifoSize + innerPadding));
}

//function trovaDimensioneCerchio(data, glifoSize) {
  // definisco  IN BASE AI DATI DELLA COLONNA 0 /////////
    // prendo size value dalla colonna 0
  //  let dimesioneCerchioIniziale = data["column0"];

    // ottieni minimo e massimo da tutti i dati di colonna 0
  //  let dimensioniTotaliCerchio = table.getColumn("column0");
  //  let dimensioniMinimeCerchio = min(dimensioniTotaliCerchio);
  //  let dimensioniMassimeCerchio = max(dimensioniTotaliCerchio);
  //  let dimensioneCerchioFinale = map (dimesioneCerchioIniziale, dimensioniMinimeCerchio, dimensioniMassimeCerchio, 1, glifoSize);
  ////////////////////////////////////////////////////////////////////////////////////
//}



function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {

  // CONFIGURAZIONE ///////////////
  // margine esterno del canvas.
  let outerPadding = 20;
  // spazio tra i glifi
  let innerPadding = 10;
  // dimensione(massima) lato del glifo
  let glifoSize = 35;
  let maxAngle= 360;
  //////////////////////////////////

  // calcolo il numero di colonne in base a quante celle 
  // entrano in una riga in funzione della larghezza dello schermo
  const numeroElementiPerRiga = calcolaNumeroElementiPerRiga(windowWidth, outerPadding, glifoSize, innerPadding)
  let numeroRigheNecessarie = table.getRowCount() / numeroElementiPerRiga;

// let totalHeight = outerPadding * 2 + rows * glifoSize + (rows - 1) * innerPadding;

// creo la canvas 
  createCanvas(windowWidth, windowHeight);
  background(15);

  // Contatori per posizionare i quadrati nella griglia.
  let numeroColonna = 0;
  let numeroRiga = 0;

  // Loop su tutte le righe del CSV
  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber ++) {
    
    // carico dati della riga 
    let data = table.getRow(rowNumber).obj;

//const dimensioneCerchioFinale= trovaDimensioneCerchio(data, glifoSize);
// definisco  IN BASE AI DATI DELLA COLONNA 0 /////////
    // prendo size value dalla colonna 0
    let dimesioneCerchioIniziale = data["column0"];

    // ottieni minimo e massimo da tutti i dati di colonna 0
    let dimensioniTotaliCerchio = table.getColumn("column0");
    let dimensioniMinimeCerchio = min(dimensioniTotaliCerchio);
    let dimensioniMassimeCerchio = max(dimensioniTotaliCerchio);
    let dimensioneCerchioFinale = map (dimesioneCerchioIniziale, dimensioniMinimeCerchio, dimensioniMassimeCerchio, 1, glifoSize);
////////////////////////////////////////////////////////////////////////////////////

// DEFNISCO I COLORI IN BASE AI VALORI DELLA COLONNA 2 //////////////////////////
    // variabile per il colore 
    let colorValue = data["column2"];
    let allColorValues = table.getColumn("column2");
    let minColorValue = min(allColorValues);
    let maxColorValue = max(allColorValues);
    let colorValueMapped = map(colorValue, minColorValue, maxColorValue, 0, 1);
/////////////////////////////////////////////////////////////////////////////////////

    // DEFINISCO QUALI COLORI VOGLIO MAPPARE
    let color1 = color(255, 0, 0, 150);
    let color2 = color(150, 0, 150, 100);
    
    // MAPPO IL RANGE DI SFUMATURE TRA COLOR1 E COLOR2
    let mappedColor = lerpColor (color1, color2, colorValueMapped);

    // DISEGNO CERCHIO CON SCALED VALUE///////////////////////////
    fill(mappedColor);
    noStroke();
    rectMode(CENTER);
    // calcola posizione cella
    let xPos = outerPadding + numeroColonna * (glifoSize + innerPadding);
    let yPos = outerPadding + numeroRiga * (glifoSize + innerPadding);
    circle(xPos, yPos, dimensioneCerchioFinale);
    ////////////////////////////////////////////////////////////////////

    // definisco DIMENSIONI QUADRATO IN BASE AI DATI DELLA COLONNA 0 /////////
    // prendo size value dalla colonna 0
    let quadValue = data["column3"];

    // ottieni minimo e massimo da tutti i dati di colonna 0
    let allQuadValues = table.getColumn("column3");
    let minQuadValue = min(allQuadValues);
    let maxQuadValue = max(allQuadValues);
    let quadSize = map (quadValue, minQuadValue, maxQuadValue, 1, glifoSize);
////////////////////////////////////////////////////////////////////////////////////

    // CREO UN QUADRATO CON QUADSIZE//////////
    color1 = color(0, 100, 0, 100);
    color2 = color(255, 255, 0, 150);
    mappedColor = lerpColor (color1, color2, colorValueMapped);
    fill(mappedColor);
    square(xPos, yPos, quadSize);
    ////////////////////////////////////////////////////////

    // definisco AMPIEZZA ANGOLO IN BASE AI DATI DELLA COLONNA 0 /////////
    // prendo size value dalla colonna 0
    let rotationValue = data["column1"];

    // ottieni minimo e massimo da tutti i dati di colonna 0
    let allRotationValues = table.getColumn("column1");
    let minRotationValue = min(allRotationValues);
    let maxRotationValue = max(allRotationValues);
    let angle = map (rotationValue, minRotationValue, maxRotationValue, 1, maxAngle);
    ////////////////////////////////////////////////////////////////////////////////////

    //CREO UN ARC TRAMITE ANGLE////////////////////////////////////////
    angleMode(DEGREES);
    color1 = color(0, 150, 100, 200);
    color2 = color(150, 0, 200, 150);
    mappedColor = lerpColor (color1, color2, colorValueMapped);
    fill(mappedColor);
    arc(xPos, yPos, glifoSize, glifoSize, angle, PI + QUARTER_PI)
    /////////////////////////////////////////////////////////////////

// aumento colCount
numeroColonna++;

// controllo se siamo a fine riga 
if(numeroColonna == numeroElementiPerRiga) {
  numeroColonna = 0;
  numeroRiga++;
}
  }
// test 
console.log ("tabella:", table);
console.log ("colonne:", numeroElementiPerRiga);
console.log ("cols:", numeroElementiPerRiga, "rows:", numeroRigheNecessarie);

}

function draw() {
  
}
