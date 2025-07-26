-- Task 1: Insert Tony Stark
INSERT INTO account (first_name, last_name, email, password)
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Task 2: Update Tony Stark account_type to Admin
UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';
-- Task 3: Delete Tony Stark
DELETE FROM account
WHERE email = 'tony@starkent.com';
-- Task 4: Update GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- Task 5: Select make, model, and classification name for Sport category
SELECT inv_make,
    inv_model,
    classification_name
FROM inventory
    INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';
-- Task 6: Update image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');