CREATE TABLE Post(
	id_Post INT NOT NULL AUTO_INCREMENT,
    titre VARCHAR(45),
    corps VARCHAR(10000),
    date_Post DATE,
    id_User INT,
	PRIMARY KEY(id_Post)
);

CREATE TABLE Commentaire(
    id_Commentaire INT NOT NULL AUTO_INCREMENT,
    corps_Commentaire VARCHAR (500),
    date_Commentaire DATE,
    id_Post INT,
    id_User INT,
    PRIMARY KEY(id_Commentaire)
);

ALTER TABLE Commentaire ADD CONSTRAINT FOREIGN KEY (id_Post) REFERENCES Post (id_Post);

