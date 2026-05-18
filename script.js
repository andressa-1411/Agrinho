// Dados das perguntas do Mini-game
const gameData = [
    {
        question: "Sua fazenda está enfrentando uma praga de insetos. Qual tecnologia sustentável você utiliza?",
        options: [
            { text: "Aplicar defensivos químicos pesados em toda a área.", input: false },
            { text: "Implementar o Controle Biológico usando inimigos naturais da praga.", input: true }
        ]
    },
    {
        question: "Você quer expandir a produção sem desmatar nenhuma nova área de floresta. Qual a melhor estratégia?",
        options: [
            { text: "Adotar o sistema ILPF (Integração Lavoura-Pecuária-Floresta) para otimizar o solo.", input: true },
            { text: "Deixar o solo descansar por anos sem produzir nada.", input: false }
        ]
    },
    {
        question: "Para proteger o solo contra erosão e manter a umidade da terra, qual manejo você escolhe?",
        options: [
            { text: "Arar a terra profundamente antes de cada plantio.", input: false },
            { text: "Utilizar a técnica de Plantio Direto sobre a palhada anterior.", input: true }
        ]
    },
    {
        question: "Alinhado às metas ESG e ao Programa Agrinho 2026, qual ação social traz mais valor à sua comunidade?",
        options: [
            { text: "Oferecer treinamentos de segurança e práticas agrícolas sustentáveis para os colaboradores.", input: true },
            { text: "Focar apenas no lucro da safra atual e ignorar o entorno.", input: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Seletores do DOM
const gameText = document.getElementById("game-text");
const optionsContainer = document.getElementById("options-container");
const scoreVal = document.getElementById("score-val");

function loadQuestion() {
    // Verifica se o jogo acabou
    if (currentQuestionIndex >= gameData.length) {
        showFinalResult();
        return;
    }

    // Limpa opções anteriores
    optionsContainer.innerHTML = "";
    
    // Pega pergunta atual
    const currentQuestion = gameData[currentQuestionIndex];
    gameText.innerText = currentQuestion.question;

    // Gera botões de resposta
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("game-btn");
        button.addEventListener("click", () => handleAnswer(option.input));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        score += 25; // Cada resposta correta adiciona 25 XP (Total 100 XP)
        alert("Excelente escolha! Isso fortalece o futuro sustentável do Agro. (+25 XP)");
    } else {
        alert("Essa escolha pode prejudicar o meio ambiente ou a produtividade a longo prazo. Tente o manejo correto na próxima!");
    }
    
    scoreVal.innerText = score;
    currentQuestionIndex++;
    loadQuestion();
}

function showFinalResult() {
    optionsContainer.innerHTML = "";
    
    if (score === 100) {
        gameText.innerText = `Parabéns! Você alcançou 100 XP. Sua fazenda é um modelo perfeito de Agro Forte e Sustentável alinhado ao Agrinho 2026! 🏆🌱`;
    } else if (score >= 50) {
        gameText.innerText = `Bom trabalho! Você fez ${score} XP. Sua fazenda está no caminho certo, mas ainda pode aplicar mais tecnologias de conservação! 🚜`;
    } else {
        gameText.innerText = `Você fez ${score} XP. Que tal revisar os conceitos de ILPF e controle biológico e tentar novamente? 🌍`;
    }

    // Botão de reiniciar
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Jogar Novamente";
    restartBtn.classList.add("game-btn");
    restartBtn.style.marginTop = "20px";
    restartBtn.addEventListener("click", restartGame);
    optionsContainer.appendChild(restartBtn);
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreVal.innerText = score;
    loadQuestion();
}

// Inicializa o jogo ao carregar a página
window.onload = () => {
    loadQuestion();
};
