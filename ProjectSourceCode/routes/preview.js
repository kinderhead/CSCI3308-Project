import { app } from '../app.js';

app.get('/preview', (req, res) => {
    res.render('pages/main.hbs');
});