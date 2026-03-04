/***********************************************************************************************
 * Objetivo: formatação da media e situação do aluno
 * Data: 25/02/2026
 * Autor: Murilo
 * Versão: 1.0
***********************************************************************************************/
const validacao = require('../../module/validacao.js') //importa a classe de validação
const aluno = require('./Aluno.js') //importa a classe que realiza as ações necessárias referentes ao aluno

//identifica o sexo do professor para alterar a sentença com base nisso
const identificarSexoProfessor = function(sexo){
    let sexoRecebido = String(sexo).toLowerCase()
    let exibicaoFinal
    if (validacao.validarSexo(sexoRecebido)){
        if(sexoRecebido == "masculino")
            exibicaoFinal = "Professor"
        else
            exibicaoFinal = "Professora"

        return exibicaoFinal
    }else{
        return false
    }
}

//identifica o sexo do aluno para alterar a sentença com base nisso
const identificarSexoAluno = function(sexo){
    let sexoRecebido = String(sexo).toLowerCase()
    let exibicaoFinal
    if (validacao.validarSexo(sexoRecebido)){
        if(sexoRecebido == "masculino")
            exibicaoFinal = "O aluno"
        else
            exibicaoFinal = "A aluna"

        return exibicaoFinal
    }else{
        return false
    }
}

//realiza a formatação da saida caso o aluno não esteja em recuperação
const exibirSaida = function(sexoAluno, nomeAluno, disciplina, curso, sexoProfessor, nomeProfessor, n1, n2, n3, n4){
    if(validacao.validarVazio(nomeAluno) && validacao.validarVazio(disciplina) && validacao.validarVazio(curso) && validacao.validarVazio(nomeProfessor) && validacao.validarSexo(sexoAluno) && validacao.validarSexo(sexoProfessor)){
        
        let exbicaoSexoAluno = String(identificarSexoAluno(sexoAluno))
        let nomeAlunoRecebido = String(nomeAluno)
        let disciplinaRecebida = String(disciplina)
        let cursoRecebido = String(curso)
        let exibicaoSexoProf = String(identificarSexoProfessor(sexoProfessor))
        let nomeProfessorRecebido = String(nomeProfessor)
        let nota1 = String(n1)
        let nota2 = String(n2)
        let nota3 = String(n3)
        let nota4 = String(n4)
        let media = aluno.calcularMedia(n1, n2, n3, n4)
        let status = aluno.definirStatus(media)

        console.log(`
                        ${exbicaoSexoAluno} ${nomeAlunoRecebido} foi ${status} na disciplina ${disciplinaRecebida}.\n
                        Curso: ${cursoRecebido}\n
                        ${exibicaoSexoProf}: ${nomeProfessorRecebido}\n
                        Notas: ${nota1}, ${nota2}, ${nota3}, ${nota4}\n
                        Média Final: ${media}`)
    }else{
        return false
    }
}

//realiza a formatação da saida caso o aluno esteja em recuperação
const exibirSaidaRecuperacao = function(sexoAluno, nomeAluno, disciplina, curso, sexoProfessor, nomeProfessor, n1, n2, n3, n4, notaExame){
    if(validacao.validarVazio(nomeAluno) && validacao.validarVazio(disciplina) && validacao.validarVazio(curso) && validacao.validarVazio(nomeProfessor) && validacao.chamarValidacoes(notaExame)){ //valida os dados
        let exbicaoSexoAluno = String(identificarSexoAluno(sexoAluno))
        let nomeAlunoRecebido = String(nomeAluno)
        let disciplinaRecebida = String(disciplina)
        let cursoRecebido = String(curso)
        let exibicaoSexoProf = String(identificarSexoProfessor(sexoProfessor))
        let nomeProfessorRecebido = String(nomeProfessor)
        let nota1 = String(n1)
        let nota2 = String(n2)
        let nota3 = String(n3)
        let nota4 = String(n4)
        let notaExameRecebida = String(notaExame)
        let media = aluno.calcularMedia(n1, n2, n3, n4)
        let mediaFinalExame = Number(media) + Number(notaExameRecebida)
        let status = aluno.definirStatus(mediaFinalExame)

        console.log(`
                        ${exbicaoSexoAluno} ${nomeAlunoRecebido} foi ${status} na disciplina ${disciplinaRecebida}.\n
                        Curso: ${cursoRecebido}\n
                        ${exibicaoSexoProf}: ${nomeProfessorRecebido}\n
                        Notas: ${nota1}, ${nota2}, ${nota3}, ${nota4}, ${notaExameRecebida}\n
                        Média Final: ${media}\n
                        Média final do Exame: ${mediaFinalExame}`)
    }else{
        return false
    }
}


//exporta as funções da classe
module.exports = {
    exibirSaida,
    exibirSaidaRecuperacao
}