import express from "express";
import morgan from "morgan";

const host = "localhost";
const port = 8000;

const app = express();

if (app.get("env") === "development") app.use(morgan("dev"));

app.use(express.static("static"));

app.set("view engine", "ejs");

app.get(["/"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", async function (request, response, next) {
  const length = request.params.nb;
  const welcome = "Générateur de chiffres aléatoires";
  const numbers = Array.from({ length }).map((_) =>
    Math.floor(100 * Math.random())
  );
  return response.render("random", { numbers, welcome });
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`
  )
);

console.info(`File ${import.meta.url} executed.`);
