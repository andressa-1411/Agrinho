// Banco de perguntas do Quiz sobre o Agro Sustentável
const questions = [
    {
        text: "A Integração Lavoura-Pecuária-Floresta (ILPF) ajuda a sequestrar carbono da atmosfera e otimizar o uso da terra.",
        answer: true
    },
    {
        text: "O controle biológico na agricultura de precisão substitui completamente o uso de água no plantio.",
        answer: false
    },
    {
        text: "O plantio direto e o uso de bioinsumos são técnicas que ajudam a proteger o solo e evitam o desgaste da terra.",
        answer: true
    },
    {
        text: "Práticas de ESG e o Programa Agrinho 2026 focam unicamente no lucro financeiro, deixando de lado as ações sociais.",
        answer: false
    },
    {
        text: "Um agro forte e sustentável busca produzir alimentos equilibrando a alta produtividade com a conservação ambiental.",
        answer: true
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTextElement = document.getElementById("question-text");
const feedbackElement = document.getElementById("game-feedback");
const scoreElement = document.getElementById("score");

// Inicializa a primeira pergunta
function loadQuestion() {
    feedbackElement.innerText = "";
    if (currentQuestionIndex < questions.length) {
        questionTextElement.innerText = questions[currentQuestionIndex].text;
    } else {
        // Fim do jogo
        questionTextElement.innerText = "🎉 Parabéns! Você completou o Quiz do Agro Sustentável!";
        document.querySelector(".game-buttons").style.display = "none";
        feedbackElement.innerText = `Pontuação Final: ${score} de ${questions.length} acertos!`;
        feedbackElement.style.color = "#1b5e20";
    }
}

// Verifica se a resposta clicada está correta
function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        score++;
        scoreElement.innerText = score;
        feedbackElement.innerText = "Correto! 🌾 Excelente escolha sustentável.";
        feedbackElement.style.color = "#2e7d32";
    } else {
        feedbackElement.innerText = "Incorreto! ⛔ Essa prática pode prejudicar o meio ambiente.";
        feedbackElement.style.color = "#c62828";
    }

    // Aguarda 2 segundos e passa para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2200);
}

// Rodar a primeira pergunta assim que a página carregar
window.onload = loadQuestion;
