// ACCORDION
document.querySelectorAll(".accordion-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const panel = btn.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});

// DARK MODE
document.getElementById("darkMode").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
});

// FONT SIZE
let font = 16;

document.getElementById("fontUp").addEventListener("click",()=>{
  font += 2;
  document.body.style.fontSize = font + "px";
});

document.getElementById("fontDown").addEventListener("click",()=>{
  font -= 2;
  document.body.style.fontSize = font + "px";
});

// SPEECH SYNTHESIS
let speech;

document.getElementById("readPage").addEventListener("click",()=>{
  const text = document.getElementById("mainContent").innerText;
  speech = new SpeechSynthesisUtterance(text);
  speech.lang = "pt-BR";
  window.speechSynthesis.speak(speech);
});

document.getElementById("stopRead").addEventListener("click",()=>{
  window.speechSynthesis.cancel();
});

// COMMENTS
document.getElementById("sendComment").addEventListener("click",()=>{
  const text = document.getElementById("comentario").value;
  const div = document.createElement("div");
  div.textContent = text;
  document.getElementById("comentList").appendChild(div);
});

// MINI GAME
let score = 0;
let gameInterval;

document.getElementById("startGame").addEventListener("click",()=>{
  score = 0;
  document.getElementById("score").textContent = "Pontuação: 0";

  gameInterval = setInterval(()=>{
    const grain = document.createElement("div");
    grain.textContent = "🌱";
    grain.style.position = "absolute";
    grain.style.left = Math.random()*90 + "%";
    grain.style.top = Math.random()*90 + "%";
    grain.style.cursor = "pointer";

    grain.addEventListener("click",()=>{
      score++;
      document.getElementById("score").textContent = "Pontuação: " + score;
      grain.remove();
    });

    document.getElementById("field").appendChild(grain);

    setTimeout(()=>grain.remove(),2000);

  },800);

  setTimeout(()=>{
    clearInterval(gameInterval);
  },15000);
});
