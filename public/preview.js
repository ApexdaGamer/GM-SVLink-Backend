import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const controls = new PointerLockControls( camera, document.body );
camera.position.set( 15, 15, 15 );
camera.lookAt(new THREE.Vector3(0, 0, 0))
renderer.domElement.addEventListener('click', (e) => {
    controls.lock();
})

const clock = new THREE.Clock()

let dt = 0
//const viMat = new THREE.MeshBasicMaterial({color: 0xff7700});
//const floor = new THREE.Mesh(new THREE.BoxGeometry(536, 4, 400), viMat)
//floor.position.set(-68, 0, 0)
//scene.add(floor)

let availableMaps = ["hub"]
let scene = new THREE.Scene()
const viss = {}

const objP = new OBJLoader();

let userIp = "";

fetch('https://api.ipify.org?format=text')
    .then(response => response.text())
	.then(data => {
		userIp = data
	})

let s = null
if (userIp != "97.120.86.44")
    s = new WebSocket("ws://97.120.86.44:7776")
else
    s = new WebSocket("ws://10.1.1.11:7776")
s.onmessage = async (event) => {
    //console.log(await event.data.text());
    const obj = JSON.parse(event.data)
    if (obj["plam"] != null) {
        for (const [idx, plam] of Object.entries(obj.plam)) {
            if (viss[idx] == null && scene != null) {
                viss[idx] = {}
				var head = new THREE.Mesh(new THREE.BoxGeometry( 2.2, 2, 2 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                head.userData.fn = idx
				scene.add(head)
                viss[idx]["head"] = head
                var torso = new THREE.Mesh(new THREE.BoxGeometry( 1.713, 1.662, 1.103 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                torso.userData.fn = idx
                scene.add(torso)
                viss[idx]["torso"] = torso
                var larm = new THREE.Mesh(new THREE.BoxGeometry( 0.55, 1.1, 0.55 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                larm.userData.fn = idx
                scene.add(larm)
                viss[idx]["armA"] = larm
				var larmc = new THREE.Mesh(new THREE.BoxGeometry( 0.55, 1.1, 0.55 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                larmc.userData.fn = idx
                scene.add(larmc)
                viss[idx]["armC"] = larmc
                var lleg = new THREE.Mesh(new THREE.BoxGeometry( 0.837, 1.233, 1.207 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                lleg.userData.fn = idx
                scene.add(lleg)
                viss[idx]["lleg"] = lleg
                //var leye = new THREE.Mesh(new THREE.BoxGeometry( 1.186, 1.247, 1.247 ), new THREE.MeshStandardMaterial({ color: 0x1B2A35, emissive: 0x1B2A35, roughness: 0.35, metalness: 1 }));
                //scene.add(leye)
                //viss[idx]["leye"] = leye
                var rarm = new THREE.Mesh(new THREE.BoxGeometry( 0.55, 1.1, 0.55 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                rarm.userData.fn = idx
                scene.add(rarm)
                viss[idx]["armB"] = rarm
                var rarmd = new THREE.Mesh(new THREE.BoxGeometry( 0.55, 1.1, 0.55 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                rarmd.userData.fn = idx
                scene.add(rarmd)
                viss[idx]["armD"] = rarmd
                var rleg = new THREE.Mesh(new THREE.BoxGeometry( 0.837, 1.233, 1.207 ), new THREE.MeshStandardMaterial({ color: 0x91A1FF, emissive: 0x91A1FF, roughness: 0.35, metalness: 1 }));
                rleg.userData.fn = idx
                scene.add(rleg)
                viss[idx]["rleg"] = rleg
                //var reye = new THREE.Mesh(new THREE.BoxGeometry( 1.186, 1.247, 1.247 ), new THREE.MeshStandardMaterial({ color: 0x1B2A35, emissive: 0x1B2A35, roughness: 0.35, metalness: 1 }));
                //scene.add(reye)
                //viss[idx]["reye"] = reye
            }

			var headp = plam.head.pos.split(', ')
            var headr = plam.head.rot.split(', ')
            var torsop = plam.torso.pos.split(', ')
            var torsor = plam.torso.rot.split(', ')
            var LUarmp = plam.armA.pos.split(', ')
            var LLarmp = plam.armC.pos.split(', ')
            var Llegp = plam.legA.pos.split(', ')
            //var Leyep = plam.Leye.pos.split(', ')
            var RUarmp = plam.armB.pos.split(', ')
            var RLarmp = plam.armD.pos.split(', ')
            var Rlegp = plam.legB.pos.split(', ')
            //var Reyep = plam.Reye.pos.split(', ')
            var LUarmr = plam.armA.rot.split(', ')
            var LLarmr = plam.armC.rot.split(', ')
            var Llegr = plam.legA.rot.split(', ')
            //var Leyer = plam.Leye.rot.split(', ')
            var RUarmr = plam.armB.rot.split(', ')
            var RLarmr = plam.armD.rot.split(', ')
            var Rlegr = plam.legB.rot.split(', ')
            //var Reyer = plam.Reye.rot.split(', ')
            var p = {
				head: {
                    position: new THREE.Vector3(Number(headp[0]), Number(headp[1]), Number(headp[2])),
                    //quaternion: new THREE.Quaternion(Number(torsor[0]), Number(torsor[1]), Number(torsor[2])),
                    euler: new THREE.Euler(Number(headr[0]), Number(headr[1]), Number(headr[2]), "YXZ")
                },
                torso: {
                    position: new THREE.Vector3(Number(torsop[0]), Number(torsop[1]), Number(torsop[2])),
                    quaternion: new THREE.Quaternion(Number(torsor[0]), Number(torsor[1]), Number(torsor[2])),
                    euler: new THREE.Euler(Number(torsor[0]), Number(torsor[1]), Number(torsor[2]), "YXZ")
                },
                LUarm: {
                    position: new THREE.Vector3(Number(LUarmp[0]), Number(LUarmp[1]), Number(LUarmp[2])),
                    //quaternion: new THREE.Quaternion(Number(Larmr[0]), Number(Larmr[1]), Number(Larmr[2])),
                    euler: new THREE.Euler(Number(LUarmr[0]), Number(LUarmr[1]), Number(LUarmr[2]), "YXZ")
                },
				LLarm: {
                    position: new THREE.Vector3(Number(LLarmp[0]), Number(LLarmp[1]), Number(LLarmp[2])),
                    //quaternion: new THREE.Quaternion(Number(Larmr[0]), Number(Larmr[1]), Number(Larmr[2])),
                    euler: new THREE.Euler(Number(LLarmr[0]), Number(LLarmr[1]), Number(LLarmr[2]), "YXZ")
                },
                Lleg: {
                    position: new THREE.Vector3(Number(Llegp[0]), Number(Llegp[1]), Number(Llegp[2])),
                    quaternion: new THREE.Quaternion(Number(Llegr[0]), Number(Llegr[1]), Number(Llegr[2])),
                    euler: new THREE.Euler(Number(Llegr[0]), Number(Llegr[1]), Number(Llegr[2]), "YXZ")
                },
                /*Leye: {
                    position: new THREE.Vector3(Number(Leyep[0]), Number(Leyep[1]), Number(Leyep[2])),
                    quaternion: new THREE.Quaternion(Number(Leyer[0]), Number(Leyer[1]), Number(Leyer[2])),
                    euler: new THREE.Euler(Number(Leyer[0]), Number(Leyer[1]), Number(Leyer[2]), "YXZ")
                },*/
                RUarm: {
                    position: new THREE.Vector3(Number(RUarmp[0]), Number(RUarmp[1]), Number(RUarmp[2])),
                    //quaternion: new THREE.Quaternion(Number(Rarmr[0]), Number(Rarmr[1]), Number(Rarmr[2])),
                    euler: new THREE.Euler(Number(RUarmr[0]), Number(RUarmr[1]), Number(RUarmr[2]), "YXZ")
                },
				RLarm: {
                    position: new THREE.Vector3(Number(RLarmp[0]), Number(RLarmp[1]), Number(RLarmp[2])),
                    //quaternion: new THREE.Quaternion(Number(RLarmr[0]), Number(RLarmr[1]), Number(RLarmr[2])),
                    euler: new THREE.Euler(Number(RLarmr[0]), Number(RLarmr[1]), Number(RLarmr[2]), "YXZ")
                },
                Rleg: {
                    position: new THREE.Vector3(Number(Rlegp[0]), Number(Rlegp[1]), Number(Rlegp[2])),
                    quaternion: new THREE.Quaternion(Number(Rlegr[0]), Number(Rlegr[1]), Number(Rlegr[2])),
                    euler: new THREE.Euler(Number(Rlegr[0]), Number(Rlegr[1]), Number(Rlegr[2]), "YXZ")
                },
                /*Reye: {
                    position: new THREE.Vector3(Number(Reyep[0]), Number(Reyep[1]), Number(Reyep[2])),
                    quaternion: new THREE.Quaternion(Number(Reyer[0]), Number(Reyer[1]), Number(Reyer[2])),
                    euler: new THREE.Euler(Number(Reyer[0]), Number(Reyer[1]), Number(Reyer[2]), "YXZ")
                }*/
            }

            if (viss[idx]) {
                viss[idx]["head"].position.copy(p.head.position);
                viss[idx]["head"].rotation.copy(p.head.euler);
                viss[idx]["torso"].position.copy(p.torso.position);
                viss[idx]["torso"].rotation.copy(p.torso.euler);
                viss[idx]["armA"].position.copy(p.LUarm.position);
                viss[idx]["armA"].rotation.copy(p.LUarm.euler);
                viss[idx]["armC"].position.copy(p.LLarm.position);
                viss[idx]["armC"].rotation.copy(p.LLarm.euler);
                viss[idx]["lleg"].position.copy(p.Lleg.position);
                viss[idx]["lleg"].rotation.copy(p.Lleg.euler);
                //viss[idx]["leye"].position.copy(p.Leye.position);
                //viss[idx]["leye"].rotation.copy(p.Leye.euler);
                viss[idx]["armB"].position.copy(p.RUarm.position);
                viss[idx]["armB"].rotation.copy(p.RUarm.euler);
                viss[idx]["armD"].position.copy(p.RLarm.position);
                viss[idx]["armD"].rotation.copy(p.RLarm.euler);
                viss[idx]["rleg"].position.copy(p.Rleg.position);
                viss[idx]["rleg"].rotation.copy(p.Rleg.euler);
                //viss[idx]["reye"].position.copy(p.Reye.position);
                //viss[idx]["reye"].rotation.copy(p.Reye.euler);
            }
        };
    }
    if (obj["maps"] != null) {
        availableMaps = obj["maps"]
    }
	if (obj["clearMap"] == true) {
		scene.remove.apply(scene, scene.children);
	}
    if (obj["mapsDat"] != null) {
        function rgbToHex(r, g, b) {
            return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
        }
        function dtr(degrees)
        {
            return degrees * (Math.PI/180);
        }
        for (const [mapidx, map] of Object.entries(obj.mapsDat)) {
			scene.add(new THREE.AmbientLight( 0xfffffe, 3 ))
			for (const [idx, part] of Object.entries(map)) {
				const size = part.size.split(', ')
				const color = part.color.split(', ')
				const pPos = part.position.split(', ')
				const pRot = part.rotation.split(', ')
				const fNam = part.fn
				const opacity = 1-Number(part.transparency)
				const pMat = new THREE.MeshStandardMaterial({color: (1 << 24 | (Number(color[0]) * 255) << 16 | (Number(color[1]) * 255) << 8 | (Number(color[2]) * 255)), transparent: opacity > 0, opacity: opacity});
				let pMesh = null
				if (part.mdat != null) {
					pMesh = objP.parse(part.mdat)
					pMesh.traverse( async function( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material = pMat
							child.scale.set(Number(size[0]), Number(size[1]), Number(size[2]))
							child.position.set(Number(pPos[0]), Number(pPos[1]), Number(pPos[2]))
							child.rotation.set(dtr(Number(pRot[0])), dtr(Number(pRot[1])), dtr(Number(pRot[2])))
							if (part.text != null) {
								var textload = new THREE.TextureLoader()
								var text = new THREE.TextureLoader().load("https://rbx-ad-ue.zuzaratrust.workers.dev/?id=" + part.text)
								if (text != null)
									child.material = new THREE.MeshStandardMaterial({map: text, color: (1 << 24 | (Number(color[0]) * 255) << 16 | (Number(color[1]) * 255) << 8 | (Number(color[2]) * 255)), transparent: opacity > 0, opacity: opacity})
							}
							child.userData.fn = fNam  
						}
					} );
				}
				if (pMesh == null) {
					pMesh = new THREE.Mesh(new THREE.BoxGeometry(Number(size[0]), Number(size[1]), Number(size[2])), pMat)
					pMesh.position.set(Number(pPos[0]), Number(pPos[1]), Number(pPos[2]))
					pMesh.rotation.set(dtr(Number(pRot[0])), dtr(Number(pRot[1])), dtr(Number(pRot[2])))
				}
				pMesh.userData.fn = fNam                                                                                             
				scene.add(pMesh)
			}
        }
    }
};

window.s = s;

var tcpvis = document.getElementById('visible')
tcpvis.onclick = () => {
    if (tcpvis.checked) {
        document.getElementById('tcpname').disabled = true
        s.send(JSON.stringify({
            cmd: "showTCP",
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
            usn: document.getElementById('tcpname').value
        }))
    } else {
        s.send(JSON.stringify({
            cmd: "hideTCP",
            usn: document.getElementById('tcpname').value
        }))
        document.getElementById('tcpname').disabled = false
    }
}

var ai = document.getElementById('ai')

document.getElementById('tcpsend').onclick = () => {
    if (scene != null && tcpvis.checked) {
        s.send(JSON.stringify({
            cmd: "sendMsg",
            usn: document.getElementById('tcpname').value,
            msg: document.getElementById('tcpmsg').value
        }))
    }
}

(async () => {
    while (true) {
        await new Promise(r => setTimeout(r, 500));
        if (scene != null && tcpvis.checked && !ai) {
            s.send(JSON.stringify({
                cmd: "updateTCP",
                usn: document.getElementById('tcpname').value,
                pos: [
                    camera.position.x,
                    camera.position.y,
                    camera.position.z
                ],
                rot: [
                    camera.rotation.x,
                    camera.rotation.y,
                    camera.rotation.z
                ]
            }))
        } else if (scene != null && tcpvis.checked && ai) {
			// create an environment object
			var env = {};
			env.getNumStates = function() { return 8; }
			env.getMaxNumActions = function() { return 4; }

			// create the DQN agent
			var spec = { alpha: 0.01 } // see full options on DQN page
			agent = new RL.DQNAgent(env, spec); 

			setInterval(function(){ // start the learning loop
				var action = agent.act(s); // s is an array of length 8
				//... execute action in environment and get the reward
				agent.learn(reward); // the agent improves its Q,policy,model, etc. reward is a float
			}, 0);
		}
    }
})()

var tooltip = document.createElement("span")
tooltip.setAttribute("class", "tooltiptext")
tooltip.style.display = "none"
tooltip.style.position = "absolute"
document.body.appendChild(tooltip)

function onPointerMove( event ) {
    pointer.x = ( event.offsetX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.offsetY / window.innerHeight ) * 2 + 1;

    tooltip.style.left = event.pageX + 16 + 'px';
    tooltip.style.top = event.pageY  + 'px';
}

document.addEventListener('mousemove', onPointerMove);

let INTERSECTED;

var pressedKeys = {};
let isRC = false;

function rcInput(key, num) {
    if (document.activeElement === document.body && !pressedKeys[key] && isRC) {
		if (key == "KeyW")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "W",
				val: num
			}))
		if (key == "KeyA")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "A",
				val: num
			}))
		if (key == "KeyS")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "S",
				val: num
			}))
		if (key == "KeyD")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "D",
				val: num
			}))
		if (key == "KeyE")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "E",
				val: num
			}))
		if (key == "Backquote")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "Backquote",
				val: num
			}))
		if (key == "KeyP")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "P",
				val: num
			}))
		if (key == "Space")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "Space",
				val: num
			}))
		if (key == "ShiftLeft")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "LeftShift",
				val: num
			}))
		if (key == "ShiftRight")
			s.send(JSON.stringify({
				usn: document.getElementById('controlname').value,
				set: "RightShift",
				val: num
			}))
	}
}

document.addEventListener('keyup', function(e) { pressedKeys[e.code] = false; rcInput(e.code, 0); }, false)
document.addEventListener('keydown', function(e) { rcInput(e.code, 1); pressedKeys[e.code] = true; var str = document.getElementById('tcpname').value; if (e.code == "KeyG" && !(!str || /^\s*$/.test()) && document.activeElement === document.body) { console.log("requesting map"); s.send('{"map": "' + document.getElementById("map").value + '"}') } else if (e.code == "KeyC" && document.activeElement === document.body) { isRC = !isRC } }, false)

function animate() {
    dt = clock.getDelta()

    if (document.activeElement === document.body) {
        if (pressedKeys["KeyW"]) {
			if (!isRC)
				controls.moveForward(1.5)
        }
        if (pressedKeys["KeyA"]) {
			if (!isRC)
				controls.moveRight(-1.5)
        }
        if (pressedKeys["KeyS"]) {
			if (!isRC)
				controls.moveForward(-1.5)
        }
        if (pressedKeys["KeyD"]) {
			if (!isRC)
				controls.moveRight(1.5)
        }
        if (pressedKeys["Space"]) {
			if (!isRC)
				camera.position.set(camera.position.x, camera.position.y + 1.5, camera.position.z)
        }
        if (pressedKeys["ShiftLeft"]) {
			if (!isRC)
				camera.position.set(camera.position.x, camera.position.y - 1.5, camera.position.z)
        }
    }

    if (scene) {
        raycaster.setFromCamera(pointer, camera)

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            INTERSECTED = intersects[0].object
            if (INTERSECTED) {
                tooltip.innerHTML = INTERSECTED.userData.fn
                tooltip.style.display = "block"
            }
        } else {
            INTERSECTED = null
            tooltip.style.display = "none"
        }
        renderer.render(scene, camera);
    }
}