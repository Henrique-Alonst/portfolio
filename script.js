function sobre() {
    document.getElementById("sobre").scrollIntoView({ behavior: "smooth" });
}

function projetos() {
    document.getElementById("projetos").scrollIntoView({ behavior: "smooth" });
}

function contato() {
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
}

// Alternar tema
function mudarTema() {
  document.body.classList.toggle('dark');
}

const animates = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2 // anima quando 20% do elemento está visível
});

// Adiciona cada elemento para ser observado
animates.forEach(element => {
  observer.observe(element);
});







