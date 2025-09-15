function home(){
    document.getElementById("home").scrollIntoView({behavior: "smooth"});
}

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


navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navItems.forEach(i => i.style.transitionDelay = '0s'); // reset delay
    });
});

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
  setTimeout(() => { modal.style.display = 'none'; }, 300); // espera animação terminar
}

closeModal.onclick = closeModalFunction;
window.onclick = (e) => { if (e.target == modal) closeModalFunction(); }



function testeModal() {
  const modal = document.getElementById('modal-success');
  modal.classList.remove('hide');
  modal.classList.add('show');
  modal.style.display = 'block';
}



function fecharModalTeste() {
  const modal = document.getElementById('modal-success');
  modal.classList.remove('show');
  modal.classList.add('hide');
  setTimeout(() => { modal.style.display = 'none'; }, 300);
}

const modalCertificado = document.getElementById('modal-certificado');
const closeModalCertificado = document.getElementById('close-modal-certificado');
const progressBar = document.getElementById('progress-bar');

function abrirModalCertificado() {
    modalCertificado.classList.remove('hide');
    modalCertificado.classList.add('show');
    modalCertificado.style.display = 'block';

   
    setTimeout(() => {
        progressBar.style.width = '60%';
    }, 100); // 
}

function fecharModalCertificado() {
    modalCertificado.classList.remove('show');
    modalCertificado.classList.add('hide');
    progressBar.style.width = '0%'; // reseta a barra
    setTimeout(() => { modalCertificado.style.display = 'none'; }, 300);
}

closeModalCertificado.onclick = fecharModalCertificado;
window.onclick = (e) => { if (e.target == modalCertificado) fecharModalCertificado(); };

function downloadCertificado() {
  const link = document.createElement('a');
  link.href = 'assets/javascript.pdf.pdf'; 
  link.download = 'Certificado.pdf';
  link.click();
}



