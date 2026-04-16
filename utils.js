function generarAleatorio(min,max){
    let random=Math.random();
    let numero = random*(max-min);
    let numeroEntero =parseInt(numero);
    
    numeroEntero=numeroEntero+min;
    return numeroEntero;
}