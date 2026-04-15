// ================= TIMER =================
let time = 1500;
let interval;
let currentMission = "";

function update() {
  let m = Math.floor(time / 60);
  let s = time % 60;
  document.getElementById("time").innerText =
    m + ":" + (s < 10 ? "0" : "") + s;
}

function start() {
  if (interval) return;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      update();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Missão concluída 🚀");
      time = 1500;
    }
  }, 1000);
}

function pause() {
  clearInterval(interval);
  interval = null;
}

// ================= MISSÕES =================
let missions = JSON.parse(localStorage.getItem("missions") || "[]");

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  missions.forEach((m, i) => {
    let div = document.createElement("div");
    div.innerText = m;

    div.onclick = () => {
      currentMission = m;
      document.querySelectorAll("#list div")
        .forEach(e => e.classList.remove("active"));
      div.classList.add("active");
    };

    list.appendChild(div);
  });
}

function addMission() {
  let input = document.getElementById("input");
  if (!input.value) return;

  missions.push(input.value);
  localStorage.setItem("missions", JSON.stringify(missions));
  input.value = "";
  render();
}

// ================= NAV =================
function show(screen) {
  document.querySelectorAll(".screen").forEach(s => {
    s.style.display = "none";
  });

  document.getElementById(screen).style.display = "flex";
}

// ================= FUNDO =================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    v: Math.random() * 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(s => {
    s.y += s.v;
    if (s.y > canvas.height) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
update();
render();
