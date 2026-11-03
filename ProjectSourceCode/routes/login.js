import { app } from "../app.js";

app.get('/login', (req, res) => {
    res.render('pages/login');
});