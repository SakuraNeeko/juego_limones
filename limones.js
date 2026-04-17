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
let intervalo;

function iniciar(){ 
    intervalo = setInterval(bajarLimon, velocidadCaida); //Primer parametro funcion y segundo milisegundos
    actualizarPantalla();
    aparecerLimon();
}

function reiniciar() {
    clearInterval(intervalo); 
    velocidadCaida = 200;  
    vidas = 3;
    puntaje = 0;
    mostrarSpan("txtVidas", vidas);
    mostrarSpan("txtPuntaje", puntaje);
    iniciar();
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

    if (puntaje == 3) {
        velocidadCaida = 150;
        clearInterval(intervalo);
        intervalo = setInterval(bajarLimon, velocidadCaida);
    } else if (puntaje == 6) {
        velocidadCaida = 100;
        clearInterval(intervalo);
        intervalo = setInterval(bajarLimon, velocidadCaida);
    } else if (puntaje == 10) {
        clearInterval(intervalo);
        // NUEVA ALERTA DE VICTORIA CON SWEETALERT2
        Swal.fire({
            title: '¡VICTORIA!',
            html: `¡Has atrapado <b style="color: #38bdf8; font-size: 1.5em;">10</b> limones y completado el juego!`,
            icon: 'success',
            background: '#111827', 
            color: '#ffffff', 
            confirmButtonColor: '#fde047', 
            confirmButtonText: '<span style="color: #000; font-weight: bold; padding: 0 20px;">↻ VOLVER A JUGAR</span>',
            allowOutsideClick: false,
            backdrop: `
                rgba(0,0,0,0.8)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
            `
        }).then((result) => {
            if (result.isConfirmed) {
                reiniciar(); 
            }
        });
    }
}

function detectarPiso(){
    if(limonY+ALTO_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarSpan("txtVidas",vidas);
    }
    if (vidas == 0) {
        clearInterval(intervalo);
        Swal.fire({
            title: '¡JUEGO TERMINADO!',
            html: `Has atrapado <b style="color: #38bdf8; font-size: 1.5em;">${puntaje}</b> limones. <br> ¿Listo para otra ronda?`,
            icon: 'warning',
            background: '#111827', // Color de fondo de tu tarjeta
            color: '#ffffff', // Texto blanco
            confirmButtonColor: '#fde047', // Botón amarillo neón
            confirmButtonText: '<span style="color: #000; font-weight: bold; padding: 0 20px;">↻ REINICIAR JUEGO</span>',
            allowOutsideClick: false, // Evita que se cierre si dan clic afuera
            backdrop: `
                rgba(0,0,0,0.8)
                url("https://sweetalert2.github.io/images/nyan-cat.gif") 
                left top
                no-repeat
            `
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí llamas a tu función que reinicia las variables del juego
                reiniciar(); 
            }
        });
    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0, canvas.width-ANCHO_LIMON);
    limonY= 0;
    actualizarPantalla();
}