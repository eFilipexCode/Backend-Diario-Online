create table users (
	id INT unsigned AUTO_INCREMENT,
    email varchar(100) not null unique,
    name varchar(255) not null,
    username varchar(255) not null unique,
    password varchar(255) not null,
    primary key (id)
);