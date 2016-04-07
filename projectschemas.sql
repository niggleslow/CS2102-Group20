# SCHEMA

CREATE TABLE administrators(
	username varchar(128) PRIMARY KEY,
	password varchar(64) NOT NULL
);

CREATE TABLE users(
	username varchar(128) PRIMARY KEY,
	password varchar(64) NOT NULL
);

CREATE TABLE entrepreneurs(
	username varchar(128) PRIMARY KEY,
	password varchar(64) NOT NULL
);

CREATE TABLE projects (
	title VARCHAR(128) UNIQUE,
	description VARCHAR(256),
	amount INT CHECK (amount > 0) NOT NULL,
	start_date DATE NOT NULL,
	duration INT CHECK (duration > 0) NOT NULL,
	category VARCHAR(128),
	remaining_amount INT CHECK (amount > 0) NOT NULL,
	e_name VARCHAR(128),
	PRIMARY KEY(title, e_name),
	FOREIGN KEY(e_name) REFERENCES entrepreneurs(username) ON DELETE CASCADE
);

CREATE TABLE create_project (
	entrepreneur_name varchar(128),
	project_title varchar(128),
	PRIMARY KEY(entrepreneur_name, project_title),
	FOREIGN KEY(entrepreneur_name) REFERENCES entrepreneurs(username) ON DELETE CASCADE,
	FOREIGN KEY(project_title) REFERENCES projects(title) ON DELETE CASCADE
);

CREATE TABLE funding (
	username varchar(128),
	project_title varchar(128),
	amount_pledged int,
	PRIMARY KEY(username, project_title),
	FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE,
	FOREIGN KEY(project_title) REFERENCES projects(title) ON DELETE CASCADE
);