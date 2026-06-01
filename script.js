// ACCORDION
document.querySelectorAll(".acc-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const content = btn.nextElementSibling;
    content.style.display = content.style.display==="block"?"none":"block";
  });
});

// FONT SIZE
let size = 16;
document.getElementById("aPlus").onclick=()=>document.body.style.fontSize=(++size)+"px";
document.getElementById("aMinus").onclick=()=>document.body.style.fontSize=(--size)+"px";

// DARK MODE
document.getElementById("dark").onclick=()=>{
  document.body.classList.toggle("dark");
};

// SPEECH API
let speech;

document.getElementById("speak").onclick=()=>{
  const text = document.querySelector("[data-main]").innerText;
  speech = new SpeechSynthesisUtterance(text);
  speech.lang="pt-BR";
  window.speechSynthesis.speak(speech);
};

document.getElementById("stop").onclick=()=>{
  window.speechSynthesis.cancel();
};

// COMMENTS
document.getElementById("sendComment").onclick=()=>{
  const box = document.getElementById("commentBox");
  const div = document.createElement("div");
  div.textContent = box.value;
  document.getElementById("commentList").appendChild(div);
  box.value="";
};

// MINI GAME
const grid = document.getElementById("grid");
let score = 0;

for(let i=0;i<16;i++){
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click",()=>{
    cell.style.background="gold";
    score++;
    document.getElementById("score").innerText="Score: "+score;
  });

  grid.appendChild(cell);
}
