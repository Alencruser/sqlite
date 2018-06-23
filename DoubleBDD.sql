CREATE TABLE Post(
	id_Post INT NOT NULL AUTO_INCREMENT,
    titre VARCHAR(45),
    corps VARCHAR(500),
    date_Post DATE,
    id_User INT,
	PRIMARY KEY(id_Post)
);

CREATE TABLE Commentary(
    id_Commentary INT NOT NULL AUTO_INCREMENT,
    corps_commentaires VARCHAR (500),
    id_User INT,
    date_Commentary DATE,
    id_Post INT,
    PRIMARY KEY(id_Commentary)
);

ALTER TABLE Commentary ADD CONSTRAINT FOREIGN KEY (id_Post) REFERENCES Post (id_Post);
