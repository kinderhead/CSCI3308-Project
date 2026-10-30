
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);

CREATE TABLE lists (
    list_id SERIAL PRIMARY KEY,
    items TEXT[],
    name VARCHAR(255) NOT NULL
);

CREATE TABLE users_to_lists (
    email VARCHAR(255) NOT NULL,
    list_id INTEGER NOT NULL,
    PRIMARY KEY (email, list_id),
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
);
