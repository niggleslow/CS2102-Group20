# POPULATE THE TABLES WITH THESE DATA
# TESTED WITH POSTGRESQL - ABLE TO INSERT WITHOUT ANY PROBLEMS


# ADMINISTRATORS

INSERT INTO administrators(username, password) VALUES ('Alex', 'admin1');

INSERT INTO administrators(username, password) VALUES ('Alfred', 'admin2'); 

INSERT INTO administrators(username, password) VALUES ('Abigail', 'admin3');



# USERS

INSERT INTO users(username, password) VALUES ('Benedict', 'user1');

INSERT INTO users(username, password) VALUES ('Bob', 'user2');

INSERT INTO users(username, password) VALUES ('Betty', 'user3');

INSERT INTO users(username, password) VALUES ('Britney', 'user4');

INSERT INTO users(username, password) VALUES ('Beverly', 'user5');



# ENTREPRENEURS

INSERT INTO entrepreneurs(username, password) VALUES ('Charles', 'entre1');

INSERT INTO entrepreneurs(username, password) VALUES ('Calvin', 'entre2');

INSERT INTO entrepreneurs(username, password) VALUES ('Chaplin', 'entre3');

INSERT INTO entrepreneurs(username, password) VALUES ('Cathy', 'entre4');

INSERT INTO entrepreneurs(username, password) VALUES ('Caitlyn', 'entre5');



# PROJECTS

INSERT INTO projects(title, description, amount, start_date, duration, category, remaining_amount, e_name) VALUES ('World of Kappa', 'An exciting MMORPG where you will be able to experience the immersive world of Kappa with your friends!', 350000, '6-6-2016', 30, 'game', 350000, 'Charles');

INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('Charles', 'World of Kappa');


INSERT INTO projects(title, description, amount, start_date, duration, category, remaining_amount, e_name) VALUES ('Escape from Crazy Bear Island!', 'A survival game where you will have to rely on your wits in over to escape this island full of crazy bears!', 100000, '5-6-2016', 60, 'game', 100000, 'Cathy');

INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('Cathy', 'Escape from Crazy Bear Island!');


INSERT INTO projects(title, description, amount, start_date, duration, category, remaining_amount, e_name) VALUES ('Create-a-cup', 'Tired of drinking from a plain old cup? With Create-a-cup you will be able to design and create your very own cup!', 200000, '5-6-2016', 25, 'custom', 200000, 'Chaplin');

INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('Chaplin', 'Create-a-cup')


INSERT INTO projects(title, description, amount, start_date, duration, category, remaining_amount, e_name) VALUES ('Sounds Good', 'With patented audio technology, Sounds Good is able to provide top quality audio equipment to audio enthusiasts all over the world!', 500000, '7-4-2016', 90, 'audio', 500000, 'Caitlyn');

INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('Caitlyn', 'Sounds Good')


INSERT INTO projects(title, description, amount, start_date, duration, category, remaining_amount, e_name) VALUES ('Food Cheetah', 'A food delivery service that will be able to provide lightning fast delivery times from 100s of partnered food outlets!', 400000, '2-4-2016', 45, 'food', 400000, 'Calvin');

INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('Calvin', 'Food Cheetah')



# Funding

INSERT INTO funding(username, amount_pledged, project_title) VALUES ('Benedict', 322, 'Create-a-cup');

UPDATE projects SET remaining_amount=remaining_amount - 322 WHERE title='Create-a-cup';


INSERT INTO funding(username, amount_pledged, project_title) VALUES ('Bob', 69, 'Food Cheetah');

UPDATE projects SET remaining_amount=remaining_amount - 69 WHERE title='Food Cheetah';


INSERT INTO funding(username, amount_pledged, project_title) VALUES ('Betty', 100, 'World of Kappa');

UPDATE projects SET remaining_amount=remaining_amount - 100 WHERE title='World of Kappa';


INSERT INTO funding(username, amount_pledged, project_title) VALUES ('Britney', 200, 'World of Kappa');

UPDATE projects SET remaining_amount=remaining_amount - 200 WHERE title='World of Kappa';


INSERT INTO funding(username, amount_pledged, project_title) VALUES ('Beverly', 644, 'World of Kappa');

UPDATE projects SET remaining_amount=remaining_amount - 644 WHERE title='World of Kappa';