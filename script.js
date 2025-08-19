function sobre() {
    document.getElementById("sobre").scrollIntoView({ behavior: "smooth" });
}

function projetos() {
    document.getElementById("projetos").scrollIntoView({ behavior: "smooth" });
}

function contato() {
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    navItems.forEach((item, index) => {
        if(navLinks.classList.contains('active')){
            item.style.transitionDelay = `${index * 0.1}s`;
        } else {
            item.style.transitionDelay = `0s`;
        }
    });
});

// Fechar menu ao clicar em qualquer link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navItems.forEach(i => i.style.transitionDelay = '0s'); // reset delay
    });
});








