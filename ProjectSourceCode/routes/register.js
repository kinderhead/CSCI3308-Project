import { app } from "../app.js";

app.get('/register', (req, res) => {
    res.render('pages/register');
});