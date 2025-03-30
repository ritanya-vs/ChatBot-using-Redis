class WebSocketManager {
    constructor(sessionToken, onMessageReceived) {
      this.ws = new WebSocket(`ws://127.0.0.1:8000/ws?session_token=${sessionToken}`);
      
      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        onMessageReceived(message);
      };
    }
  
    sendMessage(recipient, message) {
      this.ws.send(JSON.stringify({ recipient, message }));
    }
  
    closeConnection() {
      this.ws.close();
    }
  }
  
  export default WebSocketManager;
  