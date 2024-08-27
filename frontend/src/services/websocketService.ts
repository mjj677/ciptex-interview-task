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
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }

  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case "task-update":
        console.log("Task update received:", message);
        break;
      default:
        console.warn("Unsupported message type:", JSON.stringify(message.type));
    }
  }

  sendMessage(message: string) {
    this.socket.send(JSON.stringify(message));
  }

  closeConnection() {
    this.socket.close();
  }
}

export default WebSocketService;
