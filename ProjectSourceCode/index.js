import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import path from "path";
import pg_promise from "pg-promise"
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import axios from "axios";

const app = express();
const pgp = pg_promise();

const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
});

const dbConfig = {
    host: 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
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
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    
});
