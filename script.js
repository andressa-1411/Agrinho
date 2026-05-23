document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMAÇÃO DAS PORCENTAGENS/NÚMEROS ---
    const counters = document.querySelectorAll('.counter');
    const speed = 80;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    if (+counter.innerText > target) {
                        counter.innerText = target;
                    }
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };
    // Dispara a animação dos números logo ao abrir
    startCounters();


    // --- 2. ACCORDION (CAIXAS EXPANSÍVEIS DOS BENEFÍCIOS) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            
            // Verifica se este já está ativo
            const isActive = body.classList.contains('active');
            
            // Fecha todos os blocos antes
            document.querySelectorAll('.accordion-body').forEach(item => {
                item.classList.remove('active');
            });

            // Se não estava ativo, abre o clicado
            if (!isActive) {
                body.classList.add('active');
            }
        });
    });


    // --- 3. CONTROLE DE TEMA (CLARO/ESCURO) ---
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    
    btnToggleTheme.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
        }
    });


    // --- 4. CONTROLE DE TAMANHO DE FONTE (ACESSIBILIDADE) ---
    let currentFontSize = 100;
    const btnIncrease = document.getElementById('btn-increase-font');
    const btnDecrease = document.getElementById('btn-decrease-font');

    btnIncrease.addEventListener('click', () => {
        currentFontSize += 8;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > 70) {
            currentFontSize -= 8;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });


    // --- 5. LEITURA POR VOZ (SPEECH SYNTHESIS) ---
    const btnTTS = document.getElementById('btn-tts');
    const btnStopTTS = document.getElementById('btn-stop-tts');
    let utterance = new SpeechSynthesisUtterance();

    btnTTS.addEventListener('click', () => {
        // Cancela leituras anteriores ativas para evitar travamento
        window.speechSynthesis.cancel();
        
        // Coleta apenas o texto dentro da área do manifesto principal
        const textToRead = document.getElementById('conteudo').innerText;
        utterance.text = textToRead;
        utterance.lang = 'pt-BR';
        utterance.rate = 1.1;

        window.speechSynthesis.speak(utterance);
    });

    btnStopTTS.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });


    // --- 6. MINI-GAME CORRIGIDO (DESAFIO AGROSUSTENTÁVEL) ---
    const gameCanvas = document.getElementById('game-canvas');
    const btnStartGame = document.getElementById('start-game');
    const scoreDisplay = document.getElementById('score');
    let gameScore = 0;
    let gameInterval = null;

    const spawnMicroorganism = () => {
        // Verifica se o canvas do jogo ainda existe na tela
        if (!gameCanvas) return;

        const dot = document.createElement('div');
        dot.classList.add('microorganism');

        // Geração de coordenadas aleatórias seguras dentro do container
        const maxTop = gameCanvas.clientHeight - 45;
        const maxLeft = gameCanvas.clientWidth - 45;

        dot.style.top = `${Math.floor(Math.random() * maxTop)}px`;
        dot.style.left = `${Math.floor(Math.random() * maxLeft)}px`;

        // Evento de clique para pontuar
        dot.addEventListener('click', () => {
            gameScore++;
            scoreDisplay.innerText = `Pontos: ${gameScore}`;
            dot.remove();
        });

        gameCanvas.appendChild(dot);

        // O alvo desaparece após 1.5 segundos se o usuário falhar em clicar
        setTimeout(() => {
            if (dot.parentNode === gameCanvas) {
                dot.remove();
            }
        }, 1500);
    };

    btnStartGame.addEventListener('click', () => {
        // Reinicializa pontuação e limpa estados anteriores
        gameScore = 0;
        scoreDisplay.innerText = `Pontos: 0`;
        btnStartGame.innerText = "Reiniciar Jogo";
        
        // Limpa loops anteriores para não acumular velocidade incorreta
        if (gameInterval) clearInterval(gameInterval);

        // Inicia o spawn contínuo a cada 800 milissegundos
        gameInterval = setInterval(spawnMicroorganism, 800);

        // Termina a rodada após 12 segundos corridos
        setTimeout(() => {
            clearInterval(gameInterval);
            // Limpa os microrganismos restantes na arena
            document.querySelectorAll('.microorganism').forEach(el => el.remove());
            alert(`Fim da Rodada! Você coletou ${gameScore} microrganismos e tornou o solo produtivo!`);
        }, 12000);
    });


    // --- 7. CAIXA DE COMENTÁRIOS INTERATIVA ---
    const btnComment = document.getElementById('send-comment');
    const commentInput = document.getElementById('user-comment');
    const commentsList = document.getElementById('display-comments');

    btnComment.addEventListener('click', () => {
        const text = commentInput.value.trim();
        if (text !== "") {
            const commentItem = document.createElement('div');
            commentItem.className = 'stat-card';
            commentItem.style.marginTop = "15px";
            commentItem.style.padding = "20px";
            commentItem.style.textAlign = "left";
            commentItem.innerHTML = `<p style="font-style: italic;">"${text}"</p><small style="color: #777; display:block; margin-top:5px;">Enviado por Leitor Anônimo</small>`;
            
            commentsList.prepend(commentItem);
            commentInput.value = "";
        } else {
            alert("Por favor, digite um comentário antes de enviar.");
        }
    });
});
