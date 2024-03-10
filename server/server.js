const ws = require("ws");
const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const { TranslationServiceClient } = require("@google-cloud/translate");

const PORT = process.env.PORT || 8080;
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";
const server = app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server listening at ${IP_ADDRESS} port: ${PORT}`);
});

const wss = new ws.WebSocketServer({ server });

let botLanguage = "en";
let controllerLanguage = "en";

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
        break;
      case "message":
        broadcastMessage(parsedData);
      case "language":
        botLanguage = parsedData.botLanguage;
        controllerLanguage = parsedData.controllerLanguage;
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

  async function broadcastMessage(data) {
    translateText(data.message)
      .then((translatedText) => {
        const formattedMessage = JSON.stringify({
          clientType: data.clientType,
          message: data.message,
          event: data.event,
          translatedText: translatedText,
        });
        console.log("broadcasting message: %s", formattedMessage);
        [...wss.clients]
          .filter(() => data.event !== "identify")
          .forEach((c) => c.send(formattedMessage));
      })
      .catch((error) => {
        console.error("Error translating text:", error);
      });
  }
});

/************************************************************************ Google Cloud Translate ************************************************************************/
// Instantiates a client
const translationClient = new TranslationServiceClient();

const projectId = "unicombot";
const location = "global";
async function translateText(text) {
  console.log("Translating...");
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: "text/plain", // mime types: text/plain, text/html
    targetLanguageCode: botLanguage,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  let translatedText = "";
  for (const translation of response.translations) {
    // console.log(`Translation: ${translation.translatedText}`);
    translatedText += translation.translatedText;
  }
  console.log(`Translation: ${translatedText}`);
  return translatedText;
}
