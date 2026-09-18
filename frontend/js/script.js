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