import { glob } from "fs/promises";
import { app } from "./app.js";

// Importing Dependencies

const express = require('express');
const app = express();
const handlebars = require(`express-handlebars`);
const Handlebars = require('handlebars');
const bcrypt = require('bcryptjs');



for await (const i of glob('routes/**/*.js')) {
    console.log(`Loading route ${i}`);
    await import(`./${i}`);
}

app.listen(3000, () => {
    console.log("Server listening...");
});
