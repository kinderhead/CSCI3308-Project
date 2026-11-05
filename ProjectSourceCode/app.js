import bodyParser from "body-parser";
import express from "express";
import handlebars from "express-handlebars";
import pg_promise from "pg-promise";

const app = express();
const pgp = pg_promise();

const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials'
});

const database = process.env.POSTGRES_DB;
if (process.env.NODE_ENV === 'test' && (!database || !database.endsWith('_test'))) {
    throw new Error('Tests require a database name ending in _test');
}

const dbConfig = {
    host: 'db',
    port: 5432,
    database,
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

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

export { app, db, pgp, hbs };
