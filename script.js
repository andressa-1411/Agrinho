// ACORDION
document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// ACESSIBILIDADE
const body = document.body;
const aumentar = document.getElementById('aumentarFonte');
const diminuir = document.getElementById('diminuirFonte');
const escuro = document.getElementById('modoEscuro');
const ler = document.getElementById('lerTexto');
const parar = document.getElementById('pararLeitura');

aumentar.addEventListener('click', () => {
    body.style.fontSize = 'clamp(1.2rem, 2vw, 1.6rem)';
});
diminuir.addEventListener('click', () => {
    body.style.fontSize = 'clamp(0.8rem, 1.5vw, 1rem)';
});
escuro.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// LEITURA DE VOZ
ler.addEventListener('click', () => {
    const texto = document.querySelector('.hero').innerText + ' ' +
                  Array.from(document.querySelectorAll('.card')).map(c => c.innerText).join(' ');
    const utterance = new SpeechSynthesisUtterance(texto);
    window.speechSynthesis.speak(utterance);
});
parar.addEventListener('click', () => {
    window.speechSynthesis.cancel();
});

// MINI GAME SIMPLES
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let gotas = [];
for(let i=0;i<5;i++){
    gotas.push({x: Math.random()*canvas.width, y: 0, dy: Math.random()*2+1});
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='blue';
    gotas.forEach(g=>{
        ctx.beginPath();
        ctx.arc(g.x,g.y,10,0,Math.PI*2);
        ctx.fill();
        g.y += g.dy;
        if(g.y>canvas.height) g.y=0;
    });
    requestAnimationFrame(draw);
}
draw();
