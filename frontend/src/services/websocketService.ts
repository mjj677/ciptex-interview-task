interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

class WebSocketService {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.socket.onmessage = (event) => {
        console.log(event.data, "<<<<<<<");
      try {
        const data = event.data;
        if (typeof data === "string" && data.trim() !== "") {
          console.log("Received WebSocket message:", data);
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } else {
          console.warn("Received non-string or empty WebSocket message:", data);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }

  private handleMessage(message: WebSocketMessage) {
    console.log("Handling message:", message);
    switch (message.type) {
      case "task-update":
        console.log("Task update received:", message);
        break;
      default:
        console.warn("Unsupported message type:", JSON.stringify(message.type));
    }
  }

  sendMessage(message: WebSocketMessage) {
    try {
      this.socket.send(JSON.stringify(message));
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
    }
  }

  closeConnection() {
    this.socket.close();
  }

  onMessage(callback: (message: WebSocketMessage) => void) {
    this.socket.onmessage = (event) => {
      try {
        if (event.data) {
          const message: WebSocketMessage = JSON.parse(event.data);
          callback(message);
        } else {
          console.warn("Received empty or invalid message data");
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };
  }
}

export default WebSocketService;
