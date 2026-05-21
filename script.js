/* ======================================
   ACCORDION
====================================== */

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {

  header.addEventListener("click", () => {

    const content = header.nextElementSibling;

    content.style.maxHeight
      ? content.style.maxHeight = null
      : content.style.maxHeight = content.scrollHeight + "px";

  });

});

/* ======================================
   COMENTÁRIOS
====================================== */

const commentBtn = document.getElementById("comment-btn");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");

commentBtn.addEventListener("click", () => {

  const text = commentInput.value.trim();

  if(text === "") return;

  const comment = document.createElement("div");

  comment.classList.add("comment");

  comment.innerHTML = `
    <p>${text}</p>
  `;

  commentsList.prepend(comment);

  commentInput.value = "";

});

/* ======================================
   DARK / LIGHT MODE
====================================== */

const toggleThemeBtn = document.getElementById("toggle-theme");
const gameToggleBtn = document.getElementById("game-toggle-btn");
const themeStatus = document.getElementById("theme-status");

function toggleTheme() {

  document.body.classList.toggle("light-mode");

  const isLight =
    document.body.classList.contains("light-mode");

  themeStatus.textContent =
    isLight
      ? "Tema Atual: Claro"
      : "Tema Atual: Escuro";

  toggleThemeBtn.textContent =
    isLight ? "☀" : "🌙";

}

toggleThemeBtn.addEventListener("click", toggleTheme);
gameToggleBtn.addEventListener("click", toggleTheme);

/* ======================================
   AUMENTAR / DIMINUIR FONTE
====================================== */

let currentFontSize = 16;

const increaseFontBtn =
  document.getElementById("increase-font");

const decreaseFontBtn =
  document.getElementById("decrease-font");

increaseFontBtn.addEventListener("click", () => {

  currentFontSize += 1;

  document.documentElement.style.setProperty(
    "--font-size-base",
    `${currentFontSize}px`
  );

});

decreaseFontBtn.addEventListener("click", () => {

  if(currentFontSize > 12) {

    currentFontSize -= 1;

    document.documentElement.style.setProperty(
      "--font-size-base",
      `${currentFontSize}px`
    );

  }

});

/* ======================================
   LEITURA POR VOZ
====================================== */

const readBtn = document.getElementById("read-page");
const stopBtn = document.getElementById("stop-reading");

let speech;

readBtn.addEventListener("click", () => {

  const mainContent =
    document.getElementById("main-content").innerText;

  speech = new SpeechSynthesisUtterance(mainContent);

  speech.lang = "pt-BR";

  speech.rate = 1;

  window.speechSynthesis.speak(speech);

});

stopBtn.addEventListener("click", () => {

  window.speechSynthesis.cancel();

});

/* ======================================
   FORMULÁRIO
====================================== */

const seminarForm =
  document.querySelector(".seminar-form");

seminarForm.addEventListener("submit", (event) => {

  event.preventDefault();

  alert("Inscrição realizada com sucesso!");

  seminarForm.reset();

});
