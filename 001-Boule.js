let balleX; //position de la balle en x
let balleY; //position de la balle en y
let rayonBalle; // rayon de la balle
let vitesseBalleX; //vitesse de la balle horizontalement
let vitesseBalleY; //vitesse de la balle verticalement
let raquetteX; // positon de la raquette en X
let raquetteY; //positon de la raquette en Y
let raquetteTaille; //taille de la raquette
let vie; // nombre de vie
let timer; // on accelere toutes les x millisecondes
let nextChange; // moment où on accelere
let acceleration; //vitesse en plus d'acceleration

function setup() {
  createCanvas(600, 400);
  rayonBalle = 5;
  balleX = rayonBalle; // pour qu'elle commence à l'interieur
  balleY = rayonBalle; // idem
  vitesseBalleX = 0.5;
  vitesseBalleY = 0.5;
  acceleration = 0.5;
  raquetteX = 50;
  raquetteY = 375;
  raquetteTaille = 100;
  vie = 10;
  timer = 5000;
  nextChange = millis() + timer;
}

function draw() {
  // acceleration toutes le sx secondes
  if (millis() > nextChange) {
    // Action à exécuter
    nextChange = millis() + timer; // Relancer le timer
    if (vitesseBalleX >= 0) {
      vitesseBalleX += acceleration;
    } else {
      vitesseBalleX -= acceleration;
    }
    if (vitesseBalleY >= 0) {
      vitesseBalleY += acceleration;
    } else {
      vitesseBalleY -= acceleration;
    }
  }
  
  background(125);
  
  // la vie
  fill(255,255,255);
  textFont('Courier New');
  textSize(24);
  if ( vie == 0){
    text("Perdu", 100, 100);
    noLoop();
  } else {
    text("Vie :"+ vie, 100, 100);
  }
  
  
  // la balle
  fill(0,255,0);
  noStroke();
  rect(raquetteX, raquetteY,raquetteTaille, 25, 3);
  
  // la raquette
  fill(255,0,0);
  circle(balleX,balleY,rayonBalle*2);
  balleX = balleX + vitesseBalleX;
  if ((balleX + rayonBalle >= width) || (balleX - rayonBalle <= 0 )) {
    vitesseBalleX = -vitesseBalleX;
  }
  balleY = balleY + vitesseBalleY;
  if ((balleY + rayonBalle  >= height) || (balleY - rayonBalle <= 0)) {
    vitesseBalleY = -vitesseBalleY;
  }
  //mouvement de la raquette
  if (keyIsDown(LEFT_ARROW) === true) {
    raquetteX = raquetteX - 4;
  } else if (keyIsDown(RIGHT_ARROW) === true) {
    raquetteX = raquetteX + 4;
  }
  
  //mouvement de la balle
  // interaction avec la raquette
  auDessusDeLaRaquette = false;
  if ((balleX >= raquetteX) && (balleX <= raquetteX + raquetteTaille)) {
    auDessusDeLaRaquette = true;
  }
  aLaHauteurDeLaRaquette = false;
  if (balleY + rayonBalle >= raquetteY) {
      aLaHauteurDeLaRaquette = true;
  }
  if (auDessusDeLaRaquette && aLaHauteurDeLaRaquette){
    vitesseBalleY = -vitesseBalleY;
  }
  
  //diminue le score si la balle n'est pas intercepté
  if (balleY + rayonBalle >= height){
    vie -= 1;
  }

  if (balleY - rayonBalle <= 0){
    let rand = random(0,10);
    print(rand)
    if ( rand <= 5 ){
      vitesseBalleX += 0.2;
      vitesseBalleY -= 0.2;
      print("+++");
    } else {
      vitesseBalleX -= 0.2;
      vitesseBalleY += 0.2;
      print("---");
    }
  }
}

  
