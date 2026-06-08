document.addEventListener("DOMContentLoaded", () => {

/* ========================================= */
/* PARTÍCULAS DE FUNDO */
/* ========================================= */

function criarParticulas() {

    for (let i = 0; i < 40; i++) {

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
/* MINI GAME COM FASES */
/* ========================================= */

let pontos = 0;
let fase = 1;

const score = document.getElementById("score");
const resultado = document.getElementById("resultadoGame");

function atualizarFase() {

    if (pontos < 30) fase = 1;
    else if (pontos < 60) fase = 2;
    else fase = 3;

    let textoFase = "";

    if (fase === 1) textoFase = "🌱 Missão 1: Saúde do Solo";
    if (fase === 2) textoFase = "🌦 Missão 2: Clima e Água";
    if (fase === 3) textoFase = "🌍 Missão 3: Carbono Zero";

    resultado.textContent = textoFase;
}

function atualizar() {
    score.textContent = pontos;
    atualizarFase();
}

document.querySelectorAll(".game-buttons button").forEach(btn => {

    btn.addEventListener("click", () => {

        const txt = btn.textContent;

        if (txt.includes("Plantio") ||
            txt.includes("ILPF") ||
            txt.includes("Bioinsumos") ||
            txt.includes("Precisão")) {

            pontos += 10;
        }

        if (txt.includes("Desmatamento") ||
            txt.includes("Queimada")) {

            pontos -= 15;
            if (pontos < 0) pontos = 0;
        }

        atualizar();
    });

});

/* ========================================= */
/* RANKING LOCAL */
/* ========================================= */

function salvarRanking(nome, pontos) {

    let ranking = JSON.parse(localStorage.getItem("rankingAgro")) || [];

    ranking.push({ nome, pontos });

    ranking.sort((a, b) => b.pontos - a.pontos);

    ranking = ranking.slice(0, 5);

    localStorage.setItem("rankingAgro", JSON.stringify(ranking));
}

/* ========================================= */
/* IA SIMULADA */
/* ========================================= */

function iaAgro() {

    let resposta = "";

    if (pontos < 30) {
        resposta = "🤖 IA: Recomendo aumentar práticas sustentáveis!";
    } else if (pontos < 60) {
        resposta = "🤖 IA: Sistema equilibrado. Continue assim!";
    } else {
        resposta = "🤖 IA: Excelente! Agro altamente sustentável detectado.";
    }

    const div = document.createElement("div");
    div.className = "comentario-item";
    div.innerHTML = "<strong>IA do Agro:</strong><p>" + resposta + "</p>";

    document.getElementById("listaComentarios").prepend(div);
}

/* ========================================= */
/* DASHBOARD COM GRÁFICOS */
/* ========================================= */

const dashboard = document.createElement("div");
dashboard.id = "dashboard";

dashboard.innerHTML = `
<h2>📊 Mini Dashboard Agro</h2>
<div class="dash-grid">

    <div class="dash-card">
        <h3>Produção Sustentável</h3>
        <div class="barra-dash"><div style="width:85%"></div></div>
    </div>

    <div class="dash-card">
        <h3>Redução de Impacto</h3>
        <div class="barra-dash"><div style="width:70%"></div></div>
    </div>

    <div class="dash-card">
        <h3>Adoção Tech</h3>
        <div class="barra-dash"><div style="width:90%"></div></div>
    </div>

</div>
`;

document.body.appendChild(dashboard);

/* ========================================= */
/* ACESSIBILIDADE (CORRIGIDA) */
/* ========================================= */

let font = 100;

document.getElementById("aumentarFonte").onclick = () => {
    font += 10;
    document.body.style.fontSize = font + "%";
};

document.getElementById("diminuirFonte").onclick = () => {
    font -= 10;
    if (font < 70) font = 70;
    document.body.style.fontSize = font + "%";
};

document.getElementById("alternarTema").onclick = () => {
    document.body.classList.toggle("dark-mode");
};

/* ========================================= */
/* LEITURA IA */
/* ========================================= */

document.getElementById("lerConteudo").onclick = () => {

    const texto = document.getElementById("conteudoLeitura").textContent;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";

    speechSynthesis.cancel();
    speechSynthesis.speak(fala);
};

document.getElementById("pararLeitura").onclick = () => {
    speechSynthesis.cancel();
};

/* ========================================= */
/* BOTÃO TOPO */
/* ========================================= */

const topo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {
    topo.style.display = window.scrollY > 400 ? "block" : "none";
});

topo.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

});
