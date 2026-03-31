// ===== NAVEGAÇÃO =====
function home() { document.getElementById("home").scrollIntoView({ behavior: "smooth" }); }
function sobre() { document.getElementById("sobre").scrollIntoView({ behavior: "smooth" }); }
function experiencia() { document.getElementById("experiencia").scrollIntoView({ behavior: "smooth" }); }
function projetos() { document.getElementById("projetos").scrollIntoView({ behavior: "smooth" }); }
function contato() { document.getElementById("contato").scrollIntoView({ behavior: "smooth" }); }

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    navItems.forEach((item, index) => {
        item.style.transitionDelay = navLinks.classList.contains('active') ? `${index * 0.1}s` : '0s';
    });
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navItems.forEach(i => i.style.transitionDelay = '0s');
    });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PARTÍCULAS DO HERO =====
function criarParticulas() {
    const container = document.getElementById('particles');
    if (!container) return;

    const cores = ['#ffcc70', '#cbb4ff', '#fff', '#d4be91'];
    const quantidade = 22;

    for (let i = 0; i < quantidade; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const tamanho = Math.random() * 5 + 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = (Math.random() * 5 + 4).toFixed(1) + 's';
        const delay = (Math.random() * 6).toFixed(1) + 's';
        const cor = cores[Math.floor(Math.random() * cores.length)];

        p.style.cssText = `
            width: ${tamanho}px;
            height: ${tamanho}px;
            left: ${x}%;
            top: ${y}%;
            background: ${cor};
            --dur: ${dur};
            --delay: ${delay};
        `;

        container.appendChild(p);
    }
}

criarParticulas();

// ===== FORMULÁRIO DE CONTATO =====
const form = document.getElementById('contact-form');
const modal = document.getElementById('modal-success');
const closeModal = document.getElementById('close-modal');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch('https://formspree.io/f/myzpqjek', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            modal.classList.remove('hide');
            modal.classList.add('show');
            modal.style.display = 'block';
            form.reset();
        } else {
            alert('❌ Ocorreu um erro ao enviar. Tente novamente mais tarde.');
        }
    } catch (error) {
        alert('❌ Ocorreu um erro ao enviar. Tente novamente mais tarde.');
        console.error(error);
    }
});

const closeModalFunction = () => {
    modal.classList.remove('show');
    modal.classList.add('hide');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
};

closeModal.onclick = closeModalFunction;

window.onclick = (e) => {
    if (e.target == modal) closeModalFunction();
    if (e.target == modalCertificado) fecharModalCertificado();
};

// ===== MODAL CERTIFICADO =====
const modalCertificado = document.getElementById('modal-certificado');
const closeModalCertificado = document.getElementById('close-modal-certificado');
const progressBar = document.getElementById('progress-bar');

function abrirModalCertificado() {
    modalCertificado.classList.remove('hide');
    modalCertificado.classList.add('show');
    modalCertificado.style.display = 'block';
    setTimeout(() => { progressBar.style.width = '60%'; }, 100);
}

function fecharModalCertificado() {
    modalCertificado.classList.remove('show');
    modalCertificado.classList.add('hide');
    progressBar.style.width = '0%';
    setTimeout(() => { modalCertificado.style.display = 'none'; }, 300);
}

closeModalCertificado.onclick = fecharModalCertificado;
