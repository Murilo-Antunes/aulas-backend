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
        
SELECT * FROM tbl_filme;
DELETE FROM tbl_filme;