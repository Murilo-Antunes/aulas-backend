/**************************************************************************************************************
 * Objetivo: Arquivo responsável por gerar a tabuada de um número
 * Data: 25/02/2026
 * Autor: Marcel
 * Versão: 1.0
***************************************************************************************************************/

const calcular = require('./calcular')

//função para imprimir a tabuada usando while
const gerarTabuadaWhile = function(tabuada){
    console.log('\nTabuada utilizando While:')
    let tabuadaRecebida = Number(tabuada)
    let cont = 0
    while(cont <= 10){
        let resultado = calcular.multiplicar(tabuadaRecebida, cont)
        console.log(`${tabuadaRecebida} X ${cont} = ${resultado}`) 
        cont++
    }

}



//função para imprimir a tabuada usando for
const gerarTabuadaFor = function(tabuada){
    console.log('Tabuada utilizando For:')
    let tabuadaRecebida = Number(tabuada)
    
    for (let cont = 0; cont <= 10 ; cont+=2) {
        let resultado = calcular.multiplicar(tabuadaRecebida, cont)
        console.log(`${tabuadaRecebida} X ${cont} = ${resultado}`) 
    }
}

gerarTabuadaWhile(10)
console.log('-----------------------------------------------------------')
gerarTabuadaFor(5)