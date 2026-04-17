const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* -------- SCENES -------- */

let scene = 0;

const scenes = [
  {
    title: "",
    text: "In a world full of randomness..."
  },
  {
    title: "",
    text: "Something beautiful started to grow..."
  },
  {
    title: "",
    text: "And then... you came into my life"
  },
  {
    title: "",
    text: "You made everything brighter"
  },
  {
    title: "Happy Birthday ❤️",
    text: "[Her Name], you are my favorite story 🌸"
  }
];

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const replayBtn = document.getElementById("replayBtn");

/* -------- PARTICLES (stars + fireflies) -------- */

let particles = [];

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*2,
      speedX: (Math.random()-0.5)*0.5,
      speedY: (Math.random()-0.5)*0.5
    });
  }
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x += p.speedX;
    p.y += p.speedY;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.7)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

/* -------- FLOWERS -------- */

function createFlower(x,y) {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.style.left = x+"px";
  flower.style.top = y+"px";

  const color = `hsl(${Math.random()*360},70%,80%)`;

  for (let i=0;i<6;i++){
    const petal = document.createElement("div");
    petal.className="petal";
    petal.style.background=color;
    petal.style.transform=`rotate(${i*60}deg) translateY(-15px)`;
    flower.appendChild(petal);
  }

  document.body.appendChild(flower);
}

/* -------- SCENE LOGIC -------- */

function updateScene() {
  const s = scenes[scene];

  titleEl.innerText = s.title;
  subtitleEl.innerText = s.text;

  document.querySelectorAll(".flower").forEach(f=>f.remove());

  if (scene === 1) {
    createFlower(window.innerWidth/2, window.innerHeight/2);
  }

  if (scene === 2) {
    for (let i=0;i<6;i++) {
      createFlower(Math.random()*window.innerWidth, Math.random()*window.innerHeight);
    }
  }

  if (scene === 3) {
    initParticles(80);
  }

  if (scene === 4) {
    for (let i=0;i<15;i++) {
      createFlower(Math.random()*window.innerWidth, Math.random()*window.innerHeight);
    }
    initParticles(120);
    replayBtn.style.display = "inline-block";
  }
}

/* Click to progress */
document.addEventListener("click", () => {
  if (scene < scenes.length - 1) {
    scene++;
    updateScene();
  }
});

/* Replay */
replayBtn.onclick = () => {
  scene = 0;
  replayBtn.style.display = "none";
  updateScene();
};

/* -------- MUSIC -------- */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

musicBtn.onclick = () => {
  if (!playing) {
    music.play();
    musicBtn.textContent = "🔇 Mute";
  } else {
    music.pause();
    musicBtn.textContent = "🔊 Music";
  }
  playing = !playing;
};

/* -------- INIT -------- */

initParticles(50);
animateParticles();
updateScene();

/* -------- PARALLAX -------- */

document.addEventListener("mousemove", (e)=>{
  const x = (e.clientX/window.innerWidth - 0.5)*20;
  const y = (e.clientY/window.innerHeight - 0.5)*20;
  canvas.style.transform = `translate(${x}px, ${y}px)`;
});