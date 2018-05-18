// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });



wss.broadcast = function broadcast(data) {
wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({id: uuidv4(), ...JSON.parse(data)}));
        console.log({id: uuidv4(), ...JSON.parse(data)});
    });
};

let count = 0;
function randColour(){
  colour = ["#bd0404", "#044aea", "#383b6f", "#00c11a", "#034b59", "#c714df", "#694D75", "#452103", "#31081F", "#C98986"];
  returnColour = colour[count%7];
  count++;
  return returnColour;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log(wss.clients.size);
  console.log('Client connected');
  //console.log(wss.clients)
    ws.on('message', (data) => {
      const parsedData = JSON.parse(data);
      switch(parsedData.type){
        case "postMessage":
          parsedData.type = "incomingMessage";
          wss.broadcast(JSON.stringify(parsedData));
          console.log("sentmessage");
          break;

        case "postNotification":
          parsedData.type = "incomingNotification";
          console.log("sentnotfication");
          wss.broadcast(JSON.stringify(parsedData));
          break;

        case "userJoin":
          console.log(parsedData)
          parsedData.size = wss.clients.size;
          ws.send(JSON.stringify({id: uuidv4(), type: "colourSet", colour: randColour()}))
          wss.broadcast(JSON.stringify(parsedData));
          break;

      }

    });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});