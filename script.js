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
    const aberto = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    navItems.forEach((item, index) => {
        item.style.transitionDelay = navLinks.classList.contains('active') ? `${index * 0.1}s` : '0s';
    });
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
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

// ===== FILTRO DE PROJETOS =====
const filtroBotoes = document.querySelectorAll('.filtro-btn');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const projetosVazio = document.getElementById('projetos-vazio');

// Atualiza os contadores de cada categoria
function atualizarContadores() {
    const contagem = { todos: projectCards.length };
    projectCards.forEach(card => {
        const status = card.dataset.status || 'Outros';
        contagem[status] = (contagem[status] || 0) + 1;
    });

    document.querySelectorAll('.filtro-count').forEach(span => {
        const id = span.id.replace('count-', '');
        span.textContent = contagem[id] || 0;
    });
}

function aplicarFiltro(filtro) {
    let visiveis = 0;

    projectCards.forEach(card => {
        const combina = filtro === 'todos' || card.dataset.status === filtro;

        if (combina) {
            visiveis++;
            card.classList.remove('oculto', 'filtrando-saida');
            // reinicia a animação de entrada
            card.classList.remove('filtrando-entrada');
            void card.offsetWidth; // força reflow para reiniciar a animação
            card.classList.add('filtrando-entrada');
        } else {
            card.classList.add('filtrando-saida');
            card.classList.remove('filtrando-entrada');
            setTimeout(() => card.classList.add('oculto'), 300);
        }
    });

    if (projetosVazio) {
        projetosVazio.classList.toggle('hide', visiveis > 0);
    }
}

filtroBotoes.forEach(btn => {
    btn.addEventListener('click', () => {
        filtroBotoes.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        aplicarFiltro(btn.dataset.filtro);
    });
});

atualizarContadores();

// ===== FORMULÁRIO DE CONTATO =====
const form = document.getElementById('contact-form');
const modal = document.getElementById('modal-success');
const closeModal = document.getElementById('close-modal');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: se o campo escondido veio preenchido, é bot — ignora silenciosamente
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
        form.reset();
        return;
    }

    const formData = new FormData(form);
    try {
        const response = await fetch('https://formspree.io/f/myzpqjek', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            abrirModal(modal, closeModal);
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
    fecharModal(modal);
};

closeModal.onclick = closeModalFunction;
closeModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModalFunction();
    }
});

// ===== MODAL CERTIFICADO =====
const modalCertificado = document.getElementById('modal-certificado');
const closeModalCertificado = document.getElementById('close-modal-certificado');
const progressBar = document.getElementById('progress-bar');
const btnCertificado = document.querySelector('.btn-certificado[onclick="abrirModalCertificado()"]');

function abrirModalCertificado() {
    abrirModal(modalCertificado, closeModalCertificado);
    setTimeout(() => { progressBar.style.width = '60%'; }, 100);
}

function fecharModalCertificado() {
    fecharModal(modalCertificado);
    progressBar.style.width = '0%';
}

closeModalCertificado.onclick = fecharModalCertificado;
closeModalCertificado.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fecharModalCertificado();
    }
});

// ===== FOCO: ABRIR/FECHAR MODAL COM GESTÃO DE FOCO E TRAP =====
let ultimoElementoFocado = null;

function getElementosFocaveis(container) {
    return Array.from(container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);
}

function trapFoco(e, container) {
    if (e.key !== 'Tab') return;
    const focaveis = getElementosFocaveis(container);
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
    }
}

function abrirModal(modalEl, elementoParaFocar) {
    ultimoElementoFocado = document.activeElement;
    modalEl.classList.remove('hide');
    modalEl.classList.add('show');
    modalEl.style.display = 'block';

    const focaveis = getElementosFocaveis(modalEl);
    (elementoParaFocar || focaveis[0])?.focus();

    modalEl._trapHandler = (e) => trapFoco(e, modalEl);
    modalEl.addEventListener('keydown', modalEl._trapHandler);
}

function fecharModal(modalEl) {
    modalEl.classList.remove('show');
    modalEl.classList.add('hide');
    setTimeout(() => { modalEl.style.display = 'none'; }, 300);

    if (modalEl._trapHandler) {
        modalEl.removeEventListener('keydown', modalEl._trapHandler);
        modalEl._trapHandler = null;
    }

    if (ultimoElementoFocado) {
        ultimoElementoFocado.focus();
        ultimoElementoFocado = null;
    }
}

// ===== MODAL DETALHES DO PROJETO =====
const modalProjeto = document.getElementById('modal-projeto');
const btnVoltarProjeto = document.getElementById('btn-voltar-projeto');
const galeriaFechar = document.getElementById('galeria-fechar');
const projetoBadge = document.getElementById('projeto-badge');
const projetoTitulo = document.getElementById('projeto-titulo');
const projetoPeriodo = document.getElementById('projeto-periodo');
const projetoPeriodoTexto = projetoPeriodo.querySelector('span');
const projetoPapel = document.getElementById('projeto-papel');
const projetoDescricao = document.getElementById('projeto-descricao');
const projetoFuncionalidades = document.getElementById('projeto-funcionalidades');
const projetoTecnologias = document.getElementById('projeto-tecnologias');
const projetoLinks = document.getElementById('projeto-links');

// Galeria
const galeriaTrack = document.getElementById('projeto-galeria-track');
const galeriaDots = document.getElementById('galeria-dots');
const galeriaPrev = document.getElementById('galeria-prev');
const galeriaNext = document.getElementById('galeria-next');

let galeriaImagens = [];
let galeriaIndex = 0;

function montarGaleria(imagens, titulo) {
    galeriaImagens = imagens;
    galeriaIndex = 0;

    galeriaTrack.innerHTML = '';
    imagens.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${titulo} - foto ${i + 1}`;
        galeriaTrack.appendChild(img);
    });

    galeriaDots.innerHTML = '';
    imagens.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('ativo');
        dot.addEventListener('click', () => irParaFoto(i));
        galeriaDots.appendChild(dot);
    });

    const multiplasFotos = imagens.length > 1;
    galeriaPrev.classList.toggle('hide', !multiplasFotos);
    galeriaNext.classList.toggle('hide', !multiplasFotos);
    galeriaDots.classList.toggle('hide', !multiplasFotos);

    atualizarGaleria();
}

function atualizarGaleria() {
    galeriaTrack.style.transform = `translateX(-${galeriaIndex * 100}%)`;
    [...galeriaDots.children].forEach((dot, i) => {
        dot.classList.toggle('ativo', i === galeriaIndex);
    });
}

function irParaFoto(i) {
    galeriaIndex = i;
    atualizarGaleria();
}

function fotoAnterior() {
    galeriaIndex = (galeriaIndex - 1 + galeriaImagens.length) % galeriaImagens.length;
    atualizarGaleria();
}

function fotoProxima() {
    galeriaIndex = (galeriaIndex + 1) % galeriaImagens.length;
    atualizarGaleria();
}

galeriaPrev.onclick = fotoAnterior;
galeriaNext.onclick = fotoProxima;

// Suporte a swipe (arrastar) no celular
let touchStartX = 0;
galeriaTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

galeriaTrack.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40 && galeriaImagens.length > 1) {
        if (diff > 0) fotoAnterior();
        else fotoProxima();
    }
});

function abrirModalProjeto(botao) {
    // Sobe até o card do projeto que contém o botão clicado
    const card = botao.closest('.project-card');
    if (!card) return;

    const titulo = card.dataset.title || '';
    const imagens = (card.dataset.imagens || '')
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);
    const detalhes = card.dataset.detalhes || '';
    const tecnologias = (card.dataset.tecnologias || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
    const github = card.dataset.github || '';
    const site = card.dataset.site || '';
    const status = card.dataset.status || '';
    const periodo = card.dataset.periodo || '';
    const papel = card.dataset.papel || '';
    const funcionalidades = (card.dataset.funcionalidades || '')
        .split('|')
        .map(f => f.trim())
        .filter(Boolean);

    montarGaleria(imagens, titulo);

    projetoBadge.textContent = status;
    projetoBadge.style.display = status ? 'inline-block' : 'none';

    projetoTitulo.textContent = titulo;

    projetoPeriodoTexto.textContent = periodo;
    projetoPeriodo.style.display = periodo ? 'flex' : 'none';

    projetoPapel.textContent = papel;
    projetoPapel.style.display = papel ? 'block' : 'none';

    projetoDescricao.textContent = detalhes;

    projetoFuncionalidades.innerHTML = '';
    funcionalidades.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        projetoFuncionalidades.appendChild(li);
    });
    projetoFuncionalidades.style.display = funcionalidades.length ? 'flex' : 'none';

    projetoTecnologias.innerHTML = '';
    tecnologias.forEach(tec => {
        const span = document.createElement('span');
        span.textContent = tec;
        projetoTecnologias.appendChild(span);
    });

    projetoLinks.innerHTML = '';
    if (github) {
        const a = document.createElement('a');
        a.href = github;
        a.target = '_blank';
        a.textContent = 'GitHub';
        projetoLinks.appendChild(a);
    }
    if (site) {
        const a = document.createElement('a');
        a.href = site;
        a.target = '_blank';
        a.textContent = 'Site';
        projetoLinks.appendChild(a);
    }

    document.body.classList.add('modal-open');
    abrirModal(modalProjeto, galeriaFechar);
}

function fecharModalProjeto() {
    document.body.classList.remove('modal-open');
    fecharModal(modalProjeto);
}

btnVoltarProjeto.onclick = fecharModalProjeto;
if (galeriaFechar) galeriaFechar.onclick = fecharModalProjeto;

// ===== FECHAR MODAIS CLICANDO FORA =====
window.onclick = (e) => {
    if (e.target == modal) closeModalFunction();
    if (e.target == modalCertificado) fecharModalCertificado();
    if (e.target == modalProjeto) fecharModalProjeto();
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modalProjeto.style.display === 'block') fecharModalProjeto();
        else if (modalCertificado.style.display === 'block') fecharModalCertificado();
        else if (modal.style.display === 'block') closeModalFunction();
    }
    if (modalProjeto.style.display === 'block') {
        if (e.key === 'ArrowLeft') fotoAnterior();
        if (e.key === 'ArrowRight') fotoProxima();
    }
});

// ===== MODO LANTERNA =====
const torchToggle = document.getElementById('torch-toggle');
const torchControls = document.getElementById('torch-controls');
const torchDarkness = document.getElementById('torch-darkness');
const torchCursor = document.getElementById('torch-cursor');
const torchRange = document.getElementById('torch-range');

let torchActive = false;

function moverTocha(x, y) {
    torchDarkness.style.setProperty('--torch-x', x + 'px');
    torchDarkness.style.setProperty('--torch-y', y + 'px');
    torchCursor.style.left = x + 'px';
    torchCursor.style.top = y + 'px';
}

function ativarTocha() {
    torchActive = true;
    document.body.classList.add('torch-mode');
    torchToggle.classList.add('active');
    torchControls.classList.remove('hide');
    torchDarkness.style.setProperty('--torch-radius', torchRange.value + 'px');
    moverTocha(window.innerWidth / 2, window.innerHeight / 2);
}

function desativarTocha() {
    torchActive = false;
    document.body.classList.remove('torch-mode');
    torchToggle.classList.remove('active');
    torchControls.classList.add('hide');
}

torchToggle.addEventListener('click', () => {
    if (torchActive) {
        desativarTocha();
    } else {
        ativarTocha();
    }
});

document.addEventListener('mousemove', (e) => {
    if (torchActive) moverTocha(e.clientX, e.clientY);
});

torchRange.addEventListener('input', () => {
    torchDarkness.style.setProperty('--torch-radius', torchRange.value + 'px');
});

document.addEventListener('mousemove', (e) => {
    if (torchActive) moverTocha(e.clientX, e.clientY);
});

// Suporte a toque: move a lanterna conforme o dedo desliza
document.addEventListener('touchmove', (e) => {
    if (torchActive && e.touches[0]) {
        moverTocha(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });