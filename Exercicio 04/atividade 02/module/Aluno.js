/***********************************************************************************************
 * Objetivo: calculo de media e situação do aluno
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/

const validacao = require('../../module/validacao.js')

const calcularMedia = function (n1, n2, n3, n4){
    if(validacao.chamarValidacoes(n1) && validacao.chamarValidacoes(n2) && validacao.chamarValidacoes(n3) && validacao.chamarValidacoes(n4)){
        let nota1 = Number(n1)
        let nota2 = Number(n2)
        let nota3 = Number(n3)
        let nota4 = Number(n4)
        let resultado = (nota1 + nota2 + nota3 + nota4) / 4
        return resultado
    }else
        return false
}

const definirStatus = function (nota){
    if(validacao.chamarValidacoes(nota)){
        let notaRecebida = nota
        let status
        if(notaRecebida >= 70)
            status = "aprovado"
        else if (notaRecebida < 50)
            status = "reprovado"
        else
            status = "recuperação"

        return String(status)

    }else{
        return false
    }
}

module.exports = {
    calcularMedia,
    definirStatus
}