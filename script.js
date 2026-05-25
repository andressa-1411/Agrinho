document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SCRIPT DE CONTAGEM PROGRESSIVA DAS PORCENTAGENS ---
    const runCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let current = 0;
            const step = target / 30; // Velocidade da transição

            const updateNumber = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(updateNumber);
                } else {
                    counter.innerText = Math.floor(current);
                }
            }, 30);
        });
    };
    
    // Roda imediatamente no carregamento da janela
    runCounters();


    // --- 2. ACCORDION INTERATIVO ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isActive = body.classList.contains('active');
            
            document.querySelectorAll('.accordion-body').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                body.classList.add('active');
            }
        });
    });


    // --- 3. ALTERNAR TEMA DE CORES COM ANIMAÇÃO ---
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    btnToggleTheme.addEventListener('click', () => {
        document.body.style.transition = "background-color 0.4s ease, color 0.4s ease";
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
        }
    });


    // --- 4. CONTROLE DE TAMANHO DA FONTE ---
    let fontPercentage = 100;
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        fontPercentage += 8;
        document.documentElement.style.fontSize = `${fontPercentage}%`;
    });

    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (fontPercentage > 75) {
            fontPercentage -= 8;
            document.documentElement.style.fontSize = `${fontPercentage}%`;
        }
    });


    // --- 5. LEITURA EM VOZ ALTA (SPEECH SYNTHESIS API) ---
    const btnTTS = document.getElementById('btn-tts');
    const btnStopTTS = document.getElementById('btn-stop-tts');
    let speechTrack = null;

    btnTTS.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // Evita empilhamento de vozes
        const contentText = document.getElementById('conteudo').innerText;
        speechTrack = new SpeechSynthesisUtterance(contentText);
        speechTrack.lang = 'pt-BR';
        speechTrack.rate = 1.0;
        window.speechSynthesis.speak(speechTrack);
    });

    btnStopTTS.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });


    // --- 6. NOVO GAME: SIMULADOR DE TOMADA DE DECISÃO "SAFRA SUSTENTÁVEL" ---
    const cropScenarios = [
        {
            text: "Cenário 1: Sensores apontam infestação biológica de lagartas no talhão oeste. O que fazer?",
            options: [
                { text: "Liberar drones com bioinsumos e microvespas parasitoides (Controle Biológico).", prod: 15, sust: 20 },
                { text: "Aplicar pulverização química uniforme de largo espectro em toda a área.", prod: 20, sust: -30 }
            ]
        },
        {
            text: "Cenário 2: A IA emite alerta de estiagem severa pelos próximos 12 dias consecutivos.",
            options: [
                { text: "Acionar gotejamento inteligente monitorado por dados de umidade radicular.", prod: 15, sust: 15 },
                { text: "Ligar a irrigação contínua por aspersão convencional com capacidade máxima.", prod: 5, sust: -25 }
            ]
        },
        {
            text: "Cenário 3: Área degradada identificada na propriedade precisa entrar em produção.",
            options: [
                { text: "Implementar o consórcio ILPF (Integração Lavoura-Pecuária-Floresta) para sequestrar carbono.", prod: 25, sust: 25 },
                { text: "Limpar o solo rapidamente com maquinário pesado convencional para plantio imediato.", prod: 15, sust: -35 }
            ]
        }
    ];

    let currentStage = 0;
    let currentProd = 100;
    let currentSust = 100;

    const prodLabel = document.getElementById('metric-prod');
    const sustLabel = document.getElementById('metric-sust');
    const scenarioBox = document.getElementById('sim-event-text');
    const choicesWrapper = document.getElementById('sim-choices-container');
    const btnStartSim = document.getElementById('btn-start-sim');

    const refreshMetrics = () => {
        prodLabel.innerText = `${currentProd}%`;
        sustLabel.innerText = `${currentSust}%`;
    };

    const renderStage = () => {
        choicesWrapper.innerHTML = "";

        if (currentProd <= 20 || currentSust <= 20) {
            scenarioBox.innerHTML = "❌ <strong>Fim de Temporada: Falência de Gestão!</strong> Seus índices caíram abaixo da linha sustentável de 20%. Desenvolva práticas mais integradas!";
            btnStartSim.style.display = "inline-block";
            return;
        }

        if (currentStage >= cropScenarios.length) {
            scenarioBox.innerHTML = `🏆 <strong>Safra Concluída com Sucesso!</strong> Parabéns! Você consolidou uma fazenda com ${currentProd}% de Produtividade e ${currentSust}% de Sustentabilidade, em linha com as diretrizes do Programa Agrinho 2026!`;
            btnStartSim.style.display = "inline-block";
            return;
        }

        const activeScenario = cropScenarios[currentStage];
        scenarioBox.innerText = activeScenario.text;

        activeScenario.options.forEach(opt => {
            const optionButton = document.createElement('button');
            optionButton.className = "sim-choice-btn";
            optionButton.innerText = opt.text;
            optionButton.addEventListener('click', () => {
                currentProd = Math.min(100, Math.max(0, currentProd + opt.prod));
                currentSust = Math.min(100, Math.max(0, currentSust + opt.sust));
                refreshMetrics();
                currentStage++;
                renderStage();
            });
            choicesWrapper.appendChild(optionButton);
        });
    };

    btnStartSim.addEventListener('click', () => {
        currentProd = 100;
        currentSust = 100;
        currentStage = 0;
        refreshMetrics();
        btnStartSim.style.display = "none";
        renderStage();
    });


    // --- 7. SISTEMA DE COMENTÁRIOS INTERATIVO ---
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
            commentItem.innerHTML = `<p style="font-style: italic;">"${text}"</p><small style="color: #777; display:block; margin-top:5px;">Enviado por Leitor</small>`;
            
            commentsList.prepend(commentItem);
            commentInput.value = "";
        }
    });
});
