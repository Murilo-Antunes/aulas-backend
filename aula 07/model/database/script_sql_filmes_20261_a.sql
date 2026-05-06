#Cria database do projeto de filme
CREATE DATABASE db_filmes_20261_a;

#Ativa o uso do database de filmes
USE db_filmes_20261_a;

#Cria a tabela de filmes
CREATE TABLE tbl_filme(
	id 				int NOT NULL PRIMARY key AUTO_INCREMENT,
    nome 			VARCHAR(80) NOT NULL,
    data_lancamento DATE NOT NULL,
    duracao 		TIME NOT NULL,
    sinopse 		TEXT NOT NULL,
    avaliacao 		DECIMAL(3,2) DEFAULT NULL,
	valor 			DECIMAL(5,2) NOT NULL DEFAULT 0,
    capa 			VARCHAR(255)
);

-- Tabela Classificação Indicativa --
CREATE TABLE tbl_classificacao_indicativa(
	id	INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    classificacao VARCHAR(3) NOT NULL
);

INSERT INTO tbl_classificacao_indicativa (classificacao)
VALUES("L");


-- Tabela Genero -- 
CREATE TABLE tbl_genero (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genero VARCHAR(25) NOT NULL
);

-- Tabela Nacionalidade --
CREATE TABLE tbl_nacionalidade(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pais VARCHAR(40) NOT NULL,
    sigla VARCHAR(5) NOT NULL
);

-- Tabela Diretor -- 
CREATE TABLE tbl_diretor(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_inicio_carreira DATE NOT NULL,
    data_falecimento DATE,
    data_termino_carreira DATE,
    biografia TEXT
);

-- Tabela Ator -- 
CREATE TABLE tbl_ator(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_inicio_carreira DATE NOT NULL,
    data_falecimento DATE,
    data_termino_carreira DATE,
    biografia TEXT
);

-- Tabela Atividade -- 
CREATE TABLE tbl_atividade(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    atividade VARCHAR(45) NOT NULL
);

DROP TABLE tbl_filme;

SHOW TABLES;

#Inserir dados
INSERT INTO tbl_filme (nome, data_lancamento, duracao, sinopse, avalicao, valor, capa)
VALUES ('Pulp Fiction - Tempo de Violência',
		'1995-02-18',
		'02:29:00',
        'Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), 
        um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em 
        apuros por ganhar luta que deveria perder.',
        '4.6',
        '49.99',
        'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/16/32/19872655.jpg');

        
SELECT *FROM tbl_classificacao_indicativa;
DELETE FROM tbl_filme WHERE id = 1;

ALTER TABLE tbl_filme
	CHANGE COLUMN avaliacao avaliacao DECIMAL(4,2) DEFAULT NULL;
        
        
SELECT * FROM tbl_filme WHERE id = 1;

UPDATE tbl_filme set 
	nome = 'filme insano',
    data_lancamento = '2026-04-29',
    duracao = '02:00',
    sinopse = 'hell yeah',
    avaliacao = '10',
    valor = '100',
    capa = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZp2v6DBoAEgsFYIylzBhlT7p5gGmN4MQM7A&s'
 WHERE id = 1