import pg_promise from "pg-promise";
import { POSTGRES_DB, NODE_ENV, POSTGRES_USER, POSTGRES_PASSWORD } from '$app/env/private';

const pgp = pg_promise();
if (NODE_ENV === 'test' && (!POSTGRES_DB || !POSTGRES_DB.endsWith('_test'))) {
    throw new Error('Tests require a database name ending in _test');
}

const dbConfig = {
    host: 'db',
    port: 5432,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
};

const db = pgp(dbConfig);

db.connect()
    .then(obj => {
        console.log('Database connection successful');
        obj.done();
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

export { db };
