document.addEventListener('DOMContentLoaded', () => {

    // 1. Accordion Interativo
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
            } else {
                // Fecha outros itens abertos
                document.querySelectorAll('.accordion-content').forEach(item => item.style.maxHeight = '0px');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 2. Acessibilidade: Controle de Tamanho de Fonte
    let baseFontSize = 100; // porcentagem inicial
    const btnAumentar = document.getElementById('btn-aumentar-fonte');
    const btnDiminuir = document.getElementById('btn-diminuir-fonte');

    btnAumentar.addEventListener('click', () => {
        baseFontSize += 10;
        document.documentElement.style.fontSize = `${baseFontSize}%`;
    });

    btnDiminuir.addEventListener('click', () => {
        if (baseFontSize > 70) {
            baseFontSize -= 10;
            document.documentElement.style.fontSize = `${baseFontSize}%`;
        }
    });

    // 3. Alternar Tema (Claro / Escuro)
    const btnTema = document.getElementById('btn-alternar-tema');
    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // 4. Acessibilidade: Leitura de Voz (SpeechSynthesis)
    const btnFalar = document.getElementById('btn-falar');
    const btnParar = document.getElementById('btn-parar-fala');
    let speechUtterance = null;

    btnFalar.addEventListener('click', () => {
        // Cancela leituras anteriores ativas
        window.speechSynthesis.cancel();

        // Pega apenas os elementos textuais de relevância do bloco principal
        const principalNode = document.getElementById('conteudo-principal');
        const textoParaLer = principalNode.innerText;

        speechUtterance = new SpeechSynthesisUtterance(textoParaLer);
        speechUtterance.lang = 'pt-BR';
        
        window.speechSynthesis.speak(speechUtterance);
    });

    btnParar.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });

    // 5. Mini Game Interativo
    const gameOptions = document.querySelectorAll('.game-option');
    const gameFeedback = document.getElementById('game-feedback');

    gameOptions.forEach(option => {
        option.addEventListener('click', () => {
            const isCorrect = option.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                gameFeedback.style.color = '#10b981';
                gameFeedback.innerText = 'Excelente! Prática Sustentável Aprovada!';
                option.style.background = '#10b981';
            } else {
                gameFeedback.style.color = '#ef4444';
                gameFeedback.innerText = 'Alerta! Essa ação prejudica o meio ambiente.';
                option.style.background = '#ef4444';
            }
        });
    });

    // 6. Área de Comentários Dinâmica
    const formComentario = document.getElementById('form-comentario');
    const textoComentario = document.getElementById('texto-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');

    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const comentarioTexto = textoComentario.value.trim();
        if (comentarioTexto) {
            const novoItem = document.createElement('div');
            novoItem.classList.add('comentario-item');
            novoItem.innerHTML = `<p>${comentarioTexto}</p><small style="color:var(--azul-celeste)">Enviado agora mesmo</small>`;
            
            listaComentarios.prepend(novoItem);
            textoComentario.value = '';
        }
    });

    // 7. Evento de Envio do Formulário do Seminário
    const formSeminario = document.getElementById('cadastro-seminario');
    formSeminario.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inscrição realizada com sucesso! Verifique seu e-mail para receber as credenciais de acesso ao seminário.');
        formSeminario.reset();
    });
});
