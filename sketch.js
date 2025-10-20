let table; 

function calcolaNumeroElementiPerRiga(windowWidth, outerPadding, glifoSize, innerPadding) {
  return floor((windowWidth - outerPadding * 2) / (glifoSize + innerPadding));
}

function calcolaDimensioneCerchio(data, glifoSize) {
  const dimesioneCerchioIniziale = data["column0"];
  const dimensioniTotaliCerchio = table.getColumn("column0");
  const dimensioneMinimaCerchio = min(dimensioniTotaliCerchio);
  const dimensioneMassimaCerchio = max(dimensioniTotaliCerchio);
  return map(dimesioneCerchioIniziale, dimensioneMinimaCerchio, dimensioneMassimaCerchio, 1, glifoSize);
}

function definisciIndicatoreColoreMappato(data) {
  const indicatoreColore = data["column2"];
    const listaCompletaColori = table.getColumn("column2");
    const indicatoreMinimoColore = min(listaCompletaColori);
    const indicatoreMassimoColore = max(listaCompletaColori);
    return map(indicatoreColore, indicatoreMinimoColore, indicatoreMassimoColore, 0, 1);
}

function calcolaDimensioneQuadrato(data, dimensioneMassimaGlifo) {
    const dimensioneQuadratoIniziale = data["column3"];
    const dimensioniTotaliQuadrato = table.getColumn("column3");
    const dimensioneMinimaQuadrato = min(dimensioniTotaliQuadrato);
    const dimensioneMassimaQuadrato = max(dimensioniTotaliQuadrato);
    return map (dimensioneQuadratoIniziale, dimensioneMinimaQuadrato, dimensioneMassimaQuadrato, 1, dimensioneMassimaGlifo);
}

function calcolaAmpiezzaAngolo(data, ampiezzaMassimaAngolo) {
    const AmpiezzaAngoloIniziale = data["column1"];
    const valoriAmpiezzeTotali = table.getColumn("column1");
    const valoreMinimoAngolo = min(valoriAmpiezzeTotali);
    const valoremassimoAngolo = max(valoriAmpiezzeTotali);
    return map (AmpiezzaAngoloIniziale, valoreMinimoAngolo, valoremassimoAngolo, 1, ampiezzaMassimaAngolo);
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
    const dimensioneCerchio = calcolaDimensioneCerchio(data, dimensioneMassimaGlifo);
    const indicatoreColoreMappato = definisciIndicatoreColoreMappato(data);

     // calcola posizione cella
    let xPos = margineEsterno + numeroColonna * (dimensioneMassimaGlifo + spazioTraGlifi);
    let yPos = margineEsterno + numeroRiga * (dimensioneMassimaGlifo + spazioTraGlifi);

    // DEFINISCO QUALI COLORI VOGLIO MAPPARE
    let colore1 = color(255, 0, 0, 150);
    let colore2 = color(150, 0, 150, 100);
    
    // MAPPO IL RANGE DI SFUMATURE TRA COLORE1 E COLORE2
    let coloreRiempimento = lerpColor (colore1, colore2, indicatoreColoreMappato);

    // DISEGNO CERCHIO ///////////////////////////
    fill(coloreRiempimento);
    noStroke();
    rectMode(CENTER);
    circle(xPos, yPos, dimensioneCerchio);
    ////////////////////////////////////////////////////////////////////

    const dimensioneQuadrato = calcolaDimensioneQuadrato(data, dimensioneMassimaGlifo);

    // CREO FIGURA QUADRATO //////////
    colore1 = color(0, 100, 0, 100);
    colore2 = color(255, 255, 0, 150);
    coloreRiempimento = lerpColor (colore1, colore2, indicatoreColoreMappato);
    fill(coloreRiempimento);
    square(xPos, yPos, dimensioneQuadrato);
    ////////////////////////////////////////////////////////
    const angolo = calcolaAmpiezzaAngolo(data, ampiezzaMassimaAngolo);
    //CREO UN ARC TRAMITE ANGLE////////////////////////////////////////
    angleMode(DEGREES);
    colore1 = color(0, 150, 100, 200);
    colore2 = color(150, 0, 200, 150);
    coloreRiempimento = lerpColor (colore1, colore2, indicatoreColoreMappato);
    fill(coloreRiempimento);
    arc(xPos, yPos, dimensioneMassimaGlifo, dimensioneMassimaGlifo, angolo, PI + QUARTER_PI)
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
