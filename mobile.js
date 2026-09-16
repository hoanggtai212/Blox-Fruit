// =========================
// MOBILE CONTROLS
// =========================

const mobileControls = document.createElement("div");

mobileControls.id = "mobileControls";

mobileControls.innerHTML = `
    <button id="up">▲</button>

    <div class="middleButtons">
        <button id="left">◀</button>
        <button id="down">▼</button>
        <button id="right">▶</button>
    </div>
`;

document.body.appendChild(mobileControls);

const buttons = {
    up: document.getElementById("up"),
    down: document.getElementById("down"),
    left: document.getElementById("left"),
    right: document.getElementById("right")
};

function holdButton(button, key) {

    button.addEventListener("touchstart", function(event) {
        event.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("touchend", function(event) {
        event.preventDefault();
        keys[key] = false;
    });

    // Hỗ trợ chuột khi test trên máy tính
    button.addEventListener("mousedown", function() {
        keys[key] = true;
    });

    button.addEventListener("mouseup", function() {
        keys[key] = false;
    });

    button.addEventListener("mouseleave", function() {
        keys[key] = false;
    });
}

holdButton(buttons.up, "w");
holdButton(buttons.down, "s");
holdButton(buttons.left, "a");
holdButton(buttons.right, "d");
