// =========================
// FRUIT ADVENTURE - GAME JS
// =========================

let level = 1;
let exp = 0;
let coins = 100;

let playerX = window.innerWidth / 2;
let playerY = window.innerHeight * 0.5;

const player = document.getElementById("player");

const levelText = document.getElementById("level");
const expText = document.getElementById("exp");
const coinsText = document.getElementById("coins");

function updateHUD() {
    levelText.textContent = level;
    expText.textContent = exp;
    coinsText.textContent = coins;
}

// =========================
// DI CHUYỂN
// =========================

const keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});

function movePlayer() {

    const speed = 5;

    if (keys["a"] || keys["arrowleft"]) {
        playerX -= speed;
    }

    if (keys["d"] || keys["arrowright"]) {
        playerX += speed;
    }

    if (keys["w"] || keys["arrowup"]) {
        playerY -= speed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        playerY += speed;
    }

    // Không cho đi ra ngoài màn hình
    playerX = Math.max(0, Math.min(window.innerWidth - 45, playerX));
    playerY = Math.max(50, Math.min(window.innerHeight - 120, playerY));

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}

function gameLoop() {
    movePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// =========================
// ATTACK
// =========================

const attackButton = document.getElementById("attackButton");

attackButton.addEventListener("click", function() {

    exp += 20;

    coins += 10;

    if (exp >= 100) {
        exp -= 100;
        level++;

        alert("LEVEL UP! Bạn đã đạt Level " + level);
    }

    updateHUD();
});

// =========================
// KHỞI ĐỘNG
// =========================

updateHUD();
