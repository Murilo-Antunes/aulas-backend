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
    avalicao 		DECIMAL(3,2) DEFAULT NULL,
	valor 			DECIMAL(5,2) NOT NULL DEFAULT 0,
    capa 			VARCHAR(255)
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

        
SELECT *FROM tbl_filme;
DELETE FROM tbl_filme WHERE id = 14;

ALTER TABLE tbl_filme
	CHANGE COLUMN avaliacao avaliacao DECIMAL(4,2) DEFAULT NULL;
        
        
SELECT * FROM tbl_filme WHERE id = 1;