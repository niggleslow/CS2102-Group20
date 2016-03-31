#	CS2102 Project: Group 20

#	Outline:

#	Topic B, Crowdfunding: the system is a catalogue of projects looking for crowdfunding.
#	Entrepreneurs can advertise their projects (title, description, start date, duration, keywords or
#	categories, amount of funding sought). Users can browse the projects and fund projects. The
#	system tracks the current amount of funding raised. Administrators can create, modify and delete
#	all entries. Please refer to www.globalgiving.org, fundanything.com or other crowdfunding sites
#	for examples and data.

#	Possible Schemas:

CREATE TABLE administrator (
	
);

CREATE TABLE project (
	title varchar(9) PRIMARY KEY,
	description varchar(256),
	startdate date,
	duration int,
	#keywords varchar(256),
	#catergories varchar(256),
	funding int,
);

CREATE TABLE users (

);

CREATE TABLE entrepreneurs (
	name varchar(256),
);