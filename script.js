document.addEventListener("DOMContentLoaded", () => {

  // ================= CTA =================
  document.getElementById("ctaBtn")?.addEventListener("click", () => {
    document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
  });

  // ================= DARK MODE =================
  document.getElementById("darkMode")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // ================= FONT =================
  let font = 16;

  document.getElementById("fontUp")?.addEventListener("click", () => {
    font = Math.min(font + 2, 24);
    document.body.style.fontSize = font + "px";
  });

  document.getElementById("fontDown")?.addEventListener("click", () => {
    font = Math.max(font - 2, 12);
    document.body.style.fontSize = font + "px";
  });

  // ================= SPEECH =================
  let speaking = false;

  document.getElementById("readPage")?.addEventListener("click", () => {
    if (speaking) return;

    const text = document.getElementById("mainContent")?.innerText || "";

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "pt-BR";

    utter.onend = () => speaking = false;

    speaking = true;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  });

  document.getElementById("stopRead")?.addEventListener("click", () => {
    speaking = false;
    window.speechSynthesis.cancel();
  });

  // ================= CHARTS =================
  const p = document.getElementById("chartProduction");
  if (p) {
    new Chart(p, {
      type: "line",
      data: {
        labels: ["Jan","Fev","Mar","Abr","Mai","Jun"],
        datasets: [{
          label: "Produção",
          data: [10,20,25,30,45,60],
          borderColor: "#2ecc71"
        }]
      }
    });
  }

  const w = document.getElementById("chartWeather");
  if (w) {
    new Chart(w, {
      type: "bar",
      data: {
        labels: ["Temp","Umidade","Chuva","Vento"],
        datasets: [{
          label: "Clima",
          data: [28,70,40,20],
          backgroundColor: "#f1c40f"
        }]
      }
    });
  }

  // ================= MAP =================
  const map = document.getElementById("map");

  if (map) {
    map.innerHTML = "";

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const r = Math.random();

      cell.style.background =
        r < 0.3 ? "#8b5a2b" :
        r < 0.6 ? "#2ecc71" :
        "#7CFC00";

      map.appendChild(cell);
    }
  }

  // ================= SENSORS =================
  function updateSensors(){
    const soil = document.getElementById("soil");
    const temp = document.getElementById("temp");
    const ph = document.getElementById("ph");

    if (soil) soil.textContent = (50 + Math.random()*50).toFixed(1);
    if (temp) temp.textContent = (18 + Math.random()*15).toFixed(1);
    if (ph) ph.textContent = (5 + Math.random()*3).toFixed(1);
  }

  setInterval(updateSensors, 1500);
  updateSensors();

  // ================= AI =================
  const aiBox = document.getElementById("aiBox");

  function ai(){
    if (!aiBox) return;

    const soil = parseFloat(document.getElementById("soil")?.textContent || 0);
    const temp = parseFloat(document.getElementById("temp")?.textContent || 0);

    let msg = "";

    if (soil < 60) msg += "⚠ irrigação necessária. ";
    if (temp > 30) msg += "🔥 calor alto. ";
    if (soil > 70 && temp < 28) msg += "✅ perfeito.";

    aiBox.textContent = msg || "Sistema estável.";
  }

  setInterval(ai, 2000);

  // ================= GAME =================
  let score = 0;
  let running = false;
  let interval;

  const start = document.getElementById("startGame");
  const field = document.getElementById("field");
  const scoreBox = document.getElementById("score");

  start?.addEventListener("click", () => {
    if (running) return;

    running = true;
    score = 0;

    if (scoreBox) scoreBox.textContent = "0";

    interval = setInterval(() => {
      const plant = document.createElement("div");
      plant.textContent = "🌱";
      plant.style.position = "absolute";
      plant.style.left = Math.random()*90 + "%";
      plant.style.top = Math.random()*90 + "%";
      plant.style.cursor = "pointer";

      plant.onclick = () => {
        score++;
        if (scoreBox) scoreBox.textContent = score;
        plant.remove();
      };

      field?.appendChild(plant);

      setTimeout(() => plant.remove(), 2000);

    }, 700);

    setTimeout(() => {
      clearInterval(interval);
      running = false;
    }, 15000);
  });

});
