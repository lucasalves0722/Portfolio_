// ===== MENU HAMBÚRGUER =====

const botaoMenu = document.getElementById('menu-hamburguer');
const listaMenu = document.querySelector('.menu__lista');

botaoMenu.addEventListener('click', function () {
    listaMenu.classList.toggle('ativo');
    botaoMenu.classList.toggle('ativo');
});


// ===== NAVEGAÇÃO DO MENU =====

const linksMenu = document.querySelectorAll('.menu__lista a, .menu__logo');

// ===== BOTÃO VOLTAR AO TOPO =====

const botaoVoltarTopo = document.getElementById('voltar-topo');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        botaoVoltarTopo.classList.add('ativo');
    } else {
        botaoVoltarTopo.classList.remove('ativo');
    }
});

botaoVoltarTopo.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

linksMenu.forEach(function (link) {
    link.addEventListener('click', function (evento) {
        const destino = link.getAttribute('href');

        if (destino === '#' || destino.length <= 1) {
            return;
        }

        evento.preventDefault();

        // Fecha o menu mobile
        listaMenu.classList.remove('ativo');
        botaoMenu.classList.remove('ativo');
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

let slideAtual = 0;
let arrastando = false;
let posicaoInicial = 0;

function irParaSlide(indice) {
  slideAtual = indice;
  track.style.transform = `translateX(-${slideAtual * 50}%)`;
  tituloSobre.textContent = tituloDoSlide(slideAtual);

  indicadores.forEach(function (indicador, i) {
    indicador.classList.toggle('indicador--ativo', i === slideAtual);
  });
}

function tituloDoSlide(indice) {
  const chave = indice === 0 ? 'sobre-slide1-titulo' : 'sobre-slide2-titulo';
  return traducoes[idiomaAtual][chave];
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
  slider.setPointerCapture(evento.pointerId);
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

slider.addEventListener('pointercancel', function () {
  if (arrastando) {
    arrastando = false;
    track.style.transition = 'transform 0.4s ease';
    irParaSlide(slideAtual);
  }
});

const NUMERO_WHATSAPP = '5581997957754';

const formulario = document.getElementById('formulario-contato');
const campoNome = document.getElementById('campo-nome');
const campoMensagem = document.getElementById('campo-mensagem');
const inputNome = document.getElementById('nome');
const inputMensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nome = inputNome.value.trim();
  const mensagem = inputMensagem.value.trim();

  let formularioValido = true;

  if (nome === '') {
    campoNome.classList.add('campo--invalido');
    formularioValido = false;
  } else {
    campoNome.classList.remove('campo--invalido');
  }

  if (mensagem === '') {
    campoMensagem.classList.add('campo--invalido');
    formularioValido = false;
  } else {
    campoMensagem.classList.remove('campo--invalido');
  }

  if (!formularioValido) {
    return;
  }

  const textoCompleto = `Olá, Lucas!\n\nMeu nome/empresa é ${nome}.\n\nMensagem:\n${mensagem}`;
  const textoCodificado = encodeURIComponent(textoCompleto);
  const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${textoCodificado}`;

  window.open(linkWhatsApp, '_blank');

  formulario.reset();
});

const secaoSobre = document.getElementById('sobre');
let dicaDeArrasteMostrada = false;

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting && !dicaDeArrasteMostrada) {
      dicaDeArrasteMostrada = true;
      mostrarDicaDeArraste();
      observador.disconnect();
    }
  });
}, {
  threshold: 0.6
});

observador.observe(secaoSobre);

function mostrarDicaDeArraste() {
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = 'translateX(-8%)';

  setTimeout(function () {
    track.style.transform = 'translateX(0%)';
  }, 500);
}

const secoesReveal = document.querySelectorAll('.reveal-esquerda');

const observadorReveal = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('reveal-visivel');
      observadorReveal.unobserve(entrada.target);
    }
  });
}, {
  threshold: 0.15
});

secoesReveal.forEach(function (secao) {
  observadorReveal.observe(secao);
});

const traducoes = {
  pt: {
    'menu-sobre': 'Sobre',
    'menu-projetos': 'Projetos',
    'menu-contato': 'Contato',
    'hero-cargo': 'Dev',
    'hero-frase': 'Desenvolvedor em formação, construindo projetos e aprendendo na prática todos os dias.',
    'hero-btn-projetos': 'Ver projetos',
    'hero-btn-contato': 'Entre em contato',
    'hero-titulo': 'Desenvolvedor de <span class="hero__destaque">Software</span>',
    'sobre-p1': 'Minha trajetória profissional teve início na área administrativa, onde atuei em escritório e desenvolvi experiência com organização, atendimento, processos e rotinas operacionais. Há cerca de 3 anos, iniciei minha transição para a área de tecnologia, dando os primeiros passos profissionais no setor de suporte.',
    'sobre-p2': 'Minha primeira experiência em tecnologia foi em uma empresa que não tinha a tecnologia como atividade principal, onde atuei com suporte e tive meu primeiro contato com atendimento e resolução de problemas relacionados a sistemas.',
    'sobre-p3': 'Atualmente, há 1 ano, atuo como Analista de Suporte de Sistemas em uma empresa de tecnologia, prestando suporte a um software de gerenciamento de pátio. Essa foi minha primeira experiência profissional em um ambiente no qual tenho contato constante com tecnologia, sistemas e diferentes processos relacionados ao desenvolvimento e funcionamento de uma solução de software.',
    'sobre-p4': 'Ao longo dessa trajetória, desenvolvi uma visão prática sobre análise e resolução de problemas, atendimento técnico, processos e funcionamento de sistemas. Sou formado em Análise e Desenvolvimento de Sistemas e, paralelamente à minha experiência profissional, venho aprofundando meus conhecimentos em programação e desenvolvimento de software.', 
    'sobre-p5': 'Atualmente, direciono minha carreira para a área de Desenvolvimento Full Stack, buscando unir minha experiência em suporte e análise de sistemas com meus conhecimentos em desenvolvimento para construir soluções eficientes e evoluir profissionalmente como desenvolvedor. ',
    'sobre-slide1-titulo': 'Sobre mim',
    'sobre-slide2-titulo': 'Principais tecnologias',
    'projetos-titulo': 'Projetos',
    'projeto1-desc': 'Agregador de links para usar como cartão de visitas online — reúne seus principais links em uma única página.',
    'projeto2-desc': 'Plataforma de receitas de café, com foco em layout limpo e organização visual do conteúdo.',
    'projeto3-desc': 'Clone responsivo da interface do Tinder, desenvolvido para praticar HTML e CSS aplicados a um layout real e conhecido.',
    'link-acessar': 'Acessar',
    'github-texto': 'Todo o código dos meus projetos está disponível publicamente no GitHub — incluindo este portfólio. Sinta-se à vontade para explorar os repositórios, ver o histórico de commits e conferir como cada projeto foi construído.',
    'github-btn': 'Ver meus repositórios',
    'contato-titulo': 'Entre em contato',
    'contato-label-nome': 'Nome ou empresa',
    'contato-placeholder-nome': 'Como posso te chamar?',
    'contato-erro-nome': 'Por favor, preencha seu nome ou empresa.',
    'contato-label-mensagem': 'Mensagem',
    'contato-placeholder-mensagem': 'Conte um pouco sobre o motivo do contato...',
    'contato-erro-mensagem': 'Por favor, escreva uma mensagem.',
    'contato-btn': 'Enviar pelo WhatsApp'
  },
  en: {
    'menu-sobre': 'About',
    'menu-projetos': 'Projects',
    'menu-contato': 'Contact',
    'hero-cargo': 'Dev',
    'hero-frase': 'Developer in training, building projects and learning hands-on every day.',
    'hero-btn-projetos': 'View projects',
    'hero-btn-contato': 'Get in touch',
    'hero-titulo': '<span class="hero__destaque">Software</span> Developer',
    'sobre-p1': 'I have worked for 1 year as a Systems Support Analyst, supporting yard management software. This was my first professional experience in technology, starting as an intern and being hired after just two months.',
    'sobre-p2': 'Throughout this experience, I developed a practical understanding of systems, problem analysis, technical support, and process management, while staying constantly in touch with different aspects of technology.',
    'sobre-p3': 'I currently balance my professional routine with programming studies and software development, steering my career toward Full Stack Development.',
    'sobre-p4': 'Throughout this journey, I have developed a practical understanding of problem analysis and resolution, technical support, processes, and how systems work. I have a degree in Systems Analysis and Development and, alongside my professional experience, I have been deepening my knowledge of programming and software development.',
    'sobre-p5': 'I am currently pursuing a career in Full Stack Development, seeking to combine my experience in support and systems analysis with my development knowledge to build efficient solutions and grow professionally as a developer.',
    'sobre-slide1-titulo': 'About me',
    'sobre-slide2-titulo': 'Main technologies',
    'projetos-titulo': 'Projects',
    'projeto1-desc': 'A link aggregator to use as an online business card — brings your main links together on a single page.',
    'projeto2-desc': 'A coffee recipe platform, focused on clean layout and visual organization of content.',
    'projeto3-desc': 'A responsive clone of the Tinder interface, built to practice HTML and CSS on a real, well-known layout.',
    'link-acessar': 'Visit',
    'github-texto': 'All my project code is publicly available on GitHub — including this portfolio. Feel free to explore the repositories, check the commit history, and see how each project was built.',
    'github-btn': 'View my repositories',
    'contato-titulo': 'Get in touch',
    'contato-label-nome': 'Name or company',
    'contato-placeholder-nome': 'What should I call you?',
    'contato-erro-nome': 'Please enter your name or company.',
    'contato-label-mensagem': 'Message',
    'contato-placeholder-mensagem': 'Tell me a bit about why you\'re reaching out...',
    'contato-erro-mensagem': 'Please write a message.',
    'contato-btn': 'Send via WhatsApp'
  }
};

let idiomaAtual = localStorage.getItem('idioma') || 'pt';

function aplicarTraducoes() {
  document.querySelectorAll('[data-i18n]').forEach(function (elemento) {
    const chave = elemento.getAttribute('data-i18n');
    if (traducoes[idiomaAtual][chave]) {
      elemento.textContent = traducoes[idiomaAtual][chave];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (elemento) {
    const chave = elemento.getAttribute('data-i18n-placeholder');
    if (traducoes[idiomaAtual][chave]) {
      elemento.placeholder = traducoes[idiomaAtual][chave];
    }
  });

   document.querySelectorAll('[data-i18n-html]').forEach(function (elemento) {
    const chave = elemento.getAttribute('data-i18n-html');
    if (traducoes[idiomaAtual][chave]) {
      elemento.innerHTML = traducoes[idiomaAtual][chave];
    }
  });

  document.documentElement.lang = idiomaAtual === 'pt' ? 'pt-BR' : 'en';
}

function definirIdioma(novoIdioma) {
  idiomaAtual = novoIdioma;
  localStorage.setItem('idioma', novoIdioma);

  document.querySelectorAll('.idioma-opcao').forEach(function (botao) {
    const ativo = botao.getAttribute('data-idioma') === novoIdioma;
    botao.classList.toggle('idioma-opcao--ativa', ativo);
  });

  aplicarTraducoes();
  tituloSobre.textContent = tituloDoSlide(slideAtual);
}

document.querySelectorAll('.idioma-opcao').forEach(function (botao) {
  botao.addEventListener('click', function () {
    definirIdioma(botao.getAttribute('data-idioma'));
  });
});

aplicarTraducoes();

document.querySelectorAll('.idioma-opcao').forEach(function (botao) {
  const ativo = botao.getAttribute('data-idioma') === idiomaAtual;
  botao.classList.toggle('idioma-opcao--ativa', ativo);
});

tituloSobre.textContent = tituloDoSlide(slideAtual);