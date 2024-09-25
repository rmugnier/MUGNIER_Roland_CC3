import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch((error) => {
      console.error(error);
      if (error.code == "ENOENT") response.writeHead(404);
      else response.writeHead(500);
      response.end("<html><h1>Error!<h1></html>");
    });
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
