// Javscript instead of typescript to work with the tests

import pg_promise from "pg-promise";

const pgp = pg_promise();
if (process.env.NODE_ENV === 'test' && (!process.env.POSTGRES_DB || !process.env.POSTGRES_DB.endsWith('_test'))) {
    throw new Error('Tests require a database name ending in _test');
}

const dbConfig = {
    host: 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
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

export { db, pgp };
