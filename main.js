document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.number');
    const speed = 60; // Quanto menor, mais rápido a contagem ativa

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const current = +counter.innerText.replace(/[^0-9]/g, '');
            const increment = Math.ceil(target / speed);

            if (current < target) {
                let nextValue = current + increment;
                if (nextValue > target) nextValue = target;
                
                // Mantém a formatação original (+ ou %)
                if (target === 4) {
                    counter.innerText = `+${nextValue}`;
                } else {
                    counter.innerText = `${nextValue}%`;
                }
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target === 4 ? `+${target}` : `${target}%`;
            }
        };
        updateCount();
    };

    // Detecta quando a seção de dados aparece na tela para rodar a animação
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                startCounter(counter);
                observer.unobserve(counter); // Roda a animação apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});
