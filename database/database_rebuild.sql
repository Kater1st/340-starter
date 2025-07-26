-- database_rebuild.sql
-- STEP 1: Drop existing tables (if needed)
DROP TABLE IF EXISTS inventory, classification, account CASCADE;
DROP TYPE IF EXISTS account_type_enum;

-- STEP 2: Create custom TYPE
CREATE TYPE account_type_enum AS ENUM ('Admin', 'User');

-- STEP 3: Create tables
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_description TEXT,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255),
    classification_id INT REFERENCES classification(classification_id)
);

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type account_type_enum DEFAULT 'User'
);

-- STEP 4: Insert sample data into classification
INSERT INTO classification (classification_name) VALUES
('SUV'),
('Sport'),
('Truck');

-- STEP 5: Insert sample data into inventory
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id) VALUES
('GM', 'Hummer', 'A rugged SUV with small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 1),
('Toyota', 'Supra', 'A fast sports car', '/images/supra.jpg', '/images/supra-thumb.jpg', 2),
('Ford', 'F-150', 'A reliable truck', '/images/f150.jpg', '/images/f150-thumb.jpg', 3);

-- STEP 6: Insert sample account
INSERT INTO account (first_name, last_name, email, password)
VALUES ('John', 'Doe', 'john@example.com', 'password123');

-- STEP 7: Additional Queries (From Task 1 - Queries 4 & 6)
-- Query 4
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');