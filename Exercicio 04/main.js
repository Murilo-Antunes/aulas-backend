/***********************************************************************************************
 * Objetivo: Arquivo responsável pela escolha das funcionalidades do programa
 * Data: 03/03/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const readline = require('readline') //importa o readline
//cria a interface para entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//importa todos os apps das outras funcionalidades do programa
const imc = require('./atividade 01/app.js')
const aluno = require('./atividade 02/app.js')
const tabuada = require('./atividade 03/app.js')
const fatorial = require('./atividade 04/app.js')
const imparPar = require('./atividade 05/app.js')
const validacao = require('./module/validacao.js')

//impressão das opções 
console.log(`
    ---------------------------------------------------------
    1. Calcular IMC
    2. Aprovação de aluno
    3. Calcular tabuada
    4. Calcular fatorial
    5. Calcular números pares e ímpares
    ---------------------------------------------------------
    `)

//pergunta qual opção o usuário escolhe
entradaDeDados.question('Escolha uma das opções acima: ', function(escolha){ //valida a escolha do usuário
    if(validacao.validarEscolhaMain(escolha)){
        switch(escolha){
            case "1":
                imc.imcApp(entradaDeDados)
                break
            case "2":
                aluno.alunoApp(entradaDeDados)
                break
            case "3":
                tabuada.tabuadaApp(entradaDeDados)
                break
            case "4":
                fatorial.fatorialApp(entradaDeDados)
                break
            case "5":
                imparPar.imparParApp(entradaDeDados)
                break
            default:
                console.log("ERRO: A escolha não condiz com as opções acima!!!")
                entradaDeDados.close()
                break
        }
    }else{
        entradaDeDados.close()
    }

    
})