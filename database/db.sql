CREATE DATABASE database_links;

USE database_links

--TABLA DE USUARIOS
CREATE TABLE users(
    id INt(11) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    full_name VARCHAR(20) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE users
    MODIFY full_name VARCHAR(20) NULL;

 DESCRIBE users;

--LINK TABLES
 CREATE TABLE links (
    id INT(11) NOT NULL ,
    Titulo VARCHAR(150) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    Description TEXT,
    categoria VARCHAR(55) NOT NULL,
    user_id INT(11) ,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
 );

 ALTER TABLE links 
    ADD PRIMARY KEY(id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

