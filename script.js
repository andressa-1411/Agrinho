// =========================
// ACCORDION
// =========================

const accordionButtons =
document.querySelectorAll(".accordion-btn");

accordionButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const content =
    button.nextElementSibling;

    if(content.style.maxHeight){

      content.style.maxHeight = null;

    }else{

      content.style.maxHeight =
      content.scrollHeight + "px";

    }

  });

});

// =========================
// TEMA ESCURO / CLARO
// =========================

const toggleTema =
document.getElementById("toggleTema");

toggleTema.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){

    toggleTema.textContent = "☀️";

  }else{

    toggleTema.textContent = "🌙";

  }

});

// =========================
// AUMENTAR / DIMINUIR FONTE
// =========================

let tamanhoFonte = 16;

const aumentarFonte =
document.getElementById("aumentarFonte");

const diminuirFonte =
document.getElementById("diminuirFonte");

aumentarFonte.addEventListener("click", () => {

  tamanhoFonte += 1;

  document.documentElement.style.fontSize =
  tamanhoFonte + "px";

});

diminuirFonte.addEventListener("click", () => {

  tamanhoFonte -= 1;

  if(tamanhoFonte < 12){
    tamanhoFonte = 12;
  }

  document.documentElement.style.fontSize =
  tamanhoFonte + "px";

});

// =========================
// LEITURA POR VOZ
// =========================

const lerConteudo =
document.getElementById("lerConteudo");

const pararLeitura =
document.getElementById("pararLeitura");

let fala;

lerConteudo.addEventListener("click", () => {

  const principal =
  document.querySelector(".conteudo-principal");

  const texto =
  principal.innerText;

  fala =
  new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";

  speechSynthesis.speak(fala);

});

pararLeitura.addEventListener("click", () => {

  speechSynthesis.cancel();

});

// =========================
// MINI GAME
// =========================

let score = 0;

const scoreElement =
document.getElementById("score");

const gameBtn =
document.getElementById("gameBtn");

gameBtn.addEventListener("click", () => {

  const ganho =
  Math.floor(Math.random() * 15) + 1;

  score += ganho;

  scoreElement.textContent = score;

  gameBtn.textContent =
  "Produção +" + ganho + " 🌾";

  setTimeout(() => {

    gameBtn.textContent =
    "Cultivar 🌱";

  }, 800);

});
