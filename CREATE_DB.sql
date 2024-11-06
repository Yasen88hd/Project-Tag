create table users
(
    id           int unsigned auto_increment
        primary key,
    username     varchar(20)          not null UNIQUE,
    password     char(96)             not null,
    isAdmin      BOOLEAN not null default false,
    isOnline      BOOLEAN not null default false,
    sessionId   char(20)
);

# create table user_sids
# (
#     userId int unsigned,
#     sid char(20) not null,
#     primary key (userId, sid),
#     foreign key (userId) references users(id)
# );

CREATE TABLE friends
(
    firstUserId int unsigned NOT NULL,
    secondUserId int unsigned NOT NULL,
    created DATETIME DEFAULT now() NOT NULL,
    primary key (firstUserId, secondUserId),
    foreign key (firstUserId) REFERENCES users(id),
    foreign key (secondUserId) REFERENCES users(id)
);

CREATE TABLE notifications
(
    id int unsigned auto_increment primary key,
    receiverId int unsigned NOT NULL,
    type enum('friend_request', 'information', 'warning') not null,
    isSeen bool default FALSE NOT NULL,
    created DATETIME DEFAULT now() NOT NULL,
    foreign key (receiverId) REFERENCES users(id)
);

CREATE TABLE information_notifications
(
    id int unsigned primary key,
    title tinytext NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES notifications(id)
);

CREATE TABLE warning_notifications
(
    id int unsigned primary key,
    title tinytext NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES notifications(id)
);

CREATE TABLE friend_request_notifications
(
    notificationId int unsigned primary key,
    senderId int unsigned NOT NULL,
    FOREIGN KEY (notificationId) REFERENCES notifications(id),
    FOREIGN KEY (senderId) REFERENCES users(id)
);

CREATE TABLE games
(
    id int unsigned primary key auto_increment,
    `name` tinytext not null,
    started datetime,
    duration int
);

CREATE TABLE game_code
(
    code VARCHAR(8) primary key,
    gameId int unsigned,
    foreign key (gameId) references games(id)
);

CREATE TABLE game_players
(
    gameId int unsigned,
    playerId int unsigned,
    team enum('Runners', 'Seekers'),
    lastLocation POINT,
    settings JSON not null DEFAULT '{}',
    primary key (gameId, playerId),
    foreign key (gameId) references games(id),
    foreign key (playerId) references users(id)
);

CREATE TABLE game_catches
(
    id int unsigned primary key auto_increment,
    gameId int unsigned not null,
    catcherId int unsigned not null,
    victimId int unsigned not null,
    time time not null default now(),
    foreign key (gameId) references games(id),
    foreign key (catcherId) references users(id),
    foreign key (victimId) references users(id)
);