// Sea Adventure 3D - prototype.
// Dùng Three.js từ CDN; GitHub Pages chạy được mà không cần build.

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x67c9ed);
scene.fog = new THREE.Fog(0x67c9ed, 45, 150);

const camera = new THREE.PerspectiveCamera(65, innerWidth/innerHeight, .1, 300);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled = true;
document.getElementById("game").appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xbfefff,0x49652f,2.2));
const sun = new THREE.DirectionalLight(0xffffff,2.2);
sun.position.set(30,50,20); sun.castShadow=true; scene.add(sun);

const keys = {};
let level=1, exp=0, beli=100, kills=0, power="None";
let yaw=0, pitch=.38, attacking=false;
const clock=new THREE.Clock();

function mat(color){return new THREE.MeshStandardMaterial({color,roughness:.85});}
function box(w,h,d,color){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.castShadow=true;m.receiveShadow=true;return m;}

const water=box(220,.4,220,0x219bd1);
water.position.y=-.5; scene.add(water);

const island=box(72,1.5,58,0x59b94d);
island.position.y=.2; island.receiveShadow=true; scene.add(island);

const sand=box(76,.35,62,0xd5b35c); sand.position.y=-.35; scene.add(sand);

function addTree(x,z){
 const trunk=box(1.2,4,1.2,0x87512d); trunk.position.set(x,2,z); scene.add(trunk);
 const crown=new THREE.Mesh(new THREE.SphereGeometry(3.2,10,8),mat(0x19843b));
 crown.position.set(x,5,z); crown.castShadow=true; scene.add(crown);
}
[[-28,-20],[-19,20],[25,-18],[28,18],[-6,-24],[9,22]].forEach(p=>addTree(...p));

function addHouse(x,z){
 const h=box(7,5,7,0xc98255); h.position.set(x,2.5,z); scene.add(h);
 const roof=new THREE.Mesh(new THREE.ConeGeometry(5.8,3,4),mat(0x8b3f2f));
 roof.position.set(x,6.5,z); roof.rotation.y=Math.PI/4; roof.castShadow=true; scene.add(roof);
}
addHouse(18,8); addHouse(-19,-7);

function makePlayer(){
 const g=new THREE.Group();
 const body=box(1.5,2.2,1.1,0x2563eb); body.position.y=1.7; g.add(body);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.7,16,12),mat(0xffd2a3)); head.position.y=3.25; head.castShadow=true; g.add(head);
 const leg1=box(.5,1.3,.55,0x22223b),leg2=leg1.clone();
 leg1.position.set(-.42,.65,0);leg2.position.set(.42,.65,0);g.add(leg1,leg2);
 return g;
}
const player=makePlayer(); player.position.set(0,1.05,0); scene.add(player);

function makeEnemy(name,x,z,max=100){
 const g=new THREE.Group();
 const body=box(1.5,2.1,1.2,0xd93636);body.position.y=1.6;g.add(body);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.65,14,10),mat(0xffc99c));head.position.y=3;g.add(head);
 const hpbg=box(2.4,.18,.12,0x222222);hpbg.position.set(0,4.05,.1);g.add(hpbg);
 const hp=box(2.3,.12,.13,0x25d34c);hp.position.set(0,4.05,.18);g.add(hp);
 g.position.set(x,1,z); scene.add(g);
 return {group:g,name,hp,max,hpMesh:hp,dead:false,respawn:0};
}
const enemies=[
 makeEnemy("Bandit",-10,-5,100),
 makeEnemy("Bandit",9,-5,100),
 makeEnemy("Bandit",2,12,150)
];

const fruit=new THREE.Group();
const apple=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),mat(0xf04438));apple.position.y=1.2;fruit.add(apple);
const leaf=new THREE.Mesh(new THREE.BoxGeometry(.15,.7,.15),mat(0x299447));leaf.position.set(.35,2,.1);fruit.add(leaf);
fruit.position.set(-5,1.05,17);scene.add(fruit);

function hud(){
 document.getElementById("level").textContent=level;
 document.getElementById("exp").textContent=exp;
 document.getElementById("beli").textContent=beli;
 document.getElementById("power").textContent=power;
 document.getElementById("kills").textContent=kills;
}
function msg(t){
 const e=document.getElementById("message");e.textContent=t;e.classList.add("show");
 clearTimeout(msg.timer);msg.timer=setTimeout(()=>e.classList.remove("show"),1400);
}
function nearestEnemy(){
 let best=null,dist=5;
 for(const e of enemies)if(!e.dead){
  const d=player.position.distanceTo(e.group.position);
  if(d<dist){dist=d;best=e;}
 }
 return best;
}
function attack(dmg){
 const e=nearestEnemy();
 if(!e){msg("❌ Không có Bandit đủ gần");return}
 e.hp-=dmg;
 e.hpMesh.scale.x=Math.max(0,e.hp/e.max);
 e.hpMesh.position.x=-1.15*(1-e.hp/e.max);
 msg("⚔️ -"+dmg);
 if(e.hp<=0){
  e.dead=true;e.group.visible=false;kills++;exp+=30;beli+=25;
  if(exp>=100){exp-=100;level++;msg("🎉 LEVEL UP!");} hud();
  e.respawn=3;
 }
}
function skill(){
 if(power==="None"){msg("🍎 Nhặt Power trước!");return}
 attack(45+level*3);
}
document.getElementById("attack").onclick=()=>attack(10+level*2);
document.getElementById("skill").onclick=skill;

document.getElementById("fruit").onclick=()=>{};

function distanceToFruit(){
 return player.position.distanceTo(fruit.position);
}
function pickupFruit(){
 if(power==="None" && distanceToFruit()<3){
  power="Flame";fruit.visible=false;hud();msg("🔥 Nhận Flame Power!");
 }
}

addEventListener("keydown",e=>{
 const k=e.key.toLowerCase();keys[k]=true;
 if(k===" "){e.preventDefault();jump();}
 if(k==="e"){pickupFruit();}
 if(k==="f"){attack(10+level*2);}
 if(k==="r"){skill();}
});
addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);

let vy=0,onGround=true;
function jump(){if(onGround){vy=.22;onGround=false}}

function updatePlayer(dt){
 const dir=new THREE.Vector3();
 if(keys.w||keys.arrowup)dir.z-=1;
 if(keys.s||keys.arrowdown)dir.z+=1;
 if(keys.a||keys.arrowleft)dir.x-=1;
 if(keys.d||keys.arrowright)dir.x+=1;
 if(dir.lengthSq()){
  dir.normalize();
  const c=Math.cos(yaw),s=Math.sin(yaw);
  const dx=dir.x*c-dir.z*s, dz=dir.x*s+dir.z*c;
  player.position.x+=dx*8*dt;player.position.z+=dz*8*dt;
  player.rotation.y=Math.atan2(dx,dz);
 }
 player.position.x=THREE.MathUtils.clamp(player.position.x,-34,34);
 player.position.z=THREE.MathUtils.clamp(player.position.z,-27,27);
 vy-=.6*dt;player.position.y+=vy;
 if(player.position.y<=1.05){player.position.y=1.05;vy=0;onGround=true}
 pickupFruit();
}

function updateCamera(){
 const target=new THREE.Vector3(player.position.x,player.position.y+2.2,player.position.z);
 const dist=10;
 const cx=target.x+Math.sin(yaw)*dist*Math.cos(pitch);
 const cz=target.z+Math.cos(yaw)*dist*Math.cos(pitch);
 const cy=target.y+Math.sin(pitch)*dist;
 camera.position.lerp(new THREE.Vector3(cx,cy,cz),.12);
 camera.lookAt(target);
}

addEventListener("mousedown",e=>{
 if(e.target.tagName==="BUTTON")return;
 if(e.button===0)attack(10+level*2);
});
let dragging=false,lastX=0,lastY=0;
renderer.domElement.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"){dragging=true;lastX=e.clientX;lastY=e.clientY}});
addEventListener("pointerup",()=>dragging=false);
addEventListener("pointermove",e=>{
 if(!dragging)return;
 yaw-=(e.clientX-lastX)*.006;
 pitch=THREE.MathUtils.clamp(pitch-(e.clientY-lastY)*.004,.08,.85);
 lastX=e.clientX;lastY=e.clientY;
});

function loop(){
 requestAnimationFrame(loop);
 const dt=Math.min(clock.getDelta(),.04);
 updatePlayer(dt);
 for(const e of enemies){
  if(e.dead){e.respawn-=dt;if(e.respawn<=0){e.dead=false;e.hp=e.max;e.hpMesh.scale.x=1;e.hpMesh.position.x=0;e.group.visible=true}}
 }
 updateCamera();
 renderer.render(scene,camera);
}
addEventListener("resize",()=>{
 camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight);
});
hud();loop();
