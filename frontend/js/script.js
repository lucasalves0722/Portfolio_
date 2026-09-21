const linksMenu = document.querySelectorAll('.menu__lista a, .menu__logo');

linksMenu.forEach(function (link) {
  link.addEventListener('click', function (evento) {
    const destino = link.getAttribute('href');

    if (destino === '#' || destino.length <= 1) {
      return;
    }

    evento.preventDefault();

    if (destino === '#menu-topo') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elementoDestino = document.querySelector(destino);

    if (elementoDestino) {
      elementoDestino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const track = document.getElementById('sobre-track');
const slider = document.querySelector('.sobre__slider');
const indicadores = document.querySelectorAll('.indicador');
const tituloSobre = document.getElementById('sobre-titulo');

const titulos = ['Sobre mim', 'Principais tecnologias'];
let slideAtual = 0;
let arrastando = false;
let posicaoInicial = 0;

function irParaSlide(indice) {
  slideAtual = indice;
  track.style.transform = `translateX(-${slideAtual * 50}%)`;
  tituloSobre.textContent = titulos[slideAtual];

  indicadores.forEach(function (indicador, i) {
    indicador.classList.toggle('indicador--ativo', i === slideAtual);
  });
}

indicadores.forEach(function (indicador) {
  indicador.addEventListener('click', function () {
    const indice = Number(indicador.getAttribute('data-slide'));
    irParaSlide(indice);
  });
});

slider.addEventListener('pointerdown', function (evento) {
  arrastando = true;
  posicaoInicial = evento.clientX;
  track.style.transition = 'none';
});

slider.addEventListener('pointermove', function (evento) {
  if (!arrastando) return;

  const deslocamento = evento.clientX - posicaoInicial;
  const deslocamentoEmPorcentagem = (deslocamento / slider.offsetWidth) * 50;
  const novaPosicao = -(slideAtual * 50) + deslocamentoEmPorcentagem;

  track.style.transform = `translateX(${novaPosicao}%)`;
});

slider.addEventListener('pointerup', function (evento) {
  if (!arrastando) return;
  arrastando = false;
  track.style.transition = 'transform 0.4s ease';

  const deslocamento = evento.clientX - posicaoInicial;

  if (deslocamento < -50 && slideAtual < 1) {
    irParaSlide(slideAtual + 1);
  } else if (deslocamento > 50 && slideAtual > 0) {
    irParaSlide(slideAtual - 1);
  } else {
    irParaSlide(slideAtual);
  }
});

slider.addEventListener('pointerleave', function () {
  if (arrastando) {
    arrastando = false;
    track.style.transition = 'transform 0.4s ease';
    irParaSlide(slideAtual);
  }
});