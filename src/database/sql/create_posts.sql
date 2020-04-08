create table posts (
	id INT unsigned not null auto_increment,
    title varchar(255) not null,
    description varchar(255),
    content text not null,
    public boolean not null,
    user_id int unsigned not null,
    primary key (id),
    foreign key (user_id) references users (id)
    )