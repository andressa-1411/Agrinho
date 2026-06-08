document.addEventListener("DOMContentLoaded", () => {

/* ========================================= */
/* PROTEÇÃO ANTI-ERRO (IMPORTANTE) */
/* ========================================= */

const safeGet = (id) => document.getElementById(id);

/* ========================================= */
/* PARTÍCULAS (SEGURO) */
/* ========================================= */

function criarParticulas() {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = "particula";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.animationDuration = (Math.random() * 5 + 3) + "s";
        document.body.appendChild(p);
    }
}
criarParticulas();

/* ========================================= */
/* MINI GAME SEGURO */
/* ========================================= */

let pontos = 0;

const score = safeGet("score");
const resultado = safeGet("resultadoGame");

function atualizar() {
    if (score) score.textContent = pontos;

    if (!resultado) return;

    if (pontos < 30) resultado.textContent = "🌱 Missão 1: Solo";
    else if (pontos < 60) resultado.textContent = "🌦 Missão 2: Clima";
    else resultado.textContent = "🌍 Missão 3: Carbono Zero";
}

document.querySelectorAll(".game-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {

        const txt = btn.textContent;

        if (
            txt.includes("Plantio") ||
            txt.includes("ILPF") ||
            txt.includes("Bioinsumos") ||
            txt.includes("Precisão")
        ) {
            pontos += 10;
        } else {
            pontos -= 10;
            if (pontos < 0) pontos = 0;
        }

        atualizar();
    });
});

/* ========================================= */
/* COMENTÁRIOS SEGUROS */
/* ========================================= */

const btnComentario = safeGet("enviarComentario");
const inputComentario = safeGet("comentario");
const lista = safeGet("listaComentarios");

if (btnComentario && inputComentario && lista) {
    btnComentario.addEventListener("click", () => {

        const txt = inputComentario.value.trim();
        if (!txt) return;

        const div = document.createElement("div");
        div.className = "comentario-item";
        div.innerHTML = "👤 " + txt;

        lista.prepend(div);
        inputComentario.value = "";
    });
}

/* ========================================= */
/* IA SIMPLES (SEM QUEBRAR SITE) */
/* ========================================= */

setTimeout(() => {

    if (!lista) return;

    const msg =
        pontos < 30 ? "🤖 IA: melhorar sustentabilidade" :
        pontos < 60 ? "🤖 IA: progresso bom" :
        "🤖 IA: excelente agro sustentável";

    const d = document.createElement("div");
    d.className = "comentario-item";
    d.innerHTML = msg;

    lista.prepend(d);

}, 1500);

/* ========================================= */
/* ACESSIBILIDADE SEGURA */
/* ========================================= */

let font = 100;

const up = safeGet("aumentarFonte");
const down = safeGet("diminuirFonte");
const theme = safeGet("alternarTema");

if (up) {
    up.addEventListener("click", () => {
        font += 10;
        document.body.style.fontSize = font + "%";
    });
}

if (down) {
    down.addEventListener("click", () => {
        font -= 10;
        if (font < 70) font = 70;
        document.body.style.fontSize = font + "%";
    });
}

if (theme) {
    theme.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

/* ========================================= */
/* LEITURA POR VOZ SEGURA */
/* ========================================= */

const ler = safeGet("lerConteudo");
const parar = safeGet("pararLeitura");

if (ler) {
    ler.addEventListener("click", () => {
        speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(document.body.innerText);
        fala.lang = "pt-BR";
        speechSynthesis.speak(fala);
    });
}

if (parar) {
    parar.addEventListener("click", () => {
        speechSynthesis.cancel();
    });
}

/* ========================================= */
/* BOTÃO TOPO SEGURO */
/* ========================================= */

const topo = safeGet("btnTopo");

if (topo) {
    window.addEventListener("scroll", () => {
        topo.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ========================================= */
/* DASHBOARD (SÓ SE EXISTIR CHART + CANVAS) */
/* ========================================= */

const canvas = safeGet("graficoAgro");

if (canvas && typeof Chart !== "undefined") {

    new Chart(canvas, {
        type: "bar",
        data: {
            labels: ["Solo", "Clima", "Carbono", "Tech"],
            datasets: [{
                label: "Índice",
                data: [80, 70, 90, 95],
                backgroundColor: ["green", "blue", "orange", "purple"]
            }]
        }
    });

}

});
