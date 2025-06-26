const WebSocket = require('ws');
const bodyParser = require('body-parser');

const wss = new WebSocket.Server({port: 7774})

let csid = 0

wss.on('connection', async (ws) => {
    ws.on('message', (msg) => {
        console.log("received message '" + msg + "'")
        //if (msg.startsWith("direct")) {
        //    const sid = Number(msg.substring(7,8))
        //}
        wss.clients.forEach((client) => {
            if (client != ws && client.readyState != 2) {
                client.send(msg)
            }
        })
    })
	ws.on("error", function(err) {
		console.log("connection error")
		console.log(err.stack)
	});
    ws.on('close', () => {
        console.log("connection closed")
    })
    ws.send("sid " + csid.toString())
    csid += 1
    console.log("connection accepted")
})

wss.on('listening', () => {
    console.log("WS Server running on port 7774")
})