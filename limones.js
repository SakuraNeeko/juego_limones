let canvas= document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");
const ALTURA_SUELO=40;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTO_LIMON=20;
let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=5;
let puntaje=0;
let vidas=3;
let velocidadCaida=200;

function iniciar(){ 
    setInterval(bajarLimon,velocidadCaida) //Primer parametro funcion y segundo milisegundos
    actualizarPantalla();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
} 

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX+ANCHO_LIMON >personajeX && 
        limonX<personajeX+ANCHO_PERSONAJE &&
        limonY+ALTO_LIMON>personajeY &&
        limonY<personajeY+ALTURA_PERSONAJE){

        aparecerLimon();
        puntaje=puntaje+1;
        mostrarSpan("txtPuntaje", puntaje);
    }

    if (puntaje == 3) velocidadCaida = 150;
    if (puntaje == 6) velocidadCaida = 100;
    if (puntaje == 10) alert("GANASTE");
}

function detectarPiso(){
    if(limonY+ALTO_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarSpan("txtVidas",vidas);
    }
    if (vidas == 0) {
    alert("GAME OVER");
}
}

function aparecerLimon(){
    limonX=generarAleatorio(0, canvas.width-ANCHO_LIMON);
    limonY= 0;
    actualizarPantalla();
}