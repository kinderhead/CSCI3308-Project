import { glob } from "fs/promises";
import { app } from "./app.js";

for await (const i of glob('routes/**/*.js')) {
    console.log(`Loading route ${i}`);
    await import(`./${i}`);
}

app.listen(3000, () => {
    console.log("Server listening...");
});
