var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); /*contexte du rendu 2d*/
/*
ctx.beginPath(); //debut du contexte
//rectangle les deux premier chiffre correspondent aux coordonnées du coin superieur gauche du rectangle et les deux suivantes la longueur et la largeur
//le rectangle est peint à 20 pixels du côté gauche de l'écran et à 40 pixels du haut, et a une largeur de 50 pixels et une hauteur de 50 pixels
ctx.rect(20, 40, 50, 50); 
ctx.fillStyle = "#FF0000"; //stockage de la couleur quie sera utilisé dans la methode
ctx.fill(); //utilisation de la methode
ctx.closePath();//fin du contexte

ctx.beginPath();
//les coordonnées x ety du centre de l'arc, rayon de l'arc, l'angle de départ et l'angle de fin, direction du dessin,false pour le sens des aiguilles d'une montre,
//la valeur par défaut, ou true pour le sens inverse)
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
//stroke() pour ne colorer que le contour exterieur
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
*/

/*canevas*/
var x = canvas.width/2;
var y = canvas.height-30;

/*ball*/
var drawX = 2;
var drawY = -2;
var ballRadius = 10;/* contient le rayon de ctx.arc*/

/*paddle*/
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

/*dessin de la ball*/
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/*dessin du paddle*/
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/*mouvement de la ball*/
//clearRect EFFACE LE CANEVAS AVANT CHAQUE IMAGE
//Cette méthode prend en compte quatre paramètres: les coordonnées x et y du coin supérieur gauche d'un rectangle
//et les coordonnées x et y du coin inférieur droit d'un rectangle. Toute la zone couverte par ce rectangle sera effacée.
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBall();
drawPaddle();
x += drawX;
y += drawY;
if(x + drawX > canvas.width-ballRadius || x + drawX < ballRadius) {
    drawX = - drawX;
    }

if (y + drawY < ballRadius) {
    drawY = - drawY;
    } else if (y + drawY > canvas.height-ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
        drawY = - drawY;
    } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
    }
if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
}
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }


//Toutes les 10 millisecondes, le canvas est effacé,
//la balle est dessinée sur une position donnée et les valeurs x et y sont mises à jour pour l'image suivante
const interval = setInterval(draw, 10);

