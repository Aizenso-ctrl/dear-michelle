const bg = document.getElementById("bg");
const heartCanvas = document.getElementById("heart");

const bgCtx = bg.getContext("2d");
const ctx = heartCanvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

bg.width = heartCanvas.width = w;
bg.height = heartCanvas.height = h;

// 💙 TIME
const startDate = new Date("2022-01-01"); // өөрчилж болно

function updateTime() {
  let now = new Date();
  let diff = now - startDate;

  let days = Math.floor(diff / (1000*60*60*24));
  let hours = Math.floor(diff / (1000*60*60)) % 24;
  let min = Math.floor(diff / (1000*60)) % 60;
  let sec = Math.floor(diff / 1000) % 60;

  document.getElementById("time").innerText =
    days + " days " + hours + "h " + min + "m " + sec + "s 💙";
}
setInterval(updateTime, 1000);

// 🌌 STARS
let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2
  });
}

function drawStars() {
  bgCtx.clearRect(0,0,w,h);
  bgCtx.fillStyle = "white";

  stars.forEach(s => {
    bgCtx.beginPath();
    bgCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    bgCtx.fill();
  });
}

// ❤️ HEART PARTICLES
let particles = [];

function heart(t) {
  return {
    x: 16*Math.pow(Math.sin(t),3),
    y: -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t))
  };
}

for (let i = 0; i < 2000; i++) {
  let t = Math.random()*Math.PI*2;
  let pos = heart(t);

  particles.push({
    x: w/2 + pos.x*15,
    y: h/2 + pos.y*15,
    baseX: w/2 + pos.x*15,
    baseY: h/2 + pos.y*15
  });
}

function drawHeart(time) {
  ctx.clearRect(0,0,w,h);

  particles.forEach(p => {
    let dx = Math.sin(time*0.002 + p.x)*2;
    let dy = Math.cos(time*0.002 + p.y)*2;

    let x = p.baseX + dx;
    let y = p.baseY + dy;

    ctx.fillStyle = "rgba(0,150,255,0.8)";
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI*2);
    ctx.fill();
  });
}

// 🎵 MUSIC AUTO PLAY (click дээр ажиллана)
document.body.addEventListener("click", () => {
  document.getElementById("music").play();
});

// 🔁 LOOP
function animate(time) {
  drawStars();
  drawHeart(time);
  requestAnimationFrame(animate);
}

animate();