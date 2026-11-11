CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS lists (
    list_id SERIAL PRIMARY KEY,
    items TEXT[],
    invites TEXT[],
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_to_lists (
    email VARCHAR(255) NOT NULL,
    list_id INTEGER NOT NULL,
    PRIMARY KEY (email, list_id),
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
);

CREATE TABLE IF NOT EXISTS sessions (
    token_hash VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS sessions_email_idx ON sessions(email);
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);