let table; 

function calcolaNumeroElementiPerRiga(windowWidth, outerPadding, glifoSize, innerPadding) {
  return floor((windowWidth - outerPadding * 2) / (glifoSize + innerPadding));
}

function calcolaDimensioneCerchioFinale(data, glifoSize) {
  const dimesioneCerchioIniziale = data["column0"];
  const dimensioniTotaliCerchio = table.getColumn("column0");
  const dimensioniMinimeCerchio = min(dimensioniTotaliCerchio);
  const dimensioniMassimeCerchio = max(dimensioniTotaliCerchio);
  return map(dimesioneCerchioIniziale, dimensioniMinimeCerchio, dimensioniMassimeCerchio, 1, glifoSize);
}



function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {

  const margineEsterno = 20;
  const spazioTraGlifi = 10;
  const dimensioneMassimaGlifo = 35;
  const ampiezzaMassimaAngolo= 360;

  // calcolo il numero di colonne in base a quante celle entrano in una riga in funzione della larghezza dello schermo
  const numeroElementiPerRiga = calcolaNumeroElementiPerRiga(windowWidth, margineEsterno, dimensioneMassimaGlifo, spazioTraGlifi)
  const numeroRigheNecessarie = table.getRowCount() / numeroElementiPerRiga;

  // creo la canvas 
  createCanvas(windowWidth, windowHeight);
  background(15);

  // Contatori per posizionare i quadrati nella griglia.
  let numeroColonna = 0;
  let numeroRiga = 0;

  // Loop su tutte le righe del CSV
  for (let i = 0; i < table.getRowCount(); i ++) {
    
    // carico dati della riga 
    const data = table.getRow(i).obj;
    const dimensioneCerchioFinale = calcolaDimensioneCerchioFinale(data, dimensioneMassimaGlifo);

// DEFNISCO I COLORI IN BASE AI VALORI DELLA COLONNA 2 //////////////////////////
    // variabile per il colore 
    const indicatoreColore = data["column2"];
    const listaCompletaColori = table.getColumn("column2");
    const indicatoreMinimoColore = min(listaCompletaColori);
    const indicatoreMassimoColore = max(listaCompletaColori);
    const valoreColoreMappato = map(indicatoreColore, indicatoreMinimoColore, indicatoreMassimoColore, 0, 1);
/////////////////////////////////////////////////////////////////////////////////////

    // DEFINISCO QUALI COLORI VOGLIO MAPPARE
    let color1 = color(255, 0, 0, 150);
    let color2 = color(150, 0, 150, 100);
    
    // MAPPO IL RANGE DI SFUMATURE TRA COLOR1 E COLOR2
    let mappedColor = lerpColor (color1, color2, valoreColoreMappato);

    // DISEGNO CERCHIO CON SCALED VALUE///////////////////////////
    fill(mappedColor);
    noStroke();
    rectMode(CENTER);
    // calcola posizione cella
    let xPos = margineEsterno + numeroColonna * (dimensioneMassimaGlifo + spazioTraGlifi);
    let yPos = margineEsterno + numeroRiga * (dimensioneMassimaGlifo + spazioTraGlifi);
    circle(xPos, yPos, dimensioneCerchioFinale);
    ////////////////////////////////////////////////////////////////////

    // definisco DIMENSIONI QUADRATO IN BASE AI DATI DELLA COLONNA 0 /////////
    // prendo size value dalla colonna 0
    let quadValue = data["column3"];

    // ottieni minimo e massimo da tutti i dati di colonna 0
    let allQuadValues = table.getColumn("column3");
    let minQuadValue = min(allQuadValues);
    let maxQuadValue = max(allQuadValues);
    let quadSize = map (quadValue, minQuadValue, maxQuadValue, 1, dimensioneMassimaGlifo);
////////////////////////////////////////////////////////////////////////////////////

    // CREO UN QUADRATO CON QUADSIZE//////////
    color1 = color(0, 100, 0, 100);
    color2 = color(255, 255, 0, 150);
    mappedColor = lerpColor (color1, color2, valoreColoreMappato);
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
    let angle = map (rotationValue, minRotationValue, maxRotationValue, 1, ampiezzaMassimaAngolo);
    ////////////////////////////////////////////////////////////////////////////////////

    //CREO UN ARC TRAMITE ANGLE////////////////////////////////////////
    angleMode(DEGREES);
    color1 = color(0, 150, 100, 200);
    color2 = color(150, 0, 200, 150);
    mappedColor = lerpColor (color1, color2, valoreColoreMappato);
    fill(mappedColor);
    arc(xPos, yPos, dimensioneMassimaGlifo, dimensioneMassimaGlifo, angle, PI + QUARTER_PI)
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
