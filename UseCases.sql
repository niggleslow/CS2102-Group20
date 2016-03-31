#SAMPLE USE CASES:

# -- Signing up --

# Users : e.g. USERNAME = Bressan and PASSWORD = CS2102
INSERT INTO users(username, password) VALUES ('Bressan', 'CS2102')

INSERT INTO entrepreneurs(username, password) VALUES ('Bressan', 'CS2102')

# -- Creation of Project (Entrepreneurs only) -- 

# Example project details:
# entrepreneur_name = Stephane
# title = Earn REAL Money!
# description = Kappa
# startdate = 30-03-2016
# duration = 30 (days)
# catergories = others
# funding = 1000000 (dollars)
INSERT INTO projects(title, description, startdate, duration, catergories, funding) VALUES ('Earn REAL Money!', 'Kappa', '30-03-2016', '30', 'others', '1000000')
INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('Stephane', 'Earn REAL Money!')

# -- Searching for Project (Users only) --

#Examples of searches:

# Searching by categories: (category used here is 'others')
SELECT p.title 
FROM projects p
WHERE p.categories = 'others'

# Searching by entrepreneur: (entrepreneur name is 'Stephane')
SELECT p.project_name
FROM create_project p
WHERE p.entrepreneur_name = 'Stephane'

# Searching by multiple conditions: (funding amount and category and entrepreneur name)
SELECT p.title
FROM projects p, create_project c
WHERE p.funding <= 20000 AND p.categories = 'recreation' AND p.title = c.project_title AND c.entrepreneur_name = 'Stephane'


# -- Funding a Project (Users only) --

# Example of user funding a project:
INSERT INTO funding(user, project_title, amount_pledged) VALUES ('CHANG EE CHIEN', 'Earn REAL Money!', 322);
UPDATE projects SET funding= (funding - 322) WHERE title = 'Earn REAL Money!';

# -- Modifications (Administrators only) --

# Removing Project:

# Specific Project- (Title)
DELETE FROM project WHERE title = 'Earn REAL Money!'