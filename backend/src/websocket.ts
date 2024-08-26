import { Server as WebSocketServer } from "ws";
import { Server } from "http";

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "task-update") {
          wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        } else {
          console.warn("Unsupported message type:", data.type);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
        ws.send(JSON.stringify({ error: "Invalid message format" }));
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.on("close", (code, reason) => {
      console.log(`Client disconnected. Code: ${code}, Reason: ${reason}`);
    });

    ws.send(JSON.stringify({ message: "Welcome to the WebSocket server" }));
  });

  wss.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });
};
