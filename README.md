# GrocerWees

## Development

Make sure you fill out `.env` from `.env.template`

### Routing

Put individual routes in the `routes` folder. Each file should ideally only have one path, and it's fine to put multiple HTTP methods for the same route in the same file.

Route template:

```js
import { app } from "../app.js";

app.get('/', (req, res) => {
    res.render("pages/main");
});
```

`app.js` exports `app`, `db`, and `hbs` (Handlebars).
