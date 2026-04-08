/* *********************************************************************
* Objetivo: manipular uma lista de dados do whatsapp
* Data: 08/04/2026  
* Autor: Murilo
* **********************************************************************/

const contatos = require('./contatos.js')



const getTodosDados = function () {
    let dados = []
    contatos.contatos['whats-users'].forEach(function(dadosUsuario){
        dados.push(dadosUsuario)
    })

    let dadosJson = {"allData": dados}
    return dadosJson

}

const getDadosProfile = (numero) =>{
    let dadosProfileJson = false
    contatos.contatos['whats-users'].forEach(function(contato){
        if (String(numero).trim() == String(contato.number).trim()){
            dadosProfileJson = {
                "nickname" : contato.nickname,
                "profile-image" : contato['profile-image'],
                "number" : contato.number,
                "background" : contato.background,
                "created-since-start" : contato['created-since'].start,
                "created-since-end" : contato['created-since'].end
            }
        }
    })
    
    return dadosProfileJson
}

const getDadosPessoaisContatos = (numero) =>{
    let dadosJsonPessoal = false
    let listaDadosPessoais = []
    contatos.contatos['whats-users'].forEach(function(contato){
        if (String(numero).trim() == String(contato.number).trim()){
            contato.contacts.forEach(function(contatosPessoais){
                dadosJsonPessoal = {
                    "nickname": contatosPessoais.name,
                    "image": contatosPessoais.image,
                    "description": contatosPessoais.description
                }
                listaDadosPessoais.push(dadosJsonPessoal)
            })
            dadosJsonPessoal = {listaDadosPessoais}
        }
    })
    return dadosJsonPessoal
}

const getMensagensUsuario = (numero) =>{
    let dadosJsonMensangens = false
    let listaDadosMensagens = []
    contatos.contatos['whats-users'].forEach(function(contato){
        if (String(numero).trim() == String(contato.number).trim()){
            contato.contacts.forEach(function(contatosPessoais){
                listaDadosMensagens.push(contatosPessoais.messages)
            })
            dadosJsonMensangens = {listaDadosMensagens}
        }
    })
    return dadosJsonMensangens
}

const getConversaUsuario = (numero, nome) =>{
    let dadosJsonConversa = false
    contatos.contatos['whats-users'].forEach(function(usuario){
        if(String(numero).trim() == String(usuario.number).trim()){
            usuario.contacts.forEach(function(contato){
                if(String(contato.name).toUpperCase().trim() === String(nome).toUpperCase().trim()){
                    dadosJsonConversa = {
                        "name": contato.name,
                        "description" : contato.description,
                        "messages" : contato.messages
                    }
                }
            })
        }
    })

    return dadosJsonConversa
}

const filtrarConversaGeral = (numero, termo) => {
    let status = false
    
    let listaDeMensagensFiltradas = []
    contatos.contatos['whats-users'].forEach(function(usuario){
        if(String(numero).trim() == String(usuario.number).trim()){
            usuario.contacts.forEach(function(contato){
                contato.messages.forEach(function(mensagem){
                    if(mensagem.content.includes(termo)){
                        status = true
                        listaDeMensagensFiltradas.push(mensagem)
                    }
                })
            })
        }
    })

    if(!status)
        return false

    let dadosJsonFiltro = {listaDeMensagensFiltradas}
    return dadosJsonFiltro
}

module.exports = {
    getTodosDados,
    getDadosProfile,
    getDadosPessoaisContatos,
    getMensagensUsuario,
    getConversaUsuario,
    filtrarConversaGeral
}

console.log(filtrarConversaGeral(11955577796, "bem"))