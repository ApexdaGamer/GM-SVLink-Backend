const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 7774})
const sids = {}
let csid = 0

const gkbv = (object, value) => {return Object.keys(object).find(key => object[key] === value)}

wss.on('connection', async (ws) => {
    ws.on('message', (msg) => {
        msg = msg.toString()
        // console.log("received message '" + msg + "'")
        // this was slowing down the server with the sheer amount of text
        if (msg.startsWith("direct")) {
            const args = msg.split(" ")
            args.shift()
            const sid = args.shift()
            if (sids[sid].readyState == 1) {
                sids[sid].send(`${sid} ${args.join(" ")}`)
            }
        } else {
            wss.clients.forEach((client) => {
                if (client != ws && client.readyState == 1) {
                    client.send(`${gkbv(sids, ws)} ${msg}`)
                }
            })
        }
    })
	ws.on("error", function(err) {
		console.log("connection error")
		console.log(err.stack)
        wss.clients.forEach((client) => {
            if (client != ws && client.readyState == 1) {
                client.send(`${gkbv(sids, ws)} svd`)
            }
        })
	});
    ws.on('close', () => {
        console.log("connection closed")
        wss.clients.forEach((client) => {
            if (client != ws && client.readyState == 1) {
                client.send(`${gkbv(sids, ws)} svd`)
            }
        })
    })
    console.log("connection accepted")
    ws.send(`-1 sid ${csid}`)
    sids[csid.toString()] = ws
    console.log("sid assigned: " + csid.toString())
    csid += 1
})

wss.on('listening', () => {
    console.log("WS Server running on port 7774")
})