import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    const urlParts = request.url.split("/");
    switch (urlParts[1]) {
      case "index.html":
      case "":
        response.writeHead(200);
        return response.end(contents);
      case "random.html":
        response.writeHead(200);
        let htmlBody = "";
        let countRandom = Number.parseInt(urlParts[2]);
        if (Number.isNaN(countRandom)) {
          countRandom = 1;
        }

        for (let i = 0; i < countRandom; i++) {
          htmlBody += `<p>${Math.floor(100 * Math.random())}</p>`;
        }

        return response.end(`<html>${htmlBody}</html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV);
});
