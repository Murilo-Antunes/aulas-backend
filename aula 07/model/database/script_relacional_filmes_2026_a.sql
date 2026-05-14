USE db_filmes_20261_a;

show tables;

CREATE TABLE IF NOT EXISTS tbl_filme_genero(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILMEGENERO
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme(id),
    
    CONSTRAINT FK_GENERO_FILMEGENERO
    FOREIGN KEY (id_genero)
    REFERENCES tbl_genero(id)
);

CREATE TABLE IF NOT EXISTS tbl_filme_diretor(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_diretor INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILMEDIRETOR
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme(id),
    
    CONSTRAINT FK_DIRETOR_FILMEDIRETOR
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor(id)
);
CREATE TABLE IF NOT EXISTS tbl_diretor_atividade(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_diretor INT NOT NULL,
    id_atividade INT NOT NULL,
    
    CONSTRAINT FK_DIRETOR_DIRETORATIVIDADE
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor(id),
    
    CONSTRAINT FK_ATIVIDADE_DIRETORATIVIDADE
    FOREIGN KEY (id_atividade)
    REFERENCES tbl_atividade(id)    
);

CREATE TABLE IF NOT EXISTS tbl_ator_atividade(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ator INT NOT NULL,
    id_atividade INT NOT NULL,
    
    CONSTRAINT FK_ATOR_ATORATIVIDADE
    FOREIGN KEY (id_ator)
    REFERENCES tbl_ator(id),
    
    CONSTRAINT FK_ATIVIDADE_ATORATIVIDADE
    FOREIGN KEY (id_atividade)
    REFERENCES tbl_atividade(id)
);

CREATE TABLE IF NOT EXISTS tbl_ator_nacionalidade(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ator INT NOT NULL,
    id_nacionalidade INT NOT NULL,
    
    CONSTRAINT FK_ATOR_ATORANACIONALIDADE
    FOREIGN KEY (id_ator)
    REFERENCES tbl_ator(id),
    
    CONSTRAINT FK_NACIONALIDADE_ATORNACIONALIDADE
    FOREIGN KEY (id_nacionalidade)
    REFERENCES tbl_nacionalidade(id)
);

CREATE TABLE IF NOT EXISTS tbl_diretor_nacionalidade(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_diretor INT NOT NULL,
    id_nacionalidade INT NOT NULL,
    
    CONSTRAINT FK_DIRETOR_DIRETORNACIONALIDADE
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor(id),
    
    CONSTRAINT FK_NACIONALIDADE_DIRETORNACIONALIDADE
    FOREIGN KEY (id_nacionalidade)
    REFERENCES tbl_nacionalidade(id)
);

ALTER TABLE tbl_filme
	ADD COLUMN id_classificacao int not null,
    ADD CONSTRAINT FK_CLASSIFICACAO_FILME
		FOREIGN KEY (id_classificacao)
		REFERENCES tbl_classificacao_indicativa(id);
        
desc tbl_classificacao_indicativa;
        
SELECT * FROM tbl_filme;

#Adicionando dados entre tabelas relacionadas
SELECT tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.data_lancamento, tbl_filme.capa, tbl_classificacao_indicativa.classificacao as nome_classificacao
FROM tbl_filme
	inner join tbl_classificacao_indicativa
		on tbl_classificacao_indicativa.id = tbl_filme.id_classificacao;


DELETE FROM tbl_filme;

INSERT INTO tbl_filme (nome, data_lancamento, duracao, sinopse, avaliacao, valor, capa, id_classificacao)
                VALUES (
					"O Poderoso Chefão",
                    "1972-03-24",
                    "02:55:00",
                    "Don Vito Corleone (Marlon Brando) é o chefe de uma família de Nova York que está feliz, pois Connie (Talia Shire), sua filha, se casou com Carlo (Gianni Russo). Porém, durante a festa, Bonasera (Salvatore Corsitto) é visto no escritório de Don Corleone pedindo justiça, vingança na verdade contra membros de uma quadrilha, que espancaram barbaramente sua filha por ela ter se recusado a fazer sexo para preservar a honra. ",
                    "6",
                    "100",
                    "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg",
                    12
                );