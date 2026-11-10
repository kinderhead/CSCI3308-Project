import {app} from '../app.js';

app.get('/preview', async (req, res) => {
    return res.render('pages/settings.hbs');
});