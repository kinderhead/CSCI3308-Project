import { glob } from "fs/promises";
import { app } from "./app.js";

// Importing Dependencies


for await (const i of glob('routes/**/*.js')) {
    console.log(`Loading route ${i}`);
    await import(`./${i}`);
}

// Remember, put routes in the routes folder like mentioned in the README

app.listen(3000, () => {
    console.log("Server listening...");
});
