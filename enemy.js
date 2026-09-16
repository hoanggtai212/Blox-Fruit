// =========================
// ENEMY SYSTEM
// =========================

const enemies = document.querySelectorAll(".enemy");

enemies.forEach((enemy, index) => {

    enemy.dataset.hp = "100";
    enemy.dataset.maxHp = "100";

    // Tạo thanh máu
    const healthBar = document.createElement("div");

    healthBar.className = "enemyHealth";

    healthBar.innerHTML = `
        <div class="enemyName">Bandit</div>
        <div class="healthBackground">
            <div class="healthFill"></div>
        </div>
    `;

    enemy.appendChild(healthBar);

    enemy.addEventListener("click", function() {

        if (Number(enemy.dataset.hp) <= 0) {
            return;
        }

        attackEnemy(enemy);
    });
});


function attackEnemy(enemy) {

    let hp = Number(enemy.dataset.hp);

    hp -= 10;

    if (hp < 0) {
        hp = 0;
    }

    enemy.dataset.hp = hp;

    updateEnemyHealth(enemy);

    if (hp <= 0) {
        enemyDefeated(enemy);
    }
}


function updateEnemyHealth(enemy) {

    const hp = Number(enemy.dataset.hp);
    const maxHp = Number(enemy.dataset.maxHp);

    const healthFill = enemy.querySelector(".healthFill");

    const percentage = (hp / maxHp) * 100;

    healthFill.style.width = percentage + "%";
}


function enemyDefeated(enemy) {

    enemy.style.opacity = "0";

    coins += 10;
    exp += 20;

    if (exp >= 100) {
        exp -= 100;
        level++;

        alert("LEVEL UP! Level " + level);
    }

    updateHUD();

    setTimeout(function() {

        enemy.dataset.hp = "100";
        enemy.style.opacity = "1";

        updateEnemyHealth(enemy);

    }, 3000);
}
