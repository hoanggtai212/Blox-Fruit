// ======================================
// SEA ADVENTURE 3D
// Stylized third-person mobile game
// ======================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x70c9f2);

scene.fog = new THREE.Fog(
  0x70c9f2,
  70,
  180
);


// ======================================
// CAMERA
// ======================================

const camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  0.1,
  500
);

camera.position.set(
  0,
  9,
  13
);


// ======================================
// RENDERER
// ======================================

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.setPixelRatio(
  Math.min(devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

document
  .getElementById("game")
  .appendChild(renderer.domElement);


// ======================================
// LIGHT
// ======================================

const hemi =
  new THREE.HemisphereLight(
    0xbceeff,
    0x5a482c,
    2
  );

scene.add(hemi);


const sun =
  new THREE.DirectionalLight(
    0xffffff,
    3
  );

sun.position.set(
  30,
  60,
  20
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

scene.add(sun);


// ======================================
// MATERIAL HELPERS
// ======================================

function mat(color) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness: .8
  });

}


function box(
  x,
  y,
  z,
  color
) {

  const mesh =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        x,
        y,
        z
      ),
      mat(color)
    );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}


function sphere(
  radius,
  color
) {

  const mesh =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        20,
        16
      ),
      mat(color)
    );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}


// ======================================
// OCEAN
// ======================================

const ocean = box(
  240,
  .5,
  240,
  0x278bd1
);

ocean.position.y = -1;

scene.add(ocean);


// waves

for (let i = 0; i < 25; i++) {

  const wave = new THREE.Mesh(
    new THREE.TorusGeometry(
      2 + Math.random() * 2,
      .035,
      6,
      24
    ),
    mat(0x8de7ff)
  );

  wave.rotation.x = Math.PI / 2;

  wave.position.set(
    (Math.random() - .5) * 180,
    -.7,
    (Math.random() - .5) * 180
  );

  scene.add(wave);

}


// ======================================
// ISLAND
// ======================================

const islandBase = box(
  82,
  3,
  68,
  0xc5a16c
);

islandBase.position.y = .2;

scene.add(islandBase);


const grass = box(
  76,
  2,
  62,
  0x55a947
);

grass.position.y = 2.2;

scene.add(grass);


// beach

const beach = box(
  82,
  .8,
  68,
  0xe5c07b
);

beach.position.y = 3.05;

scene.add(beach);


// grass center

const land = box(
  70,
  1.5,
  55,
  0x4ca343
);

land.position.y = 3.8;

scene.add(land);


// ======================================
// ROCKS
// ======================================

for (let i = 0; i < 22; i++) {

  const rock =
    sphere(
      .7 + Math.random() * 1.3,
      0x737373
    );

  rock.scale.y =
    .5 + Math.random() * .5;

  rock.position.set(
    (Math.random() - .5) * 72,
    4.5,
    (Math.random() - .5) * 55
  );

  scene.add(rock);
}


// ======================================
// TREES
// ======================================

function createTree(x, z) {

  const tree =
    new THREE.Group();

  const trunk = box(
    .7,
    4,
    .7,
    0x704522
  );

  trunk.position.y = 5;

  tree.add(trunk);


  const leaves =
    new THREE.Group();


  for (let i = 0; i < 3; i++) {

    const leaf =
      sphere(
        2.2,
        i === 1
          ? 0x2d963e
          : 0x43aa45
      );

    leaf.position.set(
      (Math.random() - .5) * 1.5,
      7 + i * .7,
      (Math.random() - .5) * 1.5
    );

    leaves.add(leaf);
  }


  tree.add(leaves);

  tree.position.set(
    x,
    0,
    z
  );

  scene.add(tree);
}


for (let i = 0; i < 24; i++) {

  let x =
    (Math.random() - .5) * 65;

  let z =
    (Math.random() - .5) * 48;

  createTree(x, z);

}


// ======================================
// HOUSE
// ======================================

function createHouse(x, z) {

  const house =
    new THREE.Group();


  const body = box(
    8,
    6,
    7,
    0xd99c52
  );

  body.position.y = 7;

  house.add(body);


  const roof =
    new THREE.Mesh(
      new THREE.ConeGeometry(
        6,
        4,
        4
      ),
      mat(0x8b3d29)
    );

  roof.rotation.y =
    Math.PI / 4;

  roof.position.y = 12;

  house.add(roof);


  const door = box(
    1.8,
    3.3,
    .3,
    0x57321e
  );

  door.position.set(
    0,
    5.8,
    3.6
  );

  house.add(door);


  house.position.set(
    x,
    0,
    z
  );

  scene.add(house);
}


createHouse(-20, -10);
createHouse(24, -14);
createHouse(18, 18);


// ======================================
// PLAYER
// ======================================

const player =
  new THREE.Group();

scene.add(player);


const body =
  box(
    1.5,
    2.2,
    1,
    0x2c6bd6
  );

body.position.y = 4.5;

player.add(body);


const head =
  sphere(
    .9,
    0xffc99a
  );

head.position.y = 6.2;

player.add(head);


// hair

const hair =
  sphere(
    .94,
    0x26170e
  );

hair.scale.y = .5;

hair.position.y = 6.85;

player.add(hair);


// arms

const armL =
  box(
    .45,
    1.9,
    .45,
    0x2c6bd6
  );

armL.position.set(
  -1,
  4.5,
  0
);

player.add(armL);


const armR =
  box(
    .45,
    1.9,
    .45,
    0x2c6bd6
  );

armR.position.set(
  1,
  4.5,
  0
);

player.add(armR);


// legs

const legL =
  box(
    .55,
    2,
    .55,
    0x222b48
  );

legL.position.set(
  -.45,
  2.3,
  0
);

player.add(legL);


const legR =
  box(
    .55,
    2,
    .55,
    0x222b48
  );

legR.position.set(
  .45,
  2.3,
  0
);

player.add(legR);


player.position.set(
  0,
  0,
  5
);


// ======================================
// SWORD
// ======================================

const sword =
  new THREE.Group();

const handle =
  box(
    .25,
    1.2,
    .25,
    0x63361e
  );

handle.position.y = -.5;

sword.add(handle);


const blade =
  box(
    .22,
    2.7,
    .12,
    0xdce8ef
  );

blade.position.y = 1.35;

sword.add(blade);


const guard =
  box(
    1.1,
    .18,
    .18,
    0xffc928
  );

guard.position.y = .15;

sword.add(guard);


sword.rotation.z = -.35;

sword.position.set(
  1.1,
  4.4,
  .2
);

player.add(sword);


// ======================================
// GAME DATA
// ======================================

let level = 1;

let exp = 0;

let beli = 100;

let hp = 100;

const maxHP = 100;

let power = "None";

let kills = 0;


// ======================================
// ENEMIES
// ======================================

const enemies = [];


function createEnemy(
  x,
  z
) {

  const enemy =
    new THREE.Group();


  const body =
    box(
      1.6,
      2.3,
      1,
      0xb73535
    );

  body.position.y = 4.4;

  enemy.add(body);


  const head =
    sphere(
      .85,
      0xf0bd8d
    );

  head.position.y = 6.2;

  enemy.add(head);


  const pants =
    box(
      1.4,
      1.5,
      .9,
      0x333333
    );

  pants.position.y = 2.5;

  enemy.add(pants);


  // HP background

  const hpBack =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.7,
        .25
      ),
      mat(0x171717)
    );

  hpBack.position.y = 8;

  hpBack.rotation.y =
    Math.PI;

  enemy.add(hpBack);


  // HP

  const hpFront =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.5,
        .17
      ),
      mat(0x42df58)
    );

  hpFront.position.set(
    0,
    8,
    -.02
  );

  hpFront.rotation.y =
    Math.PI;

  enemy.add(hpFront);


  enemy.hp = 50;

  enemy.maxHP = 50;

  enemy.hpBar = hpFront;

  enemy.dead = false;

  enemy.position.set(
    x,
    0,
    z
  );


  scene.add(enemy);

  enemies.push(enemy);

  return enemy;
}


// five bandits

createEnemy(-12, 0);
createEnemy(12, 2);
createEnemy(-18, 17);
createEnemy(15, 20);
createEnemy(0, -18);


// ======================================
// FRUIT
// ======================================

const fruit =
  new THREE.Group();


const fruitBody =
  sphere(
    1.1,
    0xf3a72e
  );

fruit.add(fruitBody);


const fruitLeaf =
  sphere(
    .35,
    0x42a83d
  );

fruitLeaf.position.set(
  .3,
  1,
  0
);

fruitLeaf.scale.set(
  1,
  .5,
  .5
);

fruit.add(fruitLeaf);


fruit.position.set(
  7,
  5,
  12
);

scene.add(fruit);


// ======================================
// EFFECT
// ======================================

function effectRing(
  position,
  color
) {

  const ring =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        .8,
        .12,
        8,
        32
      ),
      mat(color)
    );

  ring.rotation.x =
    Math.PI / 2;

  ring.position.copy(position);

  scene.add(ring);


  let scale = 1;

  function grow() {

    scale += .15;

    ring.scale.set(
      scale,
      scale,
      scale
    );

    ring.material.opacity =
      Math.max(
        0,
        1 - scale / 5
      );

    ring.material.transparent = true;

    if (scale < 5) {

      requestAnimationFrame(grow);

    } else {

      scene.remove(ring);

    }

  }

  grow();
}


// ======================================
// MESSAGE
// ======================================

function message(text) {

  const el =
    document.getElementById(
      "message"
    );

  el.textContent = text;

  el.classList.add("show");

  clearTimeout(
    message.timer
  );

  message.timer =
    setTimeout(() => {

      el.classList.remove(
        "show"
      );

    }, 1200);
}


// ======================================
// HUD
// ======================================

function updateHUD() {

  document.getElementById(
    "level"
  ).textContent = level;


  document.getElementById(
    "beli"
  ).textContent = beli;


  document.getElementById(
    "power"
  ).textContent = power;


  document.getElementById(
    "kills"
  ).textContent = kills;


  document.getElementById(
    "hpText"
  ).textContent =
    `${Math.max(0, Math.round(hp))}/${maxHP}`;


  document.getElementById(
    "hpBar"
  ).style.width =
    `${Math.max(0, hp)}%`;


  document.getElementById(
    "expText"
  ).textContent =
    `${exp}/100`;


  document.getElementById(
    "expBar"
  ).style.width =
    `${exp}%`;

}


updateHUD();


// ======================================
// ATTACK
// ======================================

let attacking = false;


function attack(
  damage = 15
) {

  if (attacking)
    return;

  attacking = true;

  sword.rotation.z = -1.5;


  setTimeout(() => {

    sword.rotation.z = -.35;

    attacking = false;

  }, 180);


  let target = null;

  let distance = 999;


  enemies.forEach(enemy => {

    if (enemy.dead)
      return;


    const d =
      player.position.distanceTo(
        enemy.position
      );


    if (d < distance) {

      distance = d;

      target = enemy;

    }

  });


  if (
    target &&
    distance < 8
  ) {

    target.hp -= damage;

    target.hpBar.scale.x =
      Math.max(
        0,
        target.hp / target.maxHP
      );


    effectRing(
      target.position.clone()
        .setY(3.5),
      0xffd43b
    );


    if (target.hp <= 0) {

      killEnemy(target);

    }

  }

}


// ======================================
// KILL ENEMY
// ======================================

function killEnemy(enemy) {

  if (enemy.dead)
    return;

  enemy.dead = true;

  kills++;

  exp += 25;

  beli += 20;


  message(
    "+25 EXP   +20 Beli"
  );


  if (exp >= 100) {

    exp -= 100;

    level++;

    message(
      "⭐ LEVEL UP!"
    );

  }


  updateHUD();


  enemy.visible = false;


  setTimeout(() => {

    enemy.hp = enemy.maxHP;

    enemy.hpBar.scale.x = 1;

    enemy.dead = false;

    enemy.visible = true;

    enemy.position.set(
      (Math.random() - .5) * 45,
      0,
      (Math.random() - .5) * 35
    );

  }, 3000);

}


// ======================================
// SKILL
// ======================================

function skill() {

  if (power === "None") {

    message(
      "🍎 Nhặt Power trước!"
    );

    return;

  }


  effectRing(
    player.position.clone()
      .setY(3),
    0x65eaff
  );


  enemies.forEach(enemy => {

    if (enemy.dead)
      return;


    const d =
      player.position.distanceTo(
        enemy.position
      );


    if (d < 12) {

      enemy.hp -= 40;

      enemy.hpBar.scale.x =
        Math.max(
          0,
          enemy.hp / enemy.maxHP
        );


      if (enemy.hp <= 0) {

        killEnemy(enemy);

      }

    }

  });


  message(
    "🔥 POWER SKILL!"
  );

}


// ======================================
// PICK FRUIT
// ======================================

function checkFruit() {

  if (!fruit.visible)
    return;


  const d =
    player.position.distanceTo(
      fruit.position
    );


  if (d < 5) {

    power = "Sand";

    fruit.visible = false;

    message(
      "🍎 Đã nhận Sand Power!"
    );

    updateHUD();

  }

}


// ======================================
// JUMP
// ======================================

let velocityY = 0;

let onGround = true;


function jump() {

  if (!onGround)
    return;

  velocityY = .28;

  onGround = false;

}


// ======================================
// KEYBOARD
// ======================================

const keys = {
  w: false,
  a: false,
  s: false,
  d: false
};


window.addEventListener(
  "keydown",
  e => {

    const k =
      e.key.toLowerCase();


    if (k === "w" ||
        k === "arrowup")
      keys.w = true;


    if (k === "a" ||
        k === "arrowleft")
      keys.a = true;


    if (k === "s" ||
        k === "arrowdown")
      keys.s = true;


    if (k === "d" ||
        k === "arrowright")
      keys.d = true;


    if (e.code === "Space")
      jump();


    if (e.code === "KeyF")
      skill();

  }
);


window.addEventListener(
  "keyup",
  e => {

    const k =
      e.key.toLowerCase();


    if (k === "w" ||
        k === "arrowup")
      keys.w = false;


    if (k === "a" ||
        k === "arrowleft")
      keys.a = false;


    if (k === "s" ||
        k === "arrowdown")
      keys.s = false;


    if (k === "d" ||
        k === "arrowright")
      keys.d = false;

  }
);


// mouse attack

renderer.domElement.addEventListener(
  "click",
  () => {

    attack(
      15 + level * 2
    );

  }
);


// ======================================
// CAMERA DRAG
// ======================================

let cameraAngle = 0;

let dragging = false;

let lastX = 0;


renderer.domElement.addEventListener(
  "pointerdown",
  e => {

    dragging = true;

    lastX = e.clientX;

  }
);


renderer.domElement.addEventListener(
  "pointermove",
  e => {

    if (!dragging)
      return;

    const dx =
      e.clientX - lastX;

    cameraAngle -=
      dx * .006;

    lastX = e.clientX;

  }
);


window.addEventListener(
  "pointerup",
  () => {

    dragging = false;

  }
);


// ======================================
// MOVEMENT
// ======================================

function movePlayer() {

  let x = 0;
  let z = 0;


  if (keys.w) z -= 1;
  if (keys.s) z += 1;
  if (keys.a) x -= 1;
  if (keys.d) x += 1;


  if (
    x === 0 &&
    z === 0
  )
    return;


  const length =
    Math.sqrt(
      x * x + z * z
    );


  x /= length;
  z /= length;


  // rotate movement with camera

  const sin =
    Math.sin(cameraAngle);

  const cos =
    Math.cos(cameraAngle);


  const mx =
    x * cos - z * sin;

  const mz =
    x * sin + z * cos;


  const speed =
    .22;


  player.position.x +=
    mx * speed;

  player.position.z +=
    mz * speed;


  // character faces direction

  player.rotation.y =
    Math.atan2(
      mx,
      mz
    );


  // walking animation

  const t =
    performance.now() * .012;

  legL.rotation.x =
    Math.sin(t) * .4;

  legR.rotation.x =
    -Math.sin(t) * .4;

}


// ======================================
// PHYSICS
// ======================================

function physics() {

  velocityY -= .015;

  player.position.y +=
    velocityY;


  if (player.position.y <= 0) {

    player.position.y = 0;

    velocityY = 0;

    onGround = true;

  }

}


// ======================================
// LIMIT ISLAND
// ======================================

function limitPlayer() {

  player.position.x =
    Math.max(
      -34,
      Math.min(
        34,
        player.position.x
      )
    );


  player.position.z =
    Math.max(
      -26,
      Math.min(
        26,
        player.position.z
      )
    );

}


// ======================================
// CAMERA FOLLOW
// ======================================

function updateCamera() {

  const distance = 14;

  const height = 9;


  const offsetX =
    Math.sin(cameraAngle)
    * distance;


  const offsetZ =
    Math.cos(cameraAngle)
    * distance;


  const target =
    new THREE.Vector3(
      player.position.x,
      player.position.y + 4,
      player.position.z
    );


  const desired =
    new THREE.Vector3(
      player.position.x
        + offsetX,

      player.position.y
        + height,

      player.position.z
        + offsetZ
    );


  camera.position.lerp(
    desired,
    .12
  );


  camera.lookAt(
    target
  );

}


// ======================================
// ENEMY AI
// ======================================

function enemyAI() {

  enemies.forEach(enemy => {

    if (enemy.dead)
      return;


    const dx =
      player.position.x
      - enemy.position.x;


    const dz =
      player.position.z
      - enemy.position.z;


    const d =
      Math.sqrt(
        dx * dx +
        dz * dz
      );


    if (
      d < 16 &&
      d > 4
    ) {

      enemy.position.x +=
        dx / d * .025;

      enemy.position.z +=
        dz / d * .025;

      enemy.rotation.y =
        Math.atan2(
          dx,
          dz
        );

    }


    if (
      d <= 4
    ) {

      hp -= .04;

      if (hp <= 0) {

        hp = maxHP;

        player.position.set(
          0,
          0,
          5
        );

        message(
          "💀 Bạn đã bị hạ!"
        );

      }

      updateHUD();

    }

  });

}


// ======================================
// ANIMATE
// ======================================

function animate() {

  requestAnimationFrame(
    animate
  );


  movePlayer();

  physics();

  limitPlayer();

  enemyAI();

  checkFruit();

  updateCamera();


  // fruit floating

  if (fruit.visible) {

    fruit.rotation.y += .02;

    fruit.position.y =
      5 +
      Math.sin(
        performance.now() * .003
      ) * .4;

  }


  renderer.render(
    scene,
    camera
  );

}


animate();


// ======================================
// HUB
// ======================================

const hubBtn =
  document.getElementById(
    "hubBtn"
  );

const hubPanel =
  document.getElementById(
    "hubPanel"
  );


hubBtn.addEventListener(
  "click",
  e => {

    e.stopPropagation();

    hubPanel.classList.toggle(
      "open"
    );

  }
);


document
  .querySelectorAll(
    "#hubPanel button"
  )
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        const action =
          btn.dataset.action;


        if (action === "attack")
          attack(
            15 + level * 2
          );


        if (action === "skill")
          skill();


        if (action === "fruit")
          checkFruit();


        if (action === "quest")
          message(
            "🎯 Đánh bại 5 Bandits!"
          );

      }
    );

  });


// ======================================
// TRACK QUEST
// ======================================

document
  .getElementById("trackBtn")
  .addEventListener(
    "click",
    () => {

      message(
        "🎯 Quest đang được theo dõi"
      );

    }
  );


// ======================================
// RESIZE
// ======================================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);
