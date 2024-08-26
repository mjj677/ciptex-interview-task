import { Server as WebSocketServer } from "ws";
import { Server } from "http";

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
