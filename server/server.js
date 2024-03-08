const ws = require("ws");
const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";
const server = app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server listening at ${IP_ADDRESS} port: ${PORT}`);
});

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
