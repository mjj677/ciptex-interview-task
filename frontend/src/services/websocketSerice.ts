class WebSocketService {
    private socket: WebSocket;

    constructor(url: string) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        this.socket.onmessage = (event) => {
            console.log('Message received:', event.data);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };
    }

    sendMessage(message: string) {
        this.socket.send(message);
    }

    closeConnection() {
        this.socket.close();
    }
}

export default WebSocketService;