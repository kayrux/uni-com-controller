const ws = require("ws");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// app.get("/", (req, res) => {
//   res.send("Hello World from Node.js server!");
// });

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Serve your app through the node server
// app.use(express.static(path.join(__dirname, "../dist/uni-com-controller")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/uni-com-controller/index.html"));
// });

const wss = new ws.WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  setTimeout(() => {
    broadcastOnlineClientsList();
  }, 500);
  console.log("connection received...");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    const parsedData = JSON.parse(data);
    const event = parsedData.event;
    switch (event) {
      case "identify":
        ws.clientType = parsedData.clientType;
        console.log("clientType established: %s", ws.clientType);
        ws.send(
          JSON.stringify({
            message: `connection established as ${ws.clientType}`,
          })
        );
        break;
      default:
    }
  });

  function broadcastOnlineClientsList() {
    console.log("broadcasting");
    const clientsOnline = JSON.stringify({
      online: [...wss.clients].map((c) => ({
        clientType: c.clientType,
      })),
    });
    wss.clients.forEach((client) => {
      client.send(clientsOnline);
    });
  }
});
