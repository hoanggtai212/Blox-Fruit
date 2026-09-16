// ======================================
// MOBILE CONTROLS
// ======================================


// Joystick buttons

document
  .querySelectorAll(
    "#joystick .joy"
  )
  .forEach(button => {

    const key =
      button.dataset.key;


    function start(e) {

      e.preventDefault();

      keys[key] = true;

      button.style.transform =
        "scale(.9)";

    }


    function stop(e) {

      e.preventDefault();

      keys[key] = false;

      button.style.transform =
        "scale(1)";

    }


    button.addEventListener(
      "touchstart",
      start,
      {
        passive: false
      }
    );


    button.addEventListener(
      "touchend",
      stop,
      {
        passive: false
      }
    );


    button.addEventListener(
      "touchcancel",
      stop,
      {
        passive: false
      }
    );

  });


// ======================================
// JUMP
// ======================================

document
  .getElementById("jumpBtn")
  .addEventListener(
    "touchstart",
    e => {

      e.preventDefault();

      jump();

    },
    {
      passive: false
    }
  );


// ======================================
// ATTACK
// ======================================

document
  .getElementById("attackBtn")
  .addEventListener(
    "touchstart",
    e => {

      e.preventDefault();

      attack(
        15 + level * 2
      );

    },
    {
      passive: false
    }
  );


// ======================================
// SKILL
// ======================================

document
  .getElementById("skillBtn")
  .addEventListener(
    "touchstart",
    e => {

      e.preventDefault();

      skill();

    },
    {
      passive: false
    }
  );


// ======================================
// CAMERA TOUCH
// ======================================

let touchCamera = false;

let cameraTouchX = 0;


renderer.domElement.addEventListener(
  "touchstart",
  e => {

    // Không coi touch vào joystick/button là camera

    if (
      e.target.closest(
        "#mobile, #hub"
      )
    ) {
      return;
    }


    if (
      e.touches.length === 1
    ) {

      touchCamera = true;

      cameraTouchX =
        e.touches[0].clientX;

    }

  },
  {
    passive: false
  }
);


renderer.domElement.addEventListener(
  "touchmove",
  e => {

    if (!touchCamera)
      return;


    if (
      e.touches.length !== 1
    )
      return;


    e.preventDefault();


    const x =
      e.touches[0].clientX;


    const dx =
      x - cameraTouchX;


    cameraAngle -=
      dx * .006;


    cameraTouchX = x;

  },
  {
    passive: false
  }
);


renderer.domElement.addEventListener(
  "touchend",
  () => {

    touchCamera = false;

  }
);
