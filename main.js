const WebSocket = require('ws');
const bodyParser = require('body-parser');

const wss = new WebSocket.Server({port: 7776})

wss.on('connection', async (ws) => {
    ws.on('message', (msg) => {
        console.log("received message '" + msg + "'")
        wss.clients.forEach((client) => {
            if (client != ws && client.readyState != 2) {
                client.send(msg)
            }
        })
    })
	ws.on("error", function(err) {
		console.log("caught this stupid error right here")
		console.log(err.stack)
	});
    ws.on('close', () => {
        console.log("connection closed")
    })
    console.log("connection accepted")
})

wss.on('listening', () => {
    console.log("WS Server running on port 7776")
})