// Efeito de mudança no header ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 10%';
        header.style.backgroundColor = '#fefae0';
    } else {
        header.style.padding = '20px 10%';
        header.style.backgroundColor = 'white';
    }
});

// Mensagem de boas-vindas no console (opcional)
console.log("Agro Forte carregado com sucesso! 🌱");
