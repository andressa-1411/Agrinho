/**
 * AgroFuturo 2026 - Inteligência Digital Aplicada
 * Arquivo de interações, acessibilidade e simulação de game.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SISTEMA DE SEÇÕES EXPANSÍVEIS (ACCORDION)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');
            
            // Fecha todos antes de abrir o atual (comportamento exclusivo padrão)
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isOpen) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            } else {
                header.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ==========================================
    // 2. CONTROLES FLUTUANTES DE ACESSIBILIDADE
    // ==========================================
    const toggleBtn = document.querySelector('.btn-acessibilidade-toggle');
    const container = document.querySelector('.acessibilidade-container');
    const btnAumentar = document.getElementById('btn-aumentar-fonte');
    const btnDiminuir = document.getElementById('btn-diminuir-fonte');
    const btnTema = document.getElementById('btn-tema');
    const btnLer = document.getElementById('btn-voz-ler');
    const btnParar = document.getElementById('btn-voz-parar');

    let fontSizeAtual = 100; // Porcentagem do tamanho da fonte

    // Abre/fecha menu de ferramentas flutuantes
    toggleBtn.addEventListener('click', () => {
        container.classList.toggle('active');
    });

    // Escala de fontes
    btnAumentar.addEventListener('click', () => {
        if(fontSizeAtual < 130) {
            fontSizeAtual += 10;
            document.documentElement.style.fontSize = `${fontSizeAtual}%`;
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if(fontSizeAtual > 80) {
            fontSizeAtual -= 10;
            document.documentElement.style.fontSize = `${fontSizeAtual}%`;
        }
    });

    // Alternar Modo Escuro / Claro
    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // ==========================================
    // 3. LEITURA POR VOZ DE CONTEÚDO (SpeechSynthesis)
    // ==========================================
    let synth = window.speechSynthesis;
    let utterance = null;

    btnLer.addEventListener('click', () => {
        // Interrompe qualquer leitura em andamento
        synth.cancel();

        // Coleta apenas texto do conteúdo principal ignorando menus e botões
        const conteudoPrincipal = document.getElementById('conteudo-principal');
        if (!conteudoPrincipal) return;

        // Extrai apenas textos limpos de parágrafos e títulos
        const elementosTexto = conteudoPrincipal.querySelectorAll('h2, h3, p:not(.form-instruction), .metric-value, .metric-title');
        let textoParaLer = "";
        
        elementosTexto.forEach(el => {
            textoParaLer += el.innerText + ". ";
        });

        if (textoParaLer.trim() !== "") {
            utterance = new SpeechSynthesisUtterance(textoParaLer);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;

            utterance.onend = () => {
                btnLer.classList.remove('hidden');
                btnParar.classList.add('hidden');
            };

            btnLer.classList.add('hidden');
            btnParar.classList.remove('hidden');
            
            synth.speak(utterance);
        }
    });

    btnParar.addEventListener('click', () => {
        synth.cancel();
        btnLer.classList.remove('hidden');
        btnParar.classList.add('hidden');
    });

    // ==========================================
    // 4. VALIDAÇÃO DO FORMULÁRIO DE INSCRIÇÃO
    // ==========================================
    const formCadastro = document.getElementById('cadastro-seminario');
    const formFeedback = document.getElementById('form-feedback');

    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Simulação de requisição AJAX/API bem sucedida
        if (nome && email) {
            formFeedback.textContent = `Sucesso! Obrigado por se inscrever, ${nome}. Enviamos as credenciais de acesso para ${email}.`;
            formFeedback.className = "form-feedback success";
            formFeedback.classList.remove('hidden');
            formCadastro.reset();
        } else {
            formFeedback.textContent = "Erro: Por favor, preencha todos os campos obrigatórios corretamente.";
            formFeedback.className = "form-feedback error";
            formFeedback.classList.remove('hidden');
        }
    });

    // ==========================================
    // 5. INTERAÇÃO DE COMENTÁRIOS
    // ==========================================
    const commentForm = document.getElementById('comment-form');
    const commentText = document.getElementById('comment-text');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = commentText.value.trim();

        if(texto) {
            const novoComentario = document.createElement('div');
            novoComentario.className = 'comment-item';
            novoComentario.innerHTML = `
                <strong>Produtor Anônimo (Você)</strong>
                <p>${texto}</p>
            `;
            
            // Adiciona no topo da lista
            commentsList.insertBefore(novoComentario, commentsList.firstChild);
            commentText.value = "";
        }
    });

    // ==========================================
    // 6. MINI GAME: AGRO-EQUILÍBRIO SIMULAÇÃO
    // ==========================================
    let prod = 50;
    let env = 50;

    const gameProdEl = document.getElementById('game-prod');
    const gameEnvEl = document.getElementById('game-env');
    const gameMessage = document.getElementById('game-message');
    const btnGameIA = document.getElementById('btn-game-ia');
    const btnGameBio = document.getElementById('btn-game-bio');
    const btnGameDef = document.getElementById('btn-game-def');
    const btnGameReset = document.getElementById('btn-game-reset');

    function atualizarDashboard(msg) {
        // Garantir limites entre 0 e 100
        prod = Math.max(0, Math.min(100, prod));
        env = Math.max(0, Math.min(100, env));

        gameProdEl.textContent = prod;
        gameEnvEl.textContent = env;
        gameMessage.textContent = msg;

        verificarFimDeJogo();
    }

    function verificarFimDeJogo() {
        if (prod >= 90 && env >= 80) {
            gameMessage.innerHTML = "🏆 <strong>Parabéns!</strong> Você atingiu a Fazenda do Futuro: Produção máxima com impacto neutro!";
            travarBotoes(true);
        } else if (env <= 20) {
            gameMessage.innerHTML = "❌ <strong>Fim de Jogo!</strong> O ecossistema colapsou devido ao excesso de insumos sintéticos.";
            travarBotoes(true);
        } else if (prod <= 10) {
            gameMessage.innerHTML = "❌ <strong>Fim de Jogo!</strong> A fazenda faliu devido à baixa produtividade.";
            travarBotoes(true);
        }
    }

    function travarBotoes(status) {
        btnGameIA.disabled = status;
        btnGameBio.disabled = status;
        btnGameDef.disabled = status;
        if(status) btnGameReset.classList.remove('hidden');
    }

    btnGameIA.addEventListener('click', () => {
        prod += 15;
        env += 10;
        atualizarDashboard("A inteligência computacional otimizou os ciclos de água e colheita de forma sustentável!");
    });

    btnGameBio.addEventListener('click', () => {
        prod -= 5;
        env += 20;
        atualizarDashboard("Os bioinsumos regeneraram o microbioma da terra de forma saudável.");
    });

    btnGameDef.addEventListener('click', () => {
        prod += 25;
        env -= 30;
        atualizarDashboard("Aceleração agressiva de químicos! A produção subiu rápido, mas a terra sofreu danos severos.");
    });

    btnGameReset.addEventListener('click', () => {
        prod = 50;
        env = 50;
        travarBotoes(false);
        btnGameReset.classList.add('hidden');
        atualizarDashboard("Jogo reiniciado. Gerencie com sabedoria!");
    });
});
