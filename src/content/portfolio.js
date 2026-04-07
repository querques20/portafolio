export const email = 'facundo.albuquerque@gmail.com'

export const navItems = [
  { name: 'home',    label: 'Inicio',   order: 0 },
  { name: 'about',   label: 'Sobre mí', order: 1 },
  { name: 'contact', label: 'Contacto', order: 2 },
]

export const heroLines = ['Diseño y desarrollo', 'digital', 'para sitios y marcas']
export const heroTags  = ['Full Stack', 'Vue / React / Node', 'WordPress / Laravel']

export const milestones = [
  {
    id: 'inicio',
    year: '2024 · Inicio',
    num: '01',
    title: 'Aposté todo al desarrollo web',
    body: 'Empecé a estudiar de forma intensiva, sin atajos. Impulsado por el interés real de construir cosas con código y entender cómo funciona todo de verdad.',
    tag: '📚 Inicio de formación intensiva',
  },
  {
    id: 'davinci',
    year: '2024 · Escuela Da Vinci',
    num: '02',
    title: 'Carrera Full Stack de 2 años',
    body: 'Formación acelerada cubriendo frontend, backend, bases de datos y herramientas reales. Vue, React, Node, Laravel, MySQL, MongoDB y más.',
    tag: '🎓 Carrera en curso · Full Stack',
  },
  {
    id: 'beca',
    year: '2025 · Reconocimiento',
    num: '03',
    title: 'Beca por promedio académico',
    body: 'Obtuve una beca por rendimiento en Da Vinci. Un hito que confirma que el esfuerzo real da resultados y me impulsó a seguir con más exigencia todavía.',
    tag: '⭐ Beca · promedio destacado',
  },
  {
    id: 'stack',
    year: '2025 · Stack real',
    num: '04',
    title: 'Proyectos de práctica en cada tecnología',
    body: 'No para mostrar — para entender de verdad cómo funciona cada parte. WordPress, Vue, React, Node, Laravel y bases de datos relacionales y no relacionales.',
    tag: '⚡ Stack completo · práctica constante',
  },
  {
    id: 'ahora',
    year: '2026 · Ahora',
    num: '→',
    title: 'Construyendo para clientes reales y buscando el equipo correcto',
    body: 'Diseño y desarrollo sitios web para clientes reales — e-commerce, gastronomía, branding. Busco mi primer rol formal en desarrollo web donde pueda aportar, crecer y responder bien.',
    tag: null,
    isNow: true,
  },
]

export const pillars = [
  ['COMPROMISO', 'Me involucro de verdad, cuido cada detalle y trabajo con seriedad.', 'var(--accent)'],
  ['APRENDIZAJE', 'Aprendo rápido y convierto cada proyecto en una oportunidad de mejorar.',              'var(--earth)'],
  ['RESPUESTA',   'Comunicación clara, disponibilidad real y ganas de aportar desde el día uno.', 'var(--accent)'],
]

export const aboutCards = [
  ['MOMENTO',   'Trabajo en PedidosYa mientras desarrollo proyectos web reales y busco consolidarme como desarrollador.', 'var(--accent)'],
  ['FORMACIÓN', 'Carrera intensiva Full Stack de 2 años en Escuela Da Vinci.',                                'var(--earth)'],
  ['STACK',     'WordPress, Vue, React, Node.js, Laravel y base real en MERN y LAMP.',                       'var(--accent)'],
  ['ACTITUD',   'Compromiso real, ganas de aprender y dedicación total en cada proyecto.',                    'var(--earth)'],
]

export const tools = [
  'WordPress', 'Vue', 'React', 'Node.js', 'JavaScript',
  'CSS', 'HTML', 'Laravel', 'MongoDB', 'Express', 'PHP', 'MySQL', 'Linux', 'Apache',
]

export const steps = [
  ['01 / ESCUCHAR', 'Entender qué necesita el proyecto y qué espera quien lo encarga.',                 'var(--accent)'],
  ['02 / ORDENAR',  'Definir estructura, stack y prioridades antes de empezar.',                        'var(--earth)'],
  ['03 / CUMPLIR',  'Trabajar con compromiso, comunicación y mejora constante hasta entregar.',         'var(--accent)'],
]

export const contactLinks = [
  { title: 'GitHub',   body: 'Código, práctica constante y proceso de aprendizaje',    href: 'https://github.com/querques20', badge: 'Ver perfil', type: 'external' },
  { title: 'Inicio',   body: 'Volver al comienzo del sitio',                          routeName: 'home',                    badge: 'Abrir',      type: 'route'    },
  { title: 'Respuesta',body: 'Contacto directo por mail',                              href: `mailto:${email}`,              badge: 'Email',      type: 'mailto'   },
]

export const projects = [
  {
    id: 'bystellabotella',
    title: 'By Stella Botella',
    category: 'E-commerce',
    year: '2025',
    description: 'Tienda online de patrones de crochet y tutoriales. Catálogo de productos descargables, newsletter con patrón gratis, diseño cálido y totalmente responsive.',
    tags: ['Astro', 'Vue', 'E-commerce', 'CSS'],
    url: 'https://bystellabotella.com',
  },
  {
    id: 'latidoceramico',
    title: 'Latido Cerámico',
    category: 'E-commerce',
    year: '2025',
    description: 'Sitio completo para un emprendimiento de cerámica artesanal. Tienda con carrito, panel de administración, sistema de login, checkout y gestión de órdenes.',
    tags: ['PHP', 'MySQL', 'Docker', 'Tailwind'],
    url: 'https://web-production-275ee.up.railway.app',
  },
  {
    id: 'la-rucula',
    title: 'La Rúcula Gastrobar',
    category: 'Gastronomía',
    year: '2025',
    description: 'Sitio web para un gastrobar de cocina costera refinada. Carta interactiva, identidad visual cálida y experiencia de navegación fluida.',
    tags: ['Vue', 'GSAP'],
    url: 'https://laruculagastrobar.es/',
    image: '/portfolio/la-rucula.png',
  },
]

export const footerColumns = [
  { label: 'NAVEGACIÓN', items: [
    { text: 'Inicio',   route: 'home'    },
    { text: 'Sobre mí', route: 'about'   },
    { text: 'Contacto', route: 'contact' },
  ]},
  { label: 'ENFOQUE',  items: ['Full Stack', 'WordPress', 'Vue / React', 'MERN + LAMP'] },
  { label: 'CONTACTO', items: [email, 'Buenos Aires, AR', 'Disponible para nuevos proyectos'] },
]
