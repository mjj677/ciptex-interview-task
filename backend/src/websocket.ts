import { Server as WebSocketServer } from "ws";
import { Server } from "http";

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const origin = req.headers.origin;

    if (origin !== "http://localhost:5173") {
      ws.close(1008, "Origin not allowed");
      return;
    }

    console.log("Client connected from origin:", origin);

    ws.on("message", (message) => {
      try {
        console.log("Received message:", message.toString());
        const data = JSON.parse(message.toString());


        if (data.type === "task-update") {
          wss.clients.forEach((client) => {
            delete data.title;
            console.log(JSON.stringify(data), "<<<< message just before it's sent")
            client.send(JSON.stringify(data));
          });
        } else {
          console.warn("Unsupported message type:", data.type);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
        ws.send(JSON.stringify({ error: "Invalid message format" }));
      }
    });

    ws.on("close", (code, reason) => {
      console.log(`Client disconnected. Code: ${code}, Reason: ${reason}`);
    });

    ws.send(JSON.stringify({ message: "Welcome to my WebSocket server" }));

    ws.send(JSON.stringify({ type: "task-update", taskId: "1", status: "complete"}));
  });

  wss.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });
};
