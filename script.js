// Função para alternar a exibição da seção de presentes
function toggleGifts() {
  const giftsSection = document.getElementById("giftsSection");
  giftsSection.classList.toggle("active");

  // Previne o scroll do body quando o modal está aberto
  if (giftsSection.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// Fechar modal ao clicar fora dele
document.getElementById("giftsSection").addEventListener("click", function (e) {
  if (e.target === this) {
    toggleGifts();
  }
});

// Animação de entrada quando a página carrega
window.addEventListener("load", () => {
  const card = document.querySelector(".invitation-card");
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";

  setTimeout(() => {
    card.style.transition = "all 1s ease-out";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 100);
});

// Efeito de paralaxe suave nas nuvens
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const clouds = document.querySelectorAll(".cloud");

  clouds.forEach((cloud, index) => {
    const speed = 0.5 + index * 0.1;
    cloud.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Adicionar efeito de hover nos botões
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.02)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Efeito de confete ao clicar no nome
document.querySelector(".name-title").addEventListener("click", () => {
  createConfetti();
});

function createConfetti() {
  const colors = ["#FF69B4", "#FFB6C1", "#9370DB", "#FFD700", "#87CEEB"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Adicionar keyframes para o confete via JavaScript
const style = document.createElement("style");
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll para dispositivos móveis
document.documentElement.style.scrollBehavior = "smooth";

// Otimização para performance em dispositivos móveis
if (window.innerWidth <= 768) {
  // Reduzir animações em dispositivos móveis para melhor performance
  document.querySelectorAll(".cloud").forEach((cloud) => {
    cloud.style.animationDuration = "30s";
  });
}

// --- CÓDIGO DA CONTAGEM REGRESSIVA ---

// 1. Defina a data e hora da festa
// ATENÇÃO: O mês em JavaScript começa em 0 (Janeiro=0, Fevereiro=1, etc.)
// Então, para Setembro, usamos o número 8.
const partyDate = new Date(2025, 8, 28, 16, 0, 0).getTime();

// 2. Atualiza o relógio a cada segundo
const countdownFunction = setInterval(function () {
  // Pega a data e hora de agora
  const now = new Date().getTime();

  // Calcula a distância entre agora e a data da festa
  const distance = partyDate - now;

  // 3. Cálculos de tempo para dias, horas, minutos e segundos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // 4. Mostra o resultado nos elementos HTML
  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");

  // 5. Se a contagem terminar, exibe uma mensagem
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.querySelector(".countdown-container").innerHTML =
      "<div class='party-time'>É HOJE! A FESTA COMEÇOU!</div>";
  }
}, 1000);
