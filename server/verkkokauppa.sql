DROP TABLE IF EXISTS order_line;
DROP TABLE IF EXISTS customer_order;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS product;


CREATE TABLE Tuote(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    image_url VARCHAR(255),
    category VARCHAR(255),
    FOREIGN KEY (category) REFERENCES Tuotekategoriat(category_name)
);

CREATE TABLE Asiakas(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    pw VARCHAR(255)
);

CREATE TABLE Asiakas_tilaus(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_date DATETIME NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Asiakas(id)
);

CREATE TABLE Tilaus_jono(
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Asiakas_tilaus(id),
    FOREIGN KEY (product_id) REFERENCES Tuote(id)
);


INSERT INTO Tuotekategoriat(category_name, category_description) VALUES ('Paidat', 'Pitkähihaisia ja lyhythihaisia paitoja'),
('Housut', 'Housuja ja shortseja'),('Alusvaatteet', 'Erilaisia alusvaatteita'),('Takit', 'Luontoon ja kaduille takkeja'), ('Hatut', 'Moneen eri vuodenaikaan sopivia päähineitä');


INSERT INTO Tuote (product_name, price, category) VALUES ('Trenssitakki', 120, 'Takit'),('Villa pipo', 30, 'Hatut'), ('Abibas Huppari', 55, 'Paidat'),
('Mustat farkut', 79, 'Housut'), ('Bokserit', 10, 'Alusvaatteet'), ('Punainen t-paita', 20, 'Paidat'), ('Toppi', 15, 'Paidat'), ('Treenishortsit', 25, 'Housut'),
('Lippalakki', 15, 'Hatut'), ('Kevyt untuvatakki', 100, 'Takit');
