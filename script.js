document.addEventListener("DOMContentLoaded", () => {

/* ========================================= */
/* PARTÍCULAS NO FUNDO */
/* ========================================= */

function criarParticulas() {

    for (let i = 0; i < 50; i++) {

        const p = document.createElement("div");

        p.className = "particula";

        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.animationDuration = (Math.random() * 6 + 3) + "s";

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

    const fases = {
        1: "🌱 Missão 1: Solo Saudável",
        2: "🌦 Missão 2: Clima Inteligente",
        3: "🌍 Missão 3: Carbono Zero"
    };

    resultado.textContent = fases[fase];
}

function atualizar() {
    score.textContent = pontos;
    atualizarFase();
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
        }

        if (
            txt.includes("Desmatamento") ||
            txt.includes("Queimada")
        ) {
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
/* IA SIMULADA DO AGRO */
/* ========================================= */

function iaAgro() {

    let msg = "";

    if (pontos < 30) {
        msg = "⚠ IA: Sistema agrícola instável. Melhore práticas sustentáveis.";
    } else if (pontos < 60) {
        msg = "🤖 IA: Nível médio de sustentabilidade. Progresso detectado.";
    } else {
        msg = "🌍 IA: Agro sustentável otimizado com alta eficiência!";
    }

    const div = document.createElement("div");
    div.className = "comentario-item";

    div.innerHTML = `
        <strong>🤖 IA do Agro</strong>
        <p>${msg}</p>
    `;

    document.getElementById("listaComentarios").prepend(div);
}

/* ========================================= */
/* DASHBOARD COM GRÁFICOS REAIS */
/* ========================================= */

const ctx = document.createElement("canvas");
ctx.id = "graficoAgro";

document.body.appendChild(ctx);

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Solo", "Clima", "Carbono", "Tecnologia"],
        datasets: [{
            label: "Índice de Sustentabilidade",
            data: [85, 70, 90, 95],
            backgroundColor: [
                "#2e7d32",
                "#42a5f5",
                "#ffb300",
                "#1565c0"
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

/* ========================================= */
/* ACESSIBILIDADE */
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
/* LEITURA POR VOZ */
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

topo.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ========================================= */
/* COMENTÁRIOS HUMANIZADOS + IA */
/* ========================================= */

const btnComentario = document.getElementById("enviarComentario");
const textarea = document.getElementById("comentario");
const lista = document.getElementById("listaComentarios");

btnComentario.addEventListener("click", () => {

    const texto = textarea.value.trim();

    if (!texto) return;

    const div = document.createElement("div");
    div.className = "comentario-item";

    div.innerHTML = `
        <strong>👤 Usuário do Agro</strong>
        <p>${texto}</p>
    `;

    lista.prepend(div);

    textarea.value = "";

    setTimeout(iaAgro, 1200);
});

/* ========================================= */
/* INICIALIZAÇÃO */
/* ========================================= */

atualizar();

});
