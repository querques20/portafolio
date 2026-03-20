export const email = 'facundo.albuquerque@gmail.com'

export const navItems = [
  { id: 'inicio', name: 'home', path: '/', label: 'Inicio', order: 0 },
  { id: 'sobre-mi', name: 'about', path: '/sobre-mi', label: 'Sobre mí', order: 1 },
  { id: 'proyectos', name: 'projects', path: '/proyectos', label: 'Proyectos', order: 2 },
  { id: 'contacto', name: 'contact', path: '/contacto', label: 'Contacto', order: 3 },
]

export const heroLines = ['Diseño y desarrollo', 'digital', 'para sitios y marcas']
export const heroTags = ['Full Stack', 'Vue / React / Node', 'WordPress / Laravel']

export const previewProjects = [
  {
    label: 'E-commerce / identidad digital',
    title: 'Latido Cerámico',
    body: 'Tienda online con identidad cálida y un recorrido de compra simple.',
    image: '/portfolio/latido-ceramico.png',
    accent: 'var(--accent)',
  },
  {
    label: 'App / concepto de producto',
    title: 'NightPrep',
    body: 'Concepto de app para descubrir salidas y eventos desde el mapa.',
    image: '/portfolio/nightprep.png',
    accent: 'var(--accent)',
  },
  {
    label: 'Servicio / identidad digital',
    title: 'Pulid Car',
    body: 'Identidad y presencia digital pensadas para comunicar mejor el servicio.',
    image: '/portfolio/pulid-car.png',
    accent: 'var(--earth)',
  },
]

export const pillars = [
  ['COMPROMISO', 'Me involucro de verdad y cuido cada entrega, incluso en esta primera etapa.', 'var(--accent)'],
  ['APRENDIZAJE', 'Estoy creciendo fuerte y convierto esa etapa en mejora constante.', 'var(--earth)'],
  ['RESPUESTA', 'Busco resolver con seriedad, comunicación clara y muchas ganas de sumar.', 'var(--accent)'],
]

export const aboutCards = [
  ['MOMENTO', 'Buscando mis primeras experiencias en desarrollo mientras sostengo mi camino con PedidosYa.', 'var(--accent)'],
  ['FORMACIÓN', 'Carrera intensiva Full Stack de 2 años en Escuela Da Vinci.', 'var(--earth)'],
  ['STACK', 'WordPress, Vue, React, Node.js, Laravel y base real en MERN y LAMP.', 'var(--accent)'],
  ['ACTITUD', 'Compromiso real, ganas de aprender y dedicación total en cada proyecto.', 'var(--earth)'],
]

export const tools = ['WordPress', 'Vue', 'React', 'Node.js', 'JavaScript', 'CSS', 'HTML', 'Laravel', 'MongoDB', 'Express', 'PHP', 'MySQL', 'Linux', 'Apache']

export const steps = [
  ['01 / ESCUCHAR', 'Entender qué necesita el proyecto y qué espera quien lo encarga.', 'var(--accent)'],
  ['02 / ORDENAR', 'Definir estructura, stack y prioridades antes de empezar.', 'var(--earth)'],
  ['03 / CUMPLIR', 'Trabajar con compromiso, comunicación y mejora constante hasta entregar.', 'var(--accent)'],
]

export const projectDetails = [
  {
    role: 'Dirección visual, estructura del catálogo y experiencia de compra.',
    tags: ['Concepto', 'E-commerce', 'Catálogo visual', 'Compra'],
  },
  {
    role: 'UX/UI, producto y enfoque funcional.',
    tags: ['Concepto', 'UX/UI', 'Mapa', 'Eventos'],
  },
  {
    role: 'Identidad visual y presencia digital para comunicar el servicio con claridad.',
    tags: ['Identidad', 'Servicio', 'Confianza', 'Presencia digital'],
  },
]

export const contactLinks = [
  { title: 'LinkedIn', body: 'Recorrido actual y disponibilidad profesional', href: '', badge: 'Próximamente', type: 'external' },
  { title: 'GitHub', body: 'Código, práctica constante y proceso de aprendizaje', href: '', badge: 'Próximamente', type: 'external' },
  { title: 'Inicio', body: 'Volver al comienzo del sitio', routeName: 'home', badge: 'Abrir', type: 'route' },
  { title: 'Respuesta', body: 'Contacto directo por mail', href: `mailto:${email}`, badge: 'Email', type: 'mailto' },
]

export const footerColumns = [
  {
    label: 'NAVEGACIÓN',
    items: ['Inicio', 'Sobre mí', 'Proyectos', 'Contacto'],
  },
  {
    label: 'ENFOQUE',
    items: ['Full Stack', 'WordPress', 'Vue / React', 'MERN + LAMP'],
  },
  {
    label: 'CONTACTO',
    items: [email, 'Buenos Aires, AR', 'Disponible para primeros proyectos'],
  },
]
