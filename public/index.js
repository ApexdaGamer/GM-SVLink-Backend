var msgBox = document.getElementById("message");
var logs = document.getElementById("logs");

const sleep = ms => new Promise(r => setTimeout(r, ms));

let userIp;
fetch('https://api.ipify.org?format=text').then(res => res.text()).then(text => userIp = text);

await sleep(1000);

let wsURI;
if (userIp == "75.164.45.102")
    wsURI = "ws://10.1.1.11:7776";
else
    wsURI = "ws://minecraft.wittnet.net:7776";
var ws = new WebSocket(wsURI)
console.log("connected from " + userIp + " to " + wsURI)
ws.onmessage = (event) => {
    console.log("recv " + event.data);
    var log = document.createElement("p");
    log.innerHTML = "recv " + event.data;
    logs.appendChild(log);
}

document.getElementById("send").onclick = () => {
    if (ws.readyState == ws.OPEN) {
        ws.send(msgBox.value);
        console.log("send " + msgBox.value);
        var log = document.createElement("p");
        log.innerHTML = "send " + msgBox.value;
        logs.appendChild(log);
    } else {
        console.log("Websocket is not open!");
    }
}