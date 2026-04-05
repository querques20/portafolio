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
    title: 'Listo para mi primera oportunidad profesional',
    body: 'Sostengo este camino trabajando con mi vehículo en PedidosYa mientras busco mi primer rol en tech. Compromiso real, ganas de aprender rápido y disponibilidad total desde el día uno.',
    tag: null,
    isNow: true,
  },
]

export const pillars = [
  ['COMPROMISO', 'Me involucro de verdad y cuido cada entrega, incluso en esta primera etapa.', 'var(--accent)'],
  ['APRENDIZAJE', 'Estoy creciendo fuerte y convierto esa etapa en mejora constante.',             'var(--earth)'],
  ['RESPUESTA',   'Busco resolver con seriedad, comunicación clara y muchas ganas de sumar.',      'var(--accent)'],
]

export const aboutCards = [
  ['MOMENTO',   'Buscando mis primeras experiencias en desarrollo mientras sostengo mi camino con PedidosYa.', 'var(--accent)'],
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
  { title: 'LinkedIn', body: 'Recorrido actual y disponibilidad profesional',       href: '',                  badge: 'Próximamente', type: 'external' },
  { title: 'GitHub',   body: 'Código, práctica constante y proceso de aprendizaje', href: '',                  badge: 'Próximamente', type: 'external' },
  { title: 'Inicio',   body: 'Volver al comienzo del sitio',                        routeName: 'home',         badge: 'Abrir',        type: 'route'    },
  { title: 'Respuesta',body: 'Contacto directo por mail',                            href: `mailto:${email}`,  badge: 'Email',        type: 'mailto'   },
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
]

export const footerColumns = [
  { label: 'NAVEGACIÓN', items: ['Inicio', 'Sobre mí', 'Contacto'] },
  { label: 'ENFOQUE',    items: ['Full Stack', 'WordPress', 'Vue / React', 'MERN + LAMP'] },
  { label: 'CONTACTO',   items: [email, 'Buenos Aires, AR', 'Disponible para primeros proyectos'] },
]
