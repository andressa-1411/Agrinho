document.addEventListener('DOMContentLoaded', () => {
    
    // --- ACESSIBILIDADE ---
    let fontSize = 100;
    const increaseFont = () => {
        fontSize += 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
    };
    const decreaseFont = () => {
        fontSize -= 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    };

    // Leitura de Voz (TTS)
    let speech = new SpeechSynthesisUtterance();
    const startTTS = () => {
        const textToRead = document.getElementById('main-content').innerText;
        speech.text = textToRead;
        speech.lang = 'pt-BR';
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    };

    const stopTTS = () => {
        window.speechSynthesis.cancel();
    };

    // --- ACCORDION ---
    const accHeaders = document.querySelectorAll('.accordion-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
            } else {
                document.querySelectorAll('.accordion-body').forEach(b => b.style.maxHeight = null);
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // --- MINI GAME: AgroFerti ---
    const canvas = document.getElementById('game-canvas');
    const startBtn = document.getElementById('start-game');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let gameInterval;

    const createTarget = () => {
        const target = document.createElement('div');
        target.classList.add('microorganism');
        
        const x = Math.random() * (canvas.clientWidth - 40);
        const y = Math.random() * (canvas.clientHeight - 40);
        
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;

        target.addEventListener('click', () => {
            score++;
            scoreDisplay.innerText = `Pontos: ${score}`;
            target.remove();
        });

        canvas.appendChild(target);

        // Remove se não clicar em 2 segundos
        setTimeout(() => { if(target) target.remove(); }, 2000);
    };

    startBtn.addEventListener('click', () => {
        score = 0;
        scoreDisplay.innerText = `Pontos: 0`;
        startBtn.innerText = "Reiniciar";
        if(gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(createTarget, 800);
        setTimeout(() => {
            clearInterval(gameInterval);
            alert(`Fim de jogo! Você fertilizou o solo com ${score} microrganismos.`);
        }, 15000);
    });

    // --- COMENTÁRIOS ---
    const sendComment = document.getElementById('send-comment');
    const display = document.getElementById('display-comments');
    const textArea = document.getElementById('user-comment');

    sendComment.addEventListener('click', () => {
        if(textArea.value.trim() !== "") {
            const div = document.createElement('div');
            div.className = 'stat-card';
            div.style.marginTop = '10px';
            div.style.textAlign = 'left';
            div.innerHTML = `<p>"${textArea.value}"</p><small>Enviado agora</small>`;
            display.prepend(div);
            textArea.value = "";
        }
    });

    // Event Listeners Acessibilidade
    document.getElementById('btn-increase-font').addEventListener('click', increaseFont);
    document.getElementById('btn-decrease-font').addEventListener('click', decreaseFont);
    document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);
    document.getElementById('btn-tts').addEventListener('click', startTTS);
    document.getElementById('btn-stop-tts').addEventListener('click', stopTTS);
});
