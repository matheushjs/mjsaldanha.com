CREATE TABLE users(
	id INTEGER UNIQUE AUTO_INCREMENT,
	username CHAR(128) PRIMARY KEY,
	password CHAR(96) NOT NULL,
	callname CHAR(128)
);


CREATE TABLE topics( /* News Politics, News Society, Runescape, Shinsekai Yori etc */
	shortdesc CHAR(50) PRIMARY KEY,
	longdesc TEXT NOT NULL DEFAULT "",
	url TEXT NOT NULL DEFAULT ""
);

CREATE TABLE textgenres( /* Casual conversations, news, etc */
	name CHAR(50) PRIMARY KEY,
	description TEXT NOT NULL DEFAULT ""
);

CREATE TABLE paragraphs(
	id INTEGER PRIMARY KEY,
	topic CHAR(50) NOT NULL, /* What is the topic related to the paragraph? */
	textgenre CHAR(50) NOT NULL, /* What is the textual genre? Casual conversation? News excerpt? */
	content TEXT NOT NULL DEFAULT "",
	takenFrom TEXT NOT NULL DEFAULT "", /* Where was the excerpt taken from? */
	CONSTRAINT FK_TOPIC
		FOREIGN KEY(topic)
		REFERENCES topics
		ON DELETE CASCADE,
	CONSTRAINT FK_GENRE
		FOREIGN KEY(textgenre)
		REFERENCES textgenres
		ON DELETE CASCADE
);
