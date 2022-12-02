create table if not exists users (
    id integer primary key autoincrement,
    username text not null unique,
    password text not null,
    email text not null
);

create table if not exists houses (
    id integer primary key autoincrement,
    userId integer not null,
    name text not null,
    address text not null,
    image text not null,

    foreign key (userId) references users(id)
);

create table if not exists events (
    id integer primary key autoincrement,
    houseId integer not null,
    name text not null,
    description text not null,
    startDate text not null,
    endDate text not null,
    repeat text not null,
    repeatUntil text,

    foreign key (houseId) references houses(id)
);

create table if not exists divisions (
    id integer primary key autoincrement,
    houseId integer not null,
    name text not null,

    foreign key (houseId) references houses(id)
);

create table if not exists item (
    id integer primary key autoincrement,
    divisionId integer not null,
    name text not null,

    foreign key (divisionId) references divisions(id)
);