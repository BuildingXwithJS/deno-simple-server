import { readJson } from "https://deno.land/std/fs/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", context => {
    context.response.body = "Hello world!";
  })
  .get("/data", async context => {
    const data = await readJson("./data.json");
    context.response.body = data;
  })
  .get('/fetch', async context => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto/').then(res => res.json());
    context.response.body = JSON.stringify(res, null, 4);
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen("0.0.0.0:8000");
