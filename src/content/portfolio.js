export const email = 'facundo.albuquerque@gmail.com'

export const navItems = [
  { name: 'home',    label: 'Inicio',   order: 0 },
  { name: 'about',   label: 'Sobre mí', order: 1 },
  { name: 'contact', label: 'Contacto', order: 2 },
]

export const heroLines = ['Diseño y desarrollo', 'digital', 'para sitios y marcas']
export const heroTags  = ['Full Stack', 'React / Vue / Next.js', 'Node / PHP / SQL']

export const milestones = [
  {
    id: 'inicio',
    year: '2024 · Inicio',
    num: '01',
    title: 'Aposté todo al desarrollo web',
    body: 'Empecé a estudiar de forma intensiva, sin atajos. Impulsado por el interés real de construir cosas con código y entender cómo funciona todo de verdad.',
    tag: 'Inicio de formación intensiva',
  },
  {
    id: 'davinci',
    year: '2024 · Escuela Da Vinci',
    num: '02',
    title: 'Carrera de Diseño y Programación Web',
    body: 'Formación acelerada cubriendo frontend, backend, bases de datos y herramientas reales. Vue, React, Node, Laravel, MySQL, MongoDB y más.',
    tag: 'Cursada completa · tesis en curso',
  },
  {
    id: 'beca',
    year: '2025 · Reconocimiento',
    num: '03',
    title: 'Beca por promedio académico',
    body: 'Obtuve una beca por rendimiento en Da Vinci. Un hito que confirma que el esfuerzo real da resultados y me impulsó a seguir con más exigencia todavía.',
    tag: 'Beca · promedio destacado',
  },
  {
    id: 'stack',
    year: '2025 · Stack real',
    num: '04',
    title: 'Proyectos de práctica en cada tecnología',
    body: 'No para mostrar — para entender de verdad cómo funciona cada parte. WordPress, Vue, React, Node, Laravel y bases de datos relacionales y no relacionales.',
    tag: 'Stack completo · práctica constante',
  },
  {
    id: 'empoderamiento-docente',
    year: '2026 · Trabajo real',
    num: '05',
    title: 'Freelance en Empoderamiento Docente',
    body: 'Me sumé al equipo que hace el sitio de una organización educativa que trabaja en cinco países. Me ocupo sobre todo del frontend: las páginas, las animaciones y las correcciones del cliente. Ya está en producción.',
    tag: 'Freelance · en curso',
  },
  {
    id: 'ahora',
    year: '2026 · Ahora',
    num: '→',
    title: 'Construyendo y buscando el equipo correcto',
    body: 'Mientras termino la tesis, sigo haciendo sitios para clientes reales y busco mi primer puesto en un equipo de desarrollo, donde pueda aportar desde el primer día.',
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
  ['MOMENTO',   'Trabajo como freelance en el sitio de Empoderamiento Docente y busco mi primer puesto en un equipo.', 'var(--accent)'],
  ['FORMACIÓN', 'Diseño y Programación Web en Escuela Da Vinci. Cursada completa, con beca por promedio.',            'var(--earth)'],
  ['STACK',     'React, Vue, Next.js y TypeScript en el frontend; Node.js, PHP y bases SQL y NoSQL detrás.',          'var(--accent)'],
  ['ACTITUD',   'Compromiso real, ganas de aprender y dedicación total en cada proyecto.',                            'var(--earth)'],
]

export const tools = [
  { name: 'React',        studying: false },
  { name: 'Vue',          studying: false },
  { name: 'Next.js',      studying: false },
  { name: 'TypeScript',   studying: false },
  { name: 'JavaScript',   studying: false },
  { name: 'HTML',         studying: false },
  { name: 'CSS',          studying: false },
  { name: 'Tailwind CSS', studying: false },
  { name: 'GSAP',         studying: false },
  { name: 'Node.js',      studying: false },
  { name: 'Express',      studying: false },
  { name: 'PHP',          studying: false },
  { name: 'Laravel',      studying: false },
  { name: 'MySQL',        studying: false },
  { name: 'PostgreSQL',   studying: false },
  { name: 'MongoDB',      studying: false },
  { name: 'Supabase',     studying: false },
  { name: 'Docker',       studying: false },
  { name: 'Git',          studying: false },
  { name: 'WordPress',    studying: false },
]

export const steps = [
  ['01 / ESCUCHAR', 'Entender qué necesita el proyecto y qué espera quien lo encarga.',                 'var(--accent)'],
  ['02 / ORDENAR',  'Definir estructura, stack y prioridades antes de empezar.',                        'var(--earth)'],
  ['03 / CUMPLIR',  'Trabajar con compromiso, comunicación y mejora constante hasta entregar.',         'var(--accent)'],
]

export const contactLinks = [
  { title: 'GitHub',   body: 'El código de mis proyectos',                              href: 'https://github.com/querques20', badge: 'Ver perfil', type: 'external' },
  { title: 'LinkedIn', body: 'Mi perfil profesional y experiencia',                     href: 'https://www.linkedin.com/in/facundo-alvarez-dev', badge: 'Ver perfil', type: 'external' },
  { title: 'Inicio',   body: 'Volver al comienzo del sitio',                          routeName: 'home',                    badge: 'Abrir',      type: 'route'    },
  { title: 'Respuesta',body: 'Contacto directo por mail',                              href: `mailto:${email}`,              badge: 'Email',      type: 'mailto'   },
]

export const projects = [
  {
    id: 'empoderamiento-docente',
    title: 'Empoderamiento Docente',
    category: 'Educación',
    year: '2026',
    description: 'Sitio institucional de una organización educativa que trabaja en cinco países. Lo hicimos en equipo y me ocupé sobre todo del frontend: las páginas, las animaciones y las correcciones del cliente.',
    tags: ['Next.js', 'TypeScript', 'GSAP'],
    url: 'https://empoderamientodocente.org',
  },
  {
    id: 'bystellabotella',
    title: 'By Stella Botella',
    category: 'E-commerce',
    year: '2025',
    description: 'Tienda online de patrones de crochet y tutoriales: catálogo de descargables, newsletter con patrón gratis y diseño totalmente responsive. Hecha en equipo; me ocupé del frontend.',
    tags: ['Astro', 'Vue', 'E-commerce', 'CSS'],
    url: 'https://bystellabotella.com',
  },
  {
    id: 'la-rucula',
    title: 'La Rúcula Gastrobar',
    category: 'Gastronomía',
    year: '2025',
    description: 'Sitio para un gastrobar de cocina mediterránea en Cádiz, España: carta interactiva, identidad visual cálida y animaciones con GSAP. Hecho en equipo; me ocupé del frontend.',
    tags: ['Vue', 'GSAP'],
    url: 'https://laruculagastrobar.es',
    image: '/portfolio/la-rucula.png',
  },
]

export const footerColumns = [
  { label: 'NAVEGACIÓN', items: [
    { text: 'Inicio',   route: 'home'    },
    { text: 'Sobre mí', route: 'about'   },
    { text: 'Contacto', route: 'contact' },
  ]},
  { label: 'ENFOQUE',  items: ['Full Stack', 'Frontend', 'React / Vue / Next.js', 'Node / PHP'] },
  { label: 'CONTACTO', items: [email, 'Buenos Aires, AR', 'Disponible para trabajar'] },
]
