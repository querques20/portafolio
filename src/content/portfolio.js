export const email = 'hello@facundo.dev'

export const navItems = [
  { id: 'inicio', name: 'home', path: '/', label: 'Inicio', order: 0 },
  { id: 'sobre-mi', name: 'about', path: '/sobre-mi', label: 'Sobre mí', order: 1 },
  { id: 'proyectos', name: 'projects', path: '/proyectos', label: 'Proyectos', order: 2 },
  { id: 'contacto', name: 'contact', path: '/contacto', label: 'Contacto', order: 3 },
]

export const heroLines = ['Diseño y desarrollo', 'digital', 'con criterio visual']
export const heroTags = ['Producto', 'Dirección visual', 'Desarrollo web']

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
  ['CLARIDAD', 'La información se entiende rápido y sin ruido.', 'var(--accent)'],
  ['CONFIANZA', 'Una buena presencia digital transmite seriedad.', 'var(--earth)'],
  ['CRITERIO', 'Lo visual ordena, diferencia y sostiene el mensaje.', 'var(--accent)'],
]

export const aboutCards = [
  ['ENFOQUE', 'Diseño visual con base funcional.', 'var(--accent)'],
  ['ESPECIALIDAD', 'Sitios, interfaces e identidad digital.', 'var(--earth)'],
  ['MIRADA', 'Orden, detalle y coherencia visual.', 'var(--accent)'],
  ['BASE', 'Práctica constante y trabajo sobre proyectos reales.', 'var(--earth)'],
]

export const tools = ['MongoDB', 'React', 'Vue', 'PHP', 'Tailwind', 'GSAP', 'MySQL', 'JavaScript', 'CSS', 'HTML']

export const steps = [
  ['01 / ENTENDER', 'Contexto, objetivo y usuario antes de diseñar.', 'var(--accent)'],
  ['02 / ORDENAR', 'Jerarquía, sistema visual y estructura.', 'var(--earth)'],
  ['03 / RESOLVER', 'Interfaz, detalle y desarrollo final.', 'var(--accent)'],
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
  { title: 'LinkedIn', body: 'Perfil profesional y recorrido', href: '', badge: 'Próximamente', type: 'external' },
  { title: 'GitHub', body: 'Código, pruebas y proceso', href: '', badge: 'Próximamente', type: 'external' },
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
    items: ['UX/UI', 'Front-end', 'Identidad digital', 'Animación'],
  },
  {
    label: 'CONTACTO',
    items: [email, 'Buenos Aires, AR', 'Proyectos selectos'],
  },
]
