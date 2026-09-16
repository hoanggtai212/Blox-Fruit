// Mobile controls: chỉ xử lý nút cảm ứng, game logic nằm trong game.js.
document.querySelectorAll("#stick button").forEach(btn=>{
 const key=btn.dataset.key;
 const start=e=>{e.preventDefault();keys[key]=true};
 const stop=e=>{e.preventDefault();keys[key]=false};
 btn.addEventListener("touchstart",start,{passive:false});
 btn.addEventListener("touchend",stop,{passive:false});
 btn.addEventListener("touchcancel",stop,{passive:false});
});

document.getElementById("mJump").addEventListener("touchstart",e=>{e.preventDefault();jump()},{passive:false});
document.getElementById("mAttack").addEventListener("touchstart",e=>{e.preventDefault();attack(10+level*2)},{passive:false});
document.getElementById("mSkill").addEventListener("touchstart",e=>{e.preventDefault();skill()},{passive:false});
