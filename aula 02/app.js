/***********************************************************************************************
 * Objetivo: Calcular média escolares
 * Data: 29/01/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

//import da readline
const readline = require("readline")

const entradaDeDados =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Digite o nome do aluno: ", function(nome){
    let nomeAluno = nome
    entradaDeDados.question("Digite a nota 1: ", function(valor1){
        let nota1 = valor1
        entradaDeDados.question("Digite a nota 2: ", function(valor2){
            let nota2 = valor2
            entradaDeDados.question("Digite a nota 3: ", function(valor3){
                let nota3 = valor3
                entradaDeDados.question("Digite a nota 4: ", function(valor4){
                    let nota4 = valor4

                    if (nomeAluno == "" || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == ""){
                        console.log("Erro de caixa vazia")

                    }else if (nota1 > 100 || nota1 < 0  || nota2 > 100 || nota2 < 0 || nota3 > 100 || nota3 < 0 || nota4 > 100 || nota4 < 0 ){
                        console.log("A nota não está entre 0 e 100")

                    }else if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                        console.log("Erro, alguma nota não é um número")

                    //validação se o tipo de valor da variável é número utilizando o isNaN (is Not a Number)    
                    }else{
                        let notaFinal = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) /4
                        let statusAluno
                                      
                        if(notaFinal >= 70 ){
                            statusAluno = "APROVADO"
                        }else if(notaFinal < 50){
                            statusAluno = "REPROVADO"
                        }else{
                            statusAluno = "RECUPERAÇÃO"
                        }

                        console.log("O aluno(a) " + nomeAluno + " Teve a média final de " + notaFinal.toFixed(2) + " e a sua situação é " + statusAluno)
                    }
                })
            })
        })
    })
})