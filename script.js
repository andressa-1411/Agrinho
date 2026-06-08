/* ========================================= */
/* AGROFUTURO 2026 - SCRIPT CORRIGIDO */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================= */
    /* ACCORDION */
    /* ========================================= */

    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {

            const content = header.nextElementSibling;
            const isOpen = content.style.display === "block";

            document.querySelectorAll(".accordion-content")
                .forEach(c => c.style.display = "none");

            content.style.display = isOpen ? "none" : "block";
        });
    });

    /* ========================================= */
    /* FORMULÁRIO */
    /* ========================================= */

    const form = document.getElementById("formSeminario");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Inscrição enviada com sucesso! 🌱 Em breve entraremos em contato.");
            form.reset();
        });
    }

    /* ========================================= */
    /* COMENTÁRIOS HUMANIZADOS */
    /* ========================================= */

    const btnComentario = document.getElementById("enviarComentario");
    const textarea = document.getElementById("comentario");
    const listaComentarios = document.getElementById("listaComentarios");

    function criarComentario(texto) {

        const div = document.createElement("div");
        div.classList.add("comentario-item");

        const hora = new Date().toLocaleTimeString("pt-BR");

        div.innerHTML = `
            <strong>👤 Anônimo do Agro</strong>
            <p>${texto}</p>
            <small>🕒 ${hora}</small>
        `;

        return div;
    }

    if (btnComentario) {

        btnComentario.addEventListener("click", () => {

            const texto = textarea.value.trim();

            if (!texto) {
                alert("Escreva algo antes de enviar 🙂");
                return;
            }

            const comentario = criarComentario(texto);

            listaComentarios.prepend(comentario);

            textarea.value = "";
        });
    }

    /* ========================================= */
    /* MINI GAME MELHORADO - "GUARDIÕES DO SOLO" */
    /* ========================================= */

    let pontos = 0;

    const score = document.getElementById("score");
    const resultado = document.getElementById("resultadoGame");

    const boasPraticas = [
        "Plantio Direto",
        "Agricultura de Precisão",
        "ILPF",
        "Bioinsumos"
    ];

    const ruins = [
        "Desmatamento",
        "Queimada Ilegal"
    ];

    function atualizar() {
        score.textContent = pontos;

        if (pontos >= 40) {
            resultado.textContent = "🏆 Excelente! Você virou um Guardião do Solo!";
        } else if (pontos >= 20) {
            resultado.textContent = "🌱 Muito bem! Você está protegendo o meio ambiente!";
        } else {
            resultado.textContent = "Continue escolhendo práticas sustentáveis!";
        }
    }

    document.querySelectorAll(".game-buttons button").forEach(btn => {

        btn.addEventListener("click", () => {

            const texto = btn.textContent.trim();

            if (boasPraticas.some(p => texto.includes(p))) {
                pontos += 10;
                resultado.textContent = "✔ Boa escolha! Sustentabilidade em ação 🌱";
            }

            if (ruins.some(r => texto.includes(r))) {
                pontos -= 10;
                if (pontos < 0) pontos = 0;
                resultado.textContent = "❌ Essa ação prejudica o solo e o clima!";
            }

            atualizar();
        });
    });

    /* ========================================= */
    /* BOAS VINDAS */
    /* ========================================= */

    const modal = document.getElementById("mensagemBoasVindas");
    const fechar = document.getElementById("fecharMensagem");

    if (fechar) {
        fechar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    /* ========================================= */
    /* ACESSIBILIDADE */
    /* ========================================= */

    let fontSize = 100;

    document.getElementById("aumentarFonte").addEventListener("click", () => {
        fontSize += 10;
        document.body.style.fontSize = fontSize + "%";
    });

    document.getElementById("diminuirFonte").addEventListener("click", () => {
        fontSize -= 10;
        if (fontSize < 70) fontSize = 70;
        document.body.style.fontSize = fontSize + "%";
    });

    document.getElementById("alternarTema").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    /* ========================================= */
    /* LEITURA DE TEXTO (VOZ) */
    /* ========================================= */

    let fala;

    document.getElementById("lerConteudo").addEventListener("click", () => {

        const texto = document.getElementById("conteudoLeitura").textContent;

        window.speechSynthesis.cancel();

        fala = new SpeechSynthesisUtterance(texto);
        fala.lang = "pt-BR";
        fala.rate = 1;

        window.speechSynthesis.speak(fala);
    });

    document.getElementById("pararLeitura").addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });

    /* ========================================= */
    /* BOTÃO TOPO */
    /* ========================================= */

    const topo = document.getElementById("btnTopo");

    window.addEventListener("scroll", () => {
        topo.style.display = window.scrollY > 400 ? "block" : "none";
    });

    topo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});
