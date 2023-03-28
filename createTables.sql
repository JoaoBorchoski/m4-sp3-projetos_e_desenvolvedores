
CREATE TYPE os AS ENUM ('Windows', 'Linux', 'MacOs');

CREATE TABLE developer_infos (
	id SERIAL PRIMARY KEY,
	developerSince DATE NOT NULL,
	preferredOS os NOT NULL
);

SELECT * FROM developer_infos;

CREATE TABLE developers(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL 
);

SELECT * FROM developers;

CREATE TABLE projects(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	estimatedTime VARCHAR(20) NOT NULL,
	repository VARCHAR(120) NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE
);

SELECT * FROM projects;

CREATE TABLE technologies(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL
);

INSERT INTO technologies (name)
VALUES 
('JavaScript'),
('Python'),
('React'),
('Express.js'),
('HTML'),
('CSS'),
('Django'),
('PostgreSQL'),
('MongoDB');

 SELECT * FROM technologies;
 
CREATE TABLE projects_technologies(
	id SERIAL PRIMARY KEY,
	"addedIn" DATE NOT NULL
);

SELECT *  FROM projects_technologies;