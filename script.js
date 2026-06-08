/* ========================================= */
/* AGRO FUTURO 2026 */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================= */
    /* ACCORDION */
    /* ========================================= */

    const accordionHeaders =
        document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {

        header.addEventListener("click", () => {

            const content =
                header.nextElementSibling;

            const aberto =
                content.style.display === "block";

            document
                .querySelectorAll(".accordion-content")
                .forEach(item => {
                    item.style.display = "none";
                });

            if (!aberto) {
                content.style.display = "block";
            }

        });

    });

    /* ========================================= */
    /* FORMULÁRIO */
    /* ========================================= */

    const form =
        document.getElementById("formSeminario");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            alert(
                "Inscrição realizada com sucesso! 🌱"
            );

            form.reset();

        });

    }

    /* ========================================= */
    /* COMENTÁRIOS */
    /* ========================================= */

    const btnComentario =
        document.getElementById("enviarComentario");

    const textarea =
        document.getElementById("comentario");

    const listaComentarios =
        document.getElementById("listaComentarios");

    if (btnComentario) {

        btnComentario.addEventListener("click", () => {

            const texto =
                textarea.value.trim();

            if (texto === "") {

                alert("Digite um comentário.");

                return;
            }

            const comentario =
                document.createElement("div");

            comentario.classList.add(
                "comentario-item"
            );

            comentario.innerHTML = `
                <p>${texto}</p>
            `;

            listaComentarios.prepend(
                comentario
            );

            textarea.value = "";

        });

    }

    /* ========================================= */
    /* MINI GAME */
    /* ========================================= */

    let score = 0;

    const scoreElement =
        document.getElementById("score");

    const resultado =
        document.getElementById("resultadoGame");

    const corretos =
        document.querySelectorAll(".correto");

    const errados =
        document.querySelectorAll(".errado");

    corretos.forEach(botao => {

        botao.addEventListener("click", () => {

            score += 10;

            scoreElement.textContent =
                score;

            resultado.textContent =
                "Excelente! 🌱 Essa prática ajuda o meio ambiente.";

        });

    });

    errados.forEach(botao => {

        botao.addEventListener("click", () => {

            score -= 5;

            if (score < 0) {
                score = 0;
            }

            scoreElement.textContent =
                score;

            resultado.textContent =
                "Essa prática prejudica o meio ambiente. ❌";

        });

    });

    /* ========================================= */
    /* MENSAGEM DE BOAS VINDAS */
    /* ========================================= */

    const mensagem =
        document.getElementById(
            "mensagemBoasVindas"
        );

    const fecharMensagem =
        document.getElementById(
            "fecharMensagem"
        );

    if (fecharMensagem) {

        fecharMensagem.addEventListener(
            "click",
            () => {

                mensagem.style.display =
                    "none";

            }
        );

    }

});
/* ========================================= */
/* ACESSIBILIDADE */
/* ========================================= */

let tamanhoFonte = 100;

const btnAumentar =
    document.getElementById("aumentarFonte");

const btnDiminuir =
    document.getElementById("diminuirFonte");

if (btnAumentar) {

    btnAumentar.addEventListener("click", () => {

        tamanhoFonte += 10;

        document.body.style.fontSize =
            tamanhoFonte + "%";

    });

}

if (btnDiminuir) {

    btnDiminuir.addEventListener("click", () => {

        tamanhoFonte -= 10;

        if (tamanhoFonte < 70) {
            tamanhoFonte = 70;
        }

        document.body.style.fontSize =
            tamanhoFonte + "%";

    });

}

/* ========================================= */
/* MODO ESCURO */
/* ========================================= */

const btnTema =
    document.getElementById("alternarTema");

if (btnTema) {

    btnTema.addEventListener("click", () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    });

}

/* ========================================= */
/* LEITURA POR VOZ */
/* ========================================= */

const btnLer =
    document.getElementById("lerConteudo");

const btnParar =
    document.getElementById("pararLeitura");

let falaAtual = null;

if (btnLer) {

    btnLer.addEventListener("click", () => {

        speechSynthesis.cancel();

        const texto =
            document.getElementById(
                "conteudoLeitura"
            ).textContent;

        falaAtual =
            new SpeechSynthesisUtterance(texto);

        falaAtual.lang = "pt-BR";

        falaAtual.rate = 1;

        falaAtual.pitch = 1;

        speechSynthesis.speak(falaAtual);

    });

}

if (btnParar) {

    btnParar.addEventListener("click", () => {

        speechSynthesis.cancel();

    });

}

/* ========================================= */
/* BOTÃO VOLTAR AO TOPO */
/* ========================================= */

const btnTopo =
    document.getElementById("btnTopo");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        btnTopo.style.display = "block";

    } else {

        btnTopo.style.display = "none";

    }

});

if (btnTopo) {

    btnTopo.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ========================================= */
/* ANIMAÇÃO DAS BARRAS */
/* ========================================= */

function animarBarra(classe, largura) {

    const barra =
        document.querySelector(classe);

    if (!barra) return;

    barra.style.width = "0%";

    setTimeout(() => {

        barra.style.transition =
            "width 2s ease";

        barra.style.width =
            largura;

    }, 500);

}

window.addEventListener("load", () => {

    animarBarra(".barra1", "85%");
    animarBarra(".barra2", "92%");
    animarBarra(".barra3", "80%");

});

/* ========================================= */
/* ANIMAÇÃO AO SCROLL */
/* ========================================= */

const elementos =
    document.querySelectorAll(
        ".card, .stat-card, .imagem, .video-card, .accordion-item"
    );

function revelarElementos() {

    const gatilho =
        window.innerHeight * 0.85;

    elementos.forEach(elemento => {

        const topo =
            elemento.getBoundingClientRect().top;

        if (topo < gatilho) {

            elemento.style.opacity = "1";

            elemento.style.transform =
                "translateY(0px)";

        }

    });

}

elementos.forEach(elemento => {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(50px)";

    elemento.style.transition =
        "all .8s ease";

});

window.addEventListener(
    "scroll",
    revelarElementos
);

window.addEventListener(
    "load",
    revelarElementos
);

/* ========================================= */
/* EFEITO CONTADOR ESTATÍSTICAS */
/* ========================================= */

const numeros =
    document.querySelectorAll(".stat-card h3");

function animarNumero(elemento) {

    const texto =
        elemento.innerText;

    const valor =
        parseInt(
            texto.replace(/\D/g, "")
        );

    if (isNaN(valor)) return;

    let contador = 0;

    const incremento =
        Math.ceil(valor / 80);

    const timer = setInterval(() => {

        contador += incremento;

        if (contador >= valor) {

            contador = valor;

            clearInterval(timer);

        }

        if (texto.includes("%")) {

            elemento.innerText =
                contador + "%";

        } else if (texto.includes("+")) {

            elemento.innerText =
                "+" + contador;

        } else {

            elemento.innerText =
                contador;

        }

    }, 20);

}

window.addEventListener("load", () => {

    numeros.forEach(numero => {

        animarNumero(numero);

    });

});

/* ========================================= */
/* SALVAMENTO DE COMENTÁRIOS */
/* ========================================= */

const lista =
    document.getElementById(
        "listaComentarios"
    );

if (lista) {

    const comentariosSalvos =
        JSON.parse(
            localStorage.getItem(
                "comentariosAgro"
            )
        ) || [];

    comentariosSalvos.forEach(texto => {

        const div =
            document.createElement("div");

        div.classList.add(
            "comentario-item"
        );

        div.innerHTML =
            `<p>${texto}</p>`;

        lista.appendChild(div);

    });

    const botaoEnviar =
        document.getElementById(
            "enviarComentario"
        );

    if (botaoEnviar) {

        botaoEnviar.addEventListener(
            "click",
            () => {

                setTimeout(() => {

                    const todos =
                        document.querySelectorAll(
                            ".comentario-item"
                        );

                    const dados = [];

                    todos.forEach(item => {

                        dados.push(
                            item.textContent
                        );

                    });

                    localStorage.setItem(
                        "comentariosAgro",
                        JSON.stringify(dados)
                    );

                }, 100);

            }
        );

    }

}

/* ========================================= */
/* RELÓGIO DIGITAL */
/* ========================================= */

const relogio =
    document.createElement("div");

relogio.id = "relogioDigital";

relogio.style.position = "fixed";
relogio.style.top = "90px";
relogio.style.right = "20px";
relogio.style.padding = "10px 15px";
relogio.style.background = "#1565c0";
relogio.style.color = "white";
relogio.style.borderRadius = "12px";
relogio.style.zIndex = "9999";
relogio.style.fontWeight = "bold";

document.body.appendChild(relogio);

function atualizarRelogio() {

    const agora = new Date();

    relogio.innerHTML =
        agora.toLocaleTimeString("pt-BR");

}

setInterval(
    atualizarRelogio,
    1000
);

atualizarRelogio();

/* ========================================= */
/* FIM DO SCRIPT */
/* ========================================= */
