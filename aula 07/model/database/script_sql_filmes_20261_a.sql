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
    avaliacao 		DECIMAL(4,2) DEFAULT NULL,
	valor 			DECIMAL(5,2) NOT NULL DEFAULT 0,
    capa 			VARCHAR(255)
);

DROP TABLE tbl_filme;

-- Tabela Classificação Indicativa --
CREATE TABLE tbl_classificacao_indicativa(
	id	INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    classificacao VARCHAR(3) NOT NULL
);

INSERT INTO tbl_classificacao_indicativa (classificacao)
VALUES("L");

UPDATE tbl_classificacao_indicativa set 
	classificacao = "10"
WHERE id = 1;

SELECT * FROM tbl_classificacao_indicativa;
SELECT * FROM tbl_classificacao_indicativa WHERE id = 2;

DELETE FROM tbl_classificacao_indicativa WHERE id = 1;

DROP TABLE tbl_classificacao_indicativa;

-- Tabela Genero -- 
CREATE TABLE tbl_genero (
	id 		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genero 	VARCHAR(25) NOT NULL
);

-- Tabela Nacionalidade --
CREATE TABLE tbl_nacionalidade(
	id 		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pais 	VARCHAR(40) NOT NULL,
    sigla 	VARCHAR(5) NOT NULL
);

-- Tabela Diretor -- 
CREATE TABLE tbl_diretor(
	id 						INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 					VARCHAR(80) NOT NULL,
    data_nascimento 		DATE NOT NULL,
    data_inicio_carreira 	DATE NOT NULL,
    data_falecimento 		DATE,
    data_termino_carreira 	DATE,
    biografia 				TEXT
);

-- Tabela Ator -- 
CREATE TABLE tbl_ator(
	id 						INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 					VARCHAR(80) NOT NULL,
    data_nascimento 		DATE NOT NULL,
    data_inicio_carreira 	DATE NOT NULL,
    data_falecimento 		DATE,
    data_termino_carreira 	DATE,
    biografia 				TEXT
);

SELECT * FROM tbl_ator;

SHOW TABLES;
desc tbl_ator;

-- Tabela Atividade -- 
CREATE TABLE tbl_atividade(
	id 			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    atividade 	VARCHAR(45) NOT NULL
);


-- ******** COMANDOS BANCO ******** --
#Mostra as tabelas de um banco
SHOW TABLES;

# ------------- INSERT -------------
#Inserir dados unicamente
INSERT INTO tbl_filme (nome, data_lancamento, duracao, sinopse, avaliacao, valor, capa)
VALUES ('Pulp Fiction - Tempo de Violência',
		'1995-02-20',
		'02:29:00',
        'Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), 
        um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em 
        apuros por ganhar luta que deveria perder.',
        '4.6',
        '99.99',
        'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/16/32/19872655.jpg');

#Inserir dados multiplas vezes
INSERT INTO tbl_filme (nome, data_lancamento, duracao, sinopse, avaliacao, valor, capa)
VALUES ('Pulp Fiction 2 - Tempo de Violência',
		'1996-02-18',
		'01:29:00',
        'Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), 
        um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em 
        apuros por ganhar luta que deveria perder.',
        '4.1',
        '49.99',
        'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/16/32/19872655.jpg'),
		('2 Pulp Fiction - Tempo de Violência 2',
		'1995-02-18',
		'02:30:00',
        'Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), 
        um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em 
        apuros por ganhar luta que deveria perder.',
        '5',
        '49.99',
        'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/16/32/19872655.jpg');
        
# ------------- SELECT -------------
SELECT * FROM tbl_filme; #Retorna todas as colunas da tabela (* significa retornar tudo)
SELECT * FROM tbl_filme WHERE id = 4; #Seleciona o objeto de id 4 da tabela
SELECT tbl_filme.* FROM tbl_filme; #Retorna todas colunas de forma especifica da tabela
SELECT nome, duracao FROM tbl_filme; #Retorna colunas especificas da tabela
SELECT tbl_filme.nome, duracao FROM tbl_filme; #Retorna colunas especificas de uma tabela especifica

#Criar colunas ou tabelas renomeadas virtualmete, ou seja, só na saida de dados (ALIAS)
SELECT tbl_filme.nome as nome_filme, tbl_filme.sinopse as descricao_filme FROM tbl_filme; #renomeia os atributos
SELECT tf.nome, tf.sinopse FROM tbl_filme as tf; #renomeia a tabela

#Ordenando o resultado de uma tabela
SELECT * FROM tbl_filme ORDER BY nome;
SELECT * FROM tbl_filme ORDER BY nome asc; #ordena de forma crescente
SELECT * FROM tbl_filme ORDER BY nome desc; #ordena de forma decrescente
SELECT * FROM tbl_filme ORDER BY nome, data_lancamento; #ordena pelo nome e pela data
SELECT * FROM tbl_filme ORDER BY nome asc, data_lancamento desc; #ordena pelo nome de forma crescente e pela data de froma decrescente
SELECT * FROM tbl_filme ORDER BY nome asc, data_lancamento desc; #ordena pelo nome 

#Operadores lógicos (or, and, not)
SELECT * FROM tbl_filme WHERE data_lancamento >= '1995-02-19' and valor >= 50;
SELECT * FROM tbl_filme WHERE duracao >= '02:30' or data_lancamento >= '1996-01-01';
SELECT * FROM tbl_filme WHERE NOT id = 7;

#EXISTEM PRIORIDADES NA EXECUÇÃO DOS OPERADORES LÓGICOS
# 1 - ()
# 2 - Not
# 3 - And
# 4 - Or

#utilização do like
SELECT * FROM tbl_filme WHERE nome LIKE '2%'; #pesquisa filmes que começam com 2
SELECT * FROM tbl_filme WHERE nome LIKE '%2'; #pesquisa filmes que terminam com 2
SELECT * FROM tbl_filme WHERE nome LIKE '%2%'; #pesquisa filmes que tem 2 em algum momento
SELECT * FROM tbl_filme WHERE nome NOT LIKE '%2%' ORDER BY duracao ; #pesquisa filmes que NÃO tem 2 em algum momento

#UTILIZANDO IN
SELECT * FROM tbl_filme WHERE id = 3 OR id = 5 OR id = 8; #Pesquisando filmes com ids especificos utilizando operadores logicos
SELECT * FROM tbl_filme WHERE id in(3,5,8); #Pesquisando filmes com ids especificos utilizando SELECT IN

#RECURSOS PARA MANIPULAR STRINGS
SELECT id, nome, length(nome) as quantidade_letras FROM tbl_filme; #Retorna a quantidade de caracteres do nome de cada filme
SELECT avg(length(nome)) as quantidade_media FROM tbl_filme; #Retorna a quantidade media de caracteres do nome de cada filme

SELECT 	id, nome, concat('FILME: ', nome) as nome_filme, #Concatena dados em uma coluna
		concat('O filme', nome, ' é bem legal') as resenha
		FROM tbl_filme;

SELECT nome, ucase(nome) as nome_uppercase, lcase(nome) as nome_lowercase FROM tbl_filme; # Altera a caixa da string

SELECT substr(nome, 1, 4) FROM tbl_filme;

SELECT 	nome, concat(substr(nome, 1, 4), '...') as texto_recortado, #recorta a string com base na sua posição
		concat(substr(nome, 1, 4), '... (<a href="detalhes.html">Leia Mais</a>)') as texto_recortado2 #para facilitar o front eu posso mandar o select ja fortmatado para a página
		FROM tbl_filme;

#Limitar o resultado do select
SELECT * FROM tbl_filme ORDER BY nome desc LIMIT 2; #Limita a quantidade de registros
SELECT * FROM tbl_filme WHERE avaliacao > 4 ORDER BY nome asc LIMIT 5;
SELECT * FROM tbl_filme ORDER BY id desc LIMIT 5; #Pega o(s) ultimo(s) filme(s)
SELECT * FROM tbl_filme ORDER BY id desc LIMIT 5; #Pega os ultimos filmes e ordena por avaliação


#Contar a quantidade de registros
SELECT count(*) as quantidade FROM tbl_filme;

#Achar a menor/maior Quantidade e a media
SELECT nome, min(avaliacao) as menor_avaliacao FROM tbl_filme;
SELECT nome, max(avaliacao) as maior_avaliacao FROM tbl_filme;
SELECT nome, avg(avaliacao) as media_avaliacao FROM tbl_filme;

#Acha a soma dos valores
SELECT nome, sum(valor) as total FROM tbl_filme;

#format permite alterar uma formatação especifica ('pt-BR') unidade monetaria brasil
SELECT nome, concat('R$', format(sum(valor), 'pt-BR')) as total FROM tbl_filme;

#Faz o calculo de lucro de 30% da soma do valor 
SELECT nome, concat('R$', format(sum(valor) + ((30 * sum(valor)) / 100), 'pt-BR')) as total_lucro FROM tbl_filme;
# ------------- DELETE/DROP -------------
#Deleta o objeto de id 1 da tbl_filme
DELETE FROM tbl_filme WHERE id = 1; 
#Deleta uma tabela
DROP TABLE tbl_filme;

# ------------- UPDATE -------------
#Atualiza varios dados de uma tabela onde o id é 1
UPDATE tbl_filme set 
	nome = 'filme insano',
    data_lancamento = '2026-04-29',
    duracao = '02:00',
    sinopse = 'hell yeah',
    avaliacao = '10',
    valor = '100',
    capa = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZp2v6DBoAEgsFYIylzBhlT7p5gGmN4MQM7A&s'
 WHERE id = 1;
 
#atualiza um dado de uma tabela
UPDATE tbl_filme set nome = 'filme meh' WHERE id = 1;
UPDATE tbl_filme set valor = '60' WHERE avaliacao > 8;

# ------------- ALTER TABLE ------------- 
#Adiciona um novo atributo
ALTER TABLE tbl_filme
	ADD COLUMN teste VARCHAR(20) NOT NULL;

#Modifica a estrutura de um atributo atributo 
ALTER TABLE tbl_filme
	MODIFY COLUMN teste VARCHAR(200) NOT NULL;
    
#Permite renomear a escrita de um atributo e modifica a sua estrutura
ALTER TABLE tbl_filme
	CHANGE COLUMN teste teste_modificado INT NOT NULL;
    
#Permite apagar um atributo da tabela
ALTER TABLE tbl_filme
	DROP COLUMN teste_modificado;
    
#Criando um FK com ALter Table
CREATE TABLE tbl_cidade(
	id 		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 	VARCHAR(50) NOT NULL
);

ALTER TABLE tbl_cidade
	ADD COLUMN id_estado INT NOT NULL,
    ADD CONSTRAINT FK_ESTADO_CIDADE
    FOREIGN KEY(id_estado)
    REFERENCES tbl_cidade(id);

#Removendo uma chave estrangeira que está relacionado com outra tabela, #apagando primeiro a CONSTRAINT e depois o ATRIBUTO
ALTER TABLE tbl_cidade
	DROP FOREIGN KEY FK_ESTADO_CIDADE;

ALTER TABLE tbl_cidade
	DROP id_estado;

ALTER TABLE tbl_cidade
	CHANGE COLUMN avaliacao avaliacao DECIMAL(4,2) DEFAULT NULL;
        
 