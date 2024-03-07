import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import route from "./router.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//  app.use(checkProcess);

app.use("/test", route);

app.listen(8000, () => {
  console.log("Server on port 8000");
});
