
import pg_promise from "pg-promise";

const pgp = pg_promise();
if (process.env.NODE_ENV === 'test' && (!process.env.POSTGRES_DB || !process.env.POSTGRES_DB.endsWith('_test'))) {
    throw new Error('Tests require a database name ending in _test');
}

const dbConfig = {
    host: process.env.POSTGRES_HOST || 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};

if (!globalThis.__pgPromiseDb) {
    globalThis.__pgPromiseDb = pgp(dbConfig);

    globalThis.__pgPromiseDb.connect()
        .then(obj => {
            console.log('Database connection successful');
            obj.done();
        })
        .catch(error => {
            console.log('ERROR:', error.message || error);
        });
}

const db = __pgPromiseDb;


/**
 * @param {string} email
 */
async function getUserByEmail(email) {
    return db.oneOrNone(
        'SELECT email, password, name FROM users WHERE email = $1',
        [email]
    );
}

/**
 * @param {{ email: string, name: string, passwordHash: string }} user
 */
async function createUser({ email, name, passwordHash }) {
    await db.none(
        'INSERT INTO users (email, password, name, salt) VALUES ($1, $2, $3, $4)',
        [email, passwordHash, name, '']
    );
}
/**
 * @param {{ email: string, tokenHash: string, expiresAt: Date }} session
 */
async function createSession({ email, tokenHash, expiresAt }) {
    await db.none(
        'INSERT INTO sessions (token_hash, email, expires_at) VALUES ($1, $2, $3)',
        [tokenHash, email, expiresAt]
    );
}

export { db, pgp, getUserByEmail, createUser, createSession };
