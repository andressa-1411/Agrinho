
// ================= HERO CTA =================
document.getElementById("ctaBtn").addEventListener("click", () => {
  document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
});

// ================= ACCORDION =================
document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});

// ================= DARK MODE =================
document.getElementById("darkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ================= FONT CONTROL =================
let fontSize = 16;

document.getElementById("fontUp").addEventListener("click", () => {
  fontSize += 2;
  document.body.style.fontSize = fontSize + "px";
});

document.getElementById("fontDown").addEventListener("click", () => {
  fontSize -= 2;
  document.body.style.fontSize = fontSize + "px";
});

// ================= SPEECH API =================
let speech;

document.getElementById("readPage").addEventListener("click", () => {
  const text = document.getElementById("mainContent").innerText;

  speech = new SpeechSynthesisUtterance(text);
  speech.lang = "pt-BR";

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
});

document.getElementById("stopRead").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

// ================= COMMENTS =================
document.getElementById("sendComment").addEventListener("click", () => {
  const text = document.getElementById("comentario").value;

  if (!text) return;

  const div = document.createElement("div");
  div.textContent = "💬 " + text;
  div.style.marginTop = "10px";

  document.getElementById("comentList").appendChild(div);

  document.getElementById("comentario").value = "";
});

// ================= CHARTS =================

// Produção
const ctx1 = document.getElementById("growthChart");

new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun"],
    datasets: [{
      label: "Produção",
      data: [10, 18, 15, 28, 35, 42],
      borderColor: "lime",
      tension: 0.3
    }]
  }
});

// Clima
const ctx2 = document.getElementById("weatherChart");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Temp","Umidade","Chuva","Vento"],
    datasets: [{
      label: "Indicadores",
      data: [30, 65, 40, 25],
      backgroundColor: "orange"
    }]
  }
});

// ================= MAP =================
const map = document.getElementById("map");

for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  const r = Math.random();

  if (r < 0.3) cell.style.background = "#8b5a2b"; // solo
  else if (r < 0.6) cell.style.background = "#2ecc71"; // saudável
  else cell.style.background = "#7CFC00"; // ótimo

  map.appendChild(cell);
}

// ================= SENSORES =================
function updateSensors() {
  document.getElementById("soil").textContent = (50 + Math.random() * 50).toFixed(1);
  document.getElementById("temp").textContent = (18 + Math.random() * 15).toFixed(1);
  document.getElementById("ph").textContent = (5 + Math.random() * 3).toFixed(1);
}

setInterval(updateSensors, 1500);
updateSensors();

// ================= AI DECISION =================
const aiBox = document.getElementById("aiBox");

function aiBrain() {
  const soil = parseFloat(document.getElementById("soil").textContent);
  const temp = parseFloat(document.getElementById("temp").textContent);

  let msg = "";

  if (soil < 60) msg += "⚠ Irrigação ativada. ";
  if (temp > 30) msg += "🔥 Alta temperatura detectada. ";
  if (soil > 70 && temp < 28) msg += "✅ Condições ideais.";

  aiBox.textContent = msg || "Sistema estável. Nenhuma ação necessária.";
}

setInterval(aiBrain, 2000);

// ================= MINI GAME =================
let score = 0;
let gameInterval;

document.getElementById("startGame").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").textContent = "Pontuação: 0";

  gameInterval = setInterval(() => {
    const plant = document.createElement("div");
    plant.textContent = "🌱";
    plant.style.position = "absolute";
    plant.style.left = Math.random() * 90 + "%";
    plant.style.top = Math.random() * 90 + "%";
    plant.style.cursor = "pointer";

    plant.addEventListener("click", () => {
      score++;
      document.getElementById("score").textContent = "Pontuação: " + score;
      plant.remove();
    });

    document.getElementById("field").appendChild(plant);

    setTimeout(() => plant.remove(), 2000);

  }, 700);

  setTimeout(() => clearInterval(gameInterval), 15000);
});
