const udp = require('dgram');
const server = udp.createSocket('udp4');

const gkfv = (object, value) => {return Object.keys(object).find(key => object[key] === value)}

const cs = {}
let csid = 0

const ef = (err) => {
    if (err) {
        console.log(`connection errored: ${err}`)
        let sid = -1
        Object.values(cs).forEach(c => {
            if (c.a == info.address && c.p == info.port) {
                sid = gkfv(cs, c)
                cs[sid] = null
            }
        });
        console.log(`connection error handled for server ${sid}`)
    }
}

server.on('error', function(error){
    console.log('UDP Server error: ' + error);
    server.close();
});

server.on('message', function(msg,info) {
    msg = msg.toString()
    console.log(`received msg '${msg}'`);
    if (msg == "sup") {
        console.log("connection accepted")
        cs[csid] = {
            p: info.port,
            a: info.address
        }
        server.send(Buffer.from(`-1 sid ${csid}`), info.port, info.address, ef)
        console.log(`sid assigned: ${csid}`)
        csid += 1
    } else if (msg == "bye") {
        console.log("connection closed")
        let sid = -1
        Object.values(cs).forEach(c => {
            if (c && c.a == info.address && c.p == info.port) {
                sid = gkfv(cs, c)
                cs[sid] = null
            }
        });
        Object.values(cs).forEach(c => {
            if (c)
                server.send(Buffer.from(`${sid} svd`), c.p, c.a, ef)
        })
        console.log(`disconnection handled for server ${sid}`)
    } else if (msg.startsWith("direct")) {
        const args = msg.split(" ")
        args.shift()
        const sid = args.shift()
        const c = cs[sid]
        if (c)
            server.send(Buffer.from(`${sid} ${args.join(" ")}`), c.p, c.a, ef)
    } else {
        Object.values(cs).forEach(c => {
            if (c && c.p != info.port && c.a != info.address) 
                server.send(Buffer.from(`${gkfv(cs, c)} ${msg}`), c.p, c.a, ef)
        })
    }
});

server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  console.log('UDP Server running on port ' + port);
});

server.on('close',function(){
  console.log('UDP Server closed');
});

server.bind(7772);