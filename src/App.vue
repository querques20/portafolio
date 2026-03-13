<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const email = 'hello@facundo.dev'
const activeSection = ref('inicio')
const form = reactive({ name: '', email: '', project: '', message: '' })

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
]

const heroLines = ['Diseño y desarrollo', 'digital', 'con criterio visual']
const heroTags = ['Producto', 'Dirección visual', 'Web']

const previewProjects = [
  {
    label: 'E-commerce / marca digital',
    title: 'Latido Cerámico',
    body: 'Identidad cálida, catálogo visual y compra clara.',
    image: '/portfolio/latido-ceramico.png',
    accent: 'var(--accent)',
  },
  {
    label: 'App / producto digital',
    title: 'NightPrep',
    body: 'Producto social para descubrir eventos y salidas.',
    image: '/portfolio/nightprep.png',
    accent: 'var(--accent)',
  },
  {
    label: 'Branding / servicio comercial',
    title: 'Pulid Car',
    body: 'Marca y presencia digital con foco comercial.',
    image: '/portfolio/pulid-car.png',
    accent: 'var(--earth)',
  },
]

const pillars = [
  ['CLARIDAD', 'El mensaje se entiende rápido.', 'var(--accent)'],
  ['CONFIANZA', 'La forma también comunica seriedad.', 'var(--earth)'],
  ['DIFERENCIACIÓN', 'Una identidad clara evita verse genérico.', 'var(--accent)'],
]

const aboutCards = [
  ['ENFOQUE', 'Diseño con criterio. Desarrollo funcional.', 'var(--accent)'],
  ['ESPECIALIDAD', 'Interfaces, identidad digital y web.', 'var(--earth)'],
  ['MIRADA', 'Detalle, coherencia y simplicidad.', 'var(--accent)'],
  ['BASE', 'Da Vinci + proyectos reales.', 'var(--earth)'],
]

const tools = ['MongoDB', 'React', 'Vue', 'PHP', 'Tailwind', 'GSAP', 'MySQL', 'JavaScript', 'CSS', 'HTML']

const steps = [
  ['01 / LEER', 'Entender contexto, objetivo y uso.', 'var(--accent)'],
  ['02 / ORDENAR', 'Definir jerarquía, sistema y estructura.', 'var(--earth)'],
  ['03 / RESOLVER', 'Refinar detalle, interacción y ejecución.', 'var(--accent)'],
]

const projectDetails = [
  {
    role: 'Identidad, dirección visual y experiencia de compra.',
    tags: ['2026', 'E-commerce', 'Visual identity', 'Build + checkout'],
  },
  {
    role: 'UX/UI, producto y enfoque funcional.',
    tags: ['Concept', 'UX/UI', 'Map flows', 'Social product'],
  },
  {
    role: 'Branding y dirección digital.',
    tags: ['Brand system', 'Service', 'Trust cues', 'Digital presence'],
  },
]

const contactLinks = [
  { title: 'LinkedIn', body: 'Perfil y recorrido profesional', href: '', badge: 'Próximamente' },
  { title: 'GitHub', body: 'Código, pruebas y proceso', href: '', badge: 'Próximamente' },
  { title: 'Portfolio', body: 'Trabajo, producto y dirección visual', href: '#inicio', badge: 'Abrir' },
  { title: 'Respuesta', body: 'Breve, clara y con contexto', href: `mailto:${email}`, badge: 'Email' },
]

const motionCards = [
  ['Hero / Entrada', 'Capas, reveal y retrato.'],
  ['Ritmo editorial', 'Texto, destacados y stack.'],
  ['Respuesta visual', 'Reveal, hover y microparallax.'],
  ['Cierre sobrio', 'Reveal limpio y links activos.'],
  ['Hover states', 'Nav, chips y cases.'],
]

const footerColumns = [
  {
    label: 'NAVEGACIÓN',
    items: ['Inicio', 'Sobre mí', 'Proyectos', 'Contacto'],
  },
  {
    label: 'ENFOQUE',
    items: ['UX/UI', 'Sistemas front-end', 'Identidad digital', 'Motion'],
  },
  {
    label: 'CONTACTO',
    items: [email, 'Buenos Aires, AR', 'Proyectos selectos'],
  },
]

let observer

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const openLink = (href) => {
  if (!href) return
  if (href.startsWith('#')) return goTo(href.slice(1))
  if (href.startsWith('mailto:')) return (window.location.href = href)
  window.open(href, '_blank', 'noopener,noreferrer')
}

const submitInquiry = () => {
  const subject = encodeURIComponent(`Consulta portfolio - ${form.project || 'Proyecto digital'}`)
  const body = encodeURIComponent(
    [`Nombre: ${form.name || '-'}`, `Email: ${form.email || '-'}`, `Tipo: ${form.project || '-'}`, '', form.message || '-'].join('\n')
  )
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
}

const observeSections = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-35% 0px -45% 0px', threshold: 0.15 }
  )

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
}

const hoverCard = (event, enter) => {
  const card = event.currentTarget
  const visual = card.querySelector('[data-visual]')

  gsap.to(card, {
    y: enter ? -6 : 0,
    scale: enter ? 1.01 : 1,
    duration: 0.35,
    ease: 'power2.out',
    boxShadow: enter ? '0 28px 60px rgba(30,30,27,.14)' : '0 18px 38px rgba(30,30,27,.08)',
  })

  if (visual) {
    gsap.to(visual, { scale: enter ? 1.05 : 1, duration: 0.45, ease: 'power3.out' })
  }
}

const animate = () => {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-nav', { opacity: 0, y: 20, duration: 0.7 })
    .from('.hero-copy > *', { opacity: 0, y: 28, duration: 0.8, stagger: 0.08 }, '-=0.35')
    .from('.hero-portrait', { opacity: 0, y: 32, duration: 0.85 }, '-=0.5')
    .from('.hero-card', { opacity: 0, y: 28, duration: 0.65, stagger: 0.12 }, '-=0.45')

  document.querySelectorAll('.reveal-section').forEach((section) => {
    const items = section.querySelectorAll('.reveal-item')
    if (!items.length) return

    gsap.from(items, {
      opacity: 0,
      y: 34,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 78%' },
    })
  })

  gsap.from('.tool-chip', {
    opacity: 0,
    y: 16,
    stagger: 0.04,
    duration: 0.5,
    scrollTrigger: { trigger: '#sobre-mi', start: 'top 65%' },
  })

  gsap.from('.motion-card', {
    opacity: 0,
    y: 24,
    stagger: 0.06,
    duration: 0.55,
    scrollTrigger: { trigger: '#motion', start: 'top 78%' },
  })

  observeSections()
}

onMounted(async () => {
  await nextTick()
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) animate()
  else observeSections()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <div class="portfolio-app overflow-x-hidden bg-[var(--sand)] text-[var(--ink)]">
    <header class="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-6">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-3">
        <nav
          class="hero-nav pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-[rgba(207,199,187,.65)] bg-[rgba(243,239,231,.78)] px-4 py-3 backdrop-blur-xl shadow-[0_18px_40px_rgba(30,30,27,.08)]"
        >
          <button type="button" class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.18em]" @click="goTo('inicio')">
            facundo.dev
          </button>
          <div class="hidden items-center gap-2 md:flex">
            <button
              v-for="item in navItems"
              :key="item.id"
              type="button"
              class="rounded-full px-4 py-2 font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.18em] transition-all duration-300"
              :class="activeSection === item.id ? 'bg-white/70 text-[var(--ink)]' : 'text-[var(--muted)] hover:bg-white/40 hover:text-[var(--ink)]'"
              @click="goTo(item.id)"
            >
              {{ item.label }}
            </button>
            <span class="rounded-full bg-[rgba(124,140,255,.12)] px-4 py-2 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.22em] text-[var(--accent)]">
              ES / EN
            </span>
          </div>
          <button
            type="button"
            class="rounded-full border border-[rgba(207,199,187,.72)] bg-white/55 px-4 py-2 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--ink)] md:hidden"
            @click="goTo('contacto')"
          >
            Contacto
          </button>
        </nav>

        <div class="pointer-events-auto md:hidden">
          <div class="flex items-center gap-2 overflow-x-auto rounded-full border border-[rgba(207,199,187,.62)] bg-[rgba(243,239,231,.76)] px-2 py-2 backdrop-blur-xl shadow-[0_16px_34px_rgba(30,30,27,.07)]">
            <button
              v-for="item in navItems"
              :key="`${item.id}-mobile`"
              type="button"
              class="shrink-0 rounded-full px-4 py-2 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] transition-all duration-300"
              :class="activeSection === item.id ? 'bg-[var(--ink)] text-[var(--sand)]' : 'bg-white/55 text-[var(--muted)]'"
              @click="goTo(item.id)"
            >
              {{ item.label }}
            </button>
            <span class="shrink-0 rounded-full bg-[rgba(124,140,255,.12)] px-4 py-2 font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[.22em] text-[var(--accent)]">
              ES / EN
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="pt-40 md:pt-28">
      <section id="inicio" class="section-shell reveal-section relative isolate overflow-hidden px-4 pb-20 pt-4 scroll-mt-28">
        <div class="section-aura section-aura-home">
          <span class="ambient-orb ambient-orb-primary"></span>
          <span class="ambient-orb ambient-orb-secondary"></span>
          <span class="ambient-orb ambient-orb-soft"></span>
          <span class="ambient-ribbon ambient-ribbon-a"></span>
          <span class="ambient-ribbon ambient-ribbon-b"></span>
          <span class="ambient-mesh"></span>
        </div>
        <div class="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-20">
          <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,760px)_360px] lg:gap-24">
            <div class="hero-copy flex flex-col gap-8">
              <p class="reveal-item font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">facundo.dev</p>
              <div class="reveal-item space-y-1">
                <h1
                  v-for="(line, index) in heroLines"
                  :key="line"
                  class="font-['Space_Grotesk'] text-[clamp(3.1rem,7vw,4.8rem)] leading-[.94] tracking-[-.06em]"
                  :class="index === 1 ? 'font-medium' : 'font-bold'"
                >
                  {{ line }}
                </h1>
              </div>
              <p class="reveal-item max-w-[360px] text-base font-medium leading-7 text-[var(--accent)]">
                Design and development with visual clarity.
              </p>
              <p class="reveal-item max-w-[580px] text-[1.15rem] leading-8 text-[var(--muted)]">
                Portfolio personal de un diseñador y programador enfocado en producto, estética y funcionalidad.
              </p>
              <div class="reveal-item flex flex-wrap items-center gap-3">
                <button type="button" class="rounded-full bg-[var(--ink)] px-6 py-4 font-['DM_Sans'] text-sm font-bold tracking-[.06em] text-[var(--sand)] shadow-[0_18px_32px_rgba(30,30,27,.18)]" @click="goTo('proyectos')">
                  Ver proyectos
                </button>
                <button type="button" class="rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.75)] px-6 py-4 font-['DM_Sans'] text-sm font-bold tracking-[.06em]" @click="goTo('sobre-mi')">
                  Sobre mí
                </button>
              </div>
              <div class="reveal-item inline-flex w-fit flex-wrap items-center gap-3 rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.72)] px-4 py-3 shadow-[0_16px_32px_rgba(30,30,27,.06)]">
                <template v-for="(tag, index) in heroTags" :key="tag">
                  <span class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">{{ tag }}</span>
                  <span v-if="index < heroTags.length - 1" class="h-1 w-1 rounded-full bg-[var(--earth)]"></span>
                </template>
              </div>
            </div>

            <aside class="hero-portrait flex flex-col gap-7">
              <div class="glass-panel hero-card overflow-hidden rounded-[30px] p-4">
                <div class="overflow-hidden rounded-[22px]">
                  <img
                    src="/portfolio/portrait-facundo.png"
                    alt="Retrato editorial de Facundo"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    class="h-[420px] w-full object-cover"
                  />
                </div>
                <div class="mt-3 w-fit rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.82)] px-4 py-3 shadow-[0_14px_28px_rgba(30,30,27,.08)]">
                  <p class="font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[.18em]">FACUNDO</p>
                  <p class="text-[13px] font-medium leading-5 text-[var(--muted)]">Design + development</p>
                </div>
              </div>
              <p class="hero-card font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
                Buenos Aires · diseño y desarrollo
              </p>
              <div class="hero-card h-[3px] w-[72px] rounded-full bg-[var(--accent)]"></div>
            </aside>
          </div>

          <section class="glass-panel reveal-item rounded-[32px] p-6 md:p-9">
            <div class="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-24">
              <div class="space-y-4">
                <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">PROYECTOS / PREVIEW</p>
                <p class="max-w-[236px] leading-7 text-[var(--muted)]">
                  Tres vistas breves de trabajos donde identidad, producto y experiencia se piensan como sistema.
                </p>
              </div>
              <div class="space-y-4">
                <h2 class="max-w-[700px] font-['Space_Grotesk'] text-[clamp(2rem,4.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-.05em]">
                  Una selección breve del tipo de trabajo que desarrollo.
                </h2>
                <p class="text-base font-medium text-[var(--accent)]">La selección completa está en Proyectos.</p>
              </div>
            </div>
            <div class="mt-8 grid gap-6 lg:grid-cols-3">
              <article
                v-for="project in previewProjects"
                :key="project.title"
                class="glass-card hero-card rounded-[24px] p-5"
                @mouseenter="hoverCard($event, true)"
                @mouseleave="hoverCard($event, false)"
              >
                <div class="overflow-hidden rounded-[18px]">
                  <img :src="project.image" :alt="project.title" loading="lazy" decoding="async" data-visual class="h-45 w-full object-cover" />
                </div>
                <p class="mt-4 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: project.accent }">
                  {{ project.label }}
                </p>
                <h3 class="mt-2 font-['Space_Grotesk'] text-[1.75rem] font-semibold tracking-[-.04em]">{{ project.title }}</h3>
                <p class="mt-3 max-w-[320px] leading-7 text-[var(--muted)]">{{ project.body }}</p>
              </article>
            </div>
          </section>

          <section class="glass-panel reveal-item rounded-[32px] p-6 md:p-9">
            <div class="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-24">
              <div class="space-y-4">
                <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">PRESENCIA / DIGITAL</p>
                <p class="max-w-[236px] leading-7 text-[var(--muted)]">
                  No alcanza con estar online. Importa cómo se ve y qué tan claro se entiende.
                </p>
              </div>
              <div class="space-y-4">
                <h2 class="max-w-[700px] font-['Space_Grotesk'] text-[clamp(2.1rem,4.8vw,2.7rem)] font-medium leading-[1.04] tracking-[-.05em]">
                  Una presencia digital clara genera confianza y ordena la percepción de una marca.
                </h2>
                <p class="max-w-[620px] text-lg leading-8 text-[var(--muted)]">
                  Diseño portfolios, marcas y experiencias web donde forma, estructura y ejecución trabajan juntas.
                </p>
                <p class="text-base font-medium text-[var(--accent)]">Clarity builds trust online.</p>
              </div>
            </div>
            <div class="mt-8 grid gap-6 md:grid-cols-3">
              <article v-for="[title, body, accent] in pillars" :key="title" class="border-t border-[rgba(207,199,187,.92)] pt-5">
                <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: accent }">{{ title }}</p>
                <p class="mt-3 max-w-[300px] leading-7">{{ body }}</p>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section id="sobre-mi" class="section-shell reveal-section relative isolate overflow-hidden bg-[var(--sand-alt)] px-4 py-20 scroll-mt-28">
        <div class="section-aura section-aura-muted">
          <span class="ambient-orb ambient-orb-primary"></span>
          <span class="ambient-orb ambient-orb-secondary"></span>
          <span class="ambient-orb ambient-orb-soft"></span>
          <span class="ambient-ribbon ambient-ribbon-a"></span>
          <span class="ambient-ribbon ambient-ribbon-b"></span>
          <span class="ambient-mesh"></span>
        </div>
        <div class="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <div class="reveal-item space-y-5">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">02 / SOBRE MÍ</p>
              <h2 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.7rem)] font-bold leading-[.96] tracking-[-.05em]">Sobre mí</h2>
              <div class="h-[3px] w-[72px] rounded-full bg-[var(--earth)]"></div>
              <p class="max-w-[230px] text-base font-medium leading-7 text-[var(--muted)]">Design, structure and digital execution.</p>
            </div>
            <div class="reveal-item space-y-8">
              <h3 class="max-w-[740px] font-['Space_Grotesk'] text-[clamp(2.2rem,4.8vw,3.4rem)] font-medium leading-[1.02] tracking-[-.05em]">
                Diseño, lógica y sensibilidad digital.
              </h3>
              <p class="max-w-[740px] text-[1.2rem] leading-9 text-[var(--muted)]">
                Soy Facundo, diseñador y programador. Diseño productos digitales donde la estética forma parte de la experiencia. Busco claridad, identidad visual y una ejecución técnica sólida.
              </p>
            </div>
          </div>

          <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <article v-for="[title, body, accent] in aboutCards" :key="title" class="glass-card reveal-item rounded-[24px] p-5">
              <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: accent }">{{ title }}</p>
              <p class="mt-4 max-w-[240px] text-lg leading-8">{{ body }}</p>
            </article>
          </div>

          <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <aside class="glass-card reveal-item rounded-[24px] p-5">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">STACK / TOOLSET</p>
              <p class="mt-5 max-w-[240px] leading-7 text-[var(--muted)]">Tecnologías con las que diseño, desarrollo y animo experiencias digitales.</p>
            </aside>
            <section class="glass-panel reveal-item rounded-[30px] p-7">
              <h3 class="max-w-[520px] font-['Space_Grotesk'] text-[2.2rem] font-medium leading-[1.04] tracking-[-.04em]">
                Tecnología al servicio de la experiencia.
              </h3>
              <div class="mt-7 flex flex-wrap gap-3">
                <span v-for="tool in tools" :key="tool" class="tool-chip rounded-full border border-[rgba(207,199,187,.95)] bg-[rgba(243,239,231,.82)] px-4 py-3 font-['DM_Sans'] text-[13px] font-bold tracking-[.04em] shadow-[0_10px_22px_rgba(30,30,27,.05)]">
                  {{ tool }}
                </span>
              </div>
            </section>
          </div>

          <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <aside class="glass-card reveal-item rounded-[24px] p-5">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">MÉTODO / WORKFLOW</p>
              <p class="mt-5 max-w-[228px] leading-7 text-[var(--muted)]">Entender, ordenar y resolver.</p>
            </aside>
            <section class="glass-panel reveal-item rounded-[30px] p-7">
              <h3 class="max-w-[620px] font-['Space_Grotesk'] text-[1.95rem] font-medium leading-[1.06] tracking-[-.04em]">
                Diseño y desarrollo como un mismo sistema.
              </h3>
              <div class="mt-6 grid gap-6 md:grid-cols-3">
                <article v-for="[title, body, accent] in steps" :key="title" class="border-t border-[rgba(207,199,187,.95)] pt-5">
                  <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: accent }">{{ title }}</p>
                  <p class="mt-3 max-w-[260px] leading-7">{{ body }}</p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="proyectos" class="section-shell reveal-section relative isolate overflow-hidden px-4 py-20 scroll-mt-28">
        <div class="section-aura section-aura-home">
          <span class="ambient-orb ambient-orb-primary"></span>
          <span class="ambient-orb ambient-orb-secondary"></span>
          <span class="ambient-orb ambient-orb-soft"></span>
          <span class="ambient-ribbon ambient-ribbon-a"></span>
          <span class="ambient-ribbon ambient-ribbon-b"></span>
          <span class="ambient-mesh"></span>
        </div>
        <div class="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <div class="reveal-item space-y-5">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">03 / PROYECTOS</p>
              <h2 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.7rem)] font-bold leading-[.96] tracking-[-.05em]">Proyectos</h2>
              <div class="h-[3px] w-[72px] rounded-full bg-[var(--earth)]"></div>
            </div>
            <div class="reveal-item space-y-4">
              <h3 class="max-w-[740px] font-['Space_Grotesk'] text-[clamp(2.1rem,4.8vw,3.1rem)] font-medium leading-[1.02] tracking-[-.05em]">
                Tres proyectos donde identidad, producto y estructura digital se resuelven como sistema.
              </h3>
              <p class="text-base font-medium text-[var(--muted)]">Selected work across commerce, product and branding.</p>
            </div>
          </div>

          <article class="glass-panel reveal-item overflow-hidden rounded-[32px] p-6 md:p-8" @mouseenter="hoverCard($event, true)" @mouseleave="hoverCard($event, false)">
            <div class="grid gap-8 lg:grid-cols-[680px_minmax(0,1fr)] lg:gap-14">
              <div class="relative overflow-hidden rounded-[24px]">
                <img
                  src="/portfolio/latido-ceramico.png"
                  alt="Proyecto Latido Cerámico"
                  loading="lazy"
                  decoding="async"
                  data-visual
                  class="h-full min-h-[320px] w-full object-cover"
                />
                <div class="absolute bottom-5 left-5 rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.78)] px-4 py-3 backdrop-blur-xl shadow-[0_14px_30px_rgba(30,30,27,.08)]">
                  <p class="font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[.18em]">LATIDO CERAMICO</p>
                  <p class="text-[13px] font-medium leading-5 text-[var(--muted)]">Curated digital commerce</p>
                </div>
              </div>
              <div class="flex flex-col justify-between gap-6">
                <div class="space-y-4">
                  <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">01</p>
                  <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">E-commerce / marca digital</p>
                  <p class="text-base font-medium text-[var(--accent)]">curated digital commerce</p>
                  <h3 class="max-w-[320px] font-['Space_Grotesk'] text-[clamp(2.8rem,5vw,3.4rem)] font-bold leading-[.96] tracking-[-.05em]">Latido Cerámico</h3>
                  <p class="max-w-[380px] text-[1.08rem] leading-8 text-[var(--muted)]">E-commerce conceptual con identidad cálida, catálogo visual y compra clara.</p>
                </div>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-3 border-t border-[rgba(207,199,187,.95)] pt-4">
                    <span v-for="tag in projectDetails[0].tags" :key="tag" class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">{{ tag }}</span>
                  </div>
                  <div>
                    <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--earth)]">ROL</p>
                    <p class="mt-3 max-w-[360px] leading-7">{{ projectDetails[0].role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div class="grid gap-8 xl:grid-cols-[720px_minmax(0,1fr)]">
            <article class="project-dark reveal-item overflow-hidden rounded-[30px] p-8" @mouseenter="hoverCard($event, true)" @mouseleave="hoverCard($event, false)">
              <div class="flex h-full flex-col gap-7">
                <div class="space-y-4">
                  <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">02 / NIGHTPREP</p>
                  <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--earth)]">App / producto digital</p>
                  <p class="text-base font-medium text-[var(--accent)]">event discovery product concept</p>
                  <h3 class="font-['Space_Grotesk'] text-[clamp(2.6rem,4.4vw,3.1rem)] font-bold leading-[.96] tracking-[-.05em]">NightPrep</h3>
                  <p class="max-w-[460px] text-[1.06rem] leading-8 text-[rgba(243,239,231,.78)]">
                    App conceptual para descubrir boliches, bares y eventos desde una interfaz centrada en mapa, música y experiencia social.
                  </p>
                </div>
                <div class="relative overflow-hidden rounded-[22px]">
                  <img src="/portfolio/nightprep.png" alt="Proyecto NightPrep" loading="lazy" decoding="async" data-visual class="h-[320px] w-full object-cover" />
                </div>
                <div class="flex flex-wrap gap-3 border-t border-[rgba(243,239,231,.16)] pt-4">
                  <span v-for="tag in projectDetails[1].tags" :key="tag" class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.14em] text-[rgba(243,239,231,.78)]">{{ tag }}</span>
                </div>
              </div>
            </article>

            <article class="glass-panel reveal-item overflow-hidden rounded-[30px] p-8" @mouseenter="hoverCard($event, true)" @mouseleave="hoverCard($event, false)">
              <div class="flex h-full flex-col gap-6">
                <div class="relative overflow-hidden rounded-[22px]">
                  <img src="/portfolio/pulid-car.png" alt="Proyecto Pulid Car" loading="lazy" decoding="async" data-visual class="h-[228px] w-full object-cover" />
                </div>
                <div class="space-y-3">
                  <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">03 / PULID CAR</p>
                  <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Marca de servicios / identidad comercial</p>
                  <p class="text-base font-medium text-[var(--accent)]">service branding & digital presence</p>
                  <h3 class="font-['Space_Grotesk'] text-[2.6rem] font-bold leading-[.98] tracking-[-.05em]">Pulid Car</h3>
                  <p class="leading-8 text-[var(--muted)]">Sistema visual y presencia digital para un servicio de restauración de ópticas, con foco en claridad y confianza.</p>
                </div>
                <div class="flex flex-wrap gap-3 border-t border-[rgba(207,199,187,.95)] pt-4">
                  <span v-for="tag in projectDetails[2].tags" :key="tag" class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section id="contacto" class="section-shell reveal-section relative isolate overflow-hidden bg-[var(--sand-alt)] px-4 py-20 scroll-mt-28">
        <div class="section-aura section-aura-muted">
          <span class="ambient-orb ambient-orb-primary"></span>
          <span class="ambient-orb ambient-orb-secondary"></span>
          <span class="ambient-orb ambient-orb-soft"></span>
          <span class="ambient-ribbon ambient-ribbon-a"></span>
          <span class="ambient-ribbon ambient-ribbon-b"></span>
          <span class="ambient-mesh"></span>
        </div>
        <div class="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <div class="reveal-item space-y-5">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">04 / CONTACTO</p>
              <h2 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.7rem)] font-bold leading-[.96] tracking-[-.05em]">Contacto</h2>
              <div class="h-[3px] w-[72px] rounded-full bg-[var(--earth)]"></div>
              <p class="max-w-[240px] text-base font-medium leading-7 text-[var(--muted)]">Available for selected digital collaborations.</p>
            </div>
            <div class="reveal-item space-y-5">
              <h3 class="max-w-[740px] font-['Space_Grotesk'] text-[clamp(2.1rem,4.8vw,3rem)] font-medium leading-[1.02] tracking-[-.05em]">
                Si tu marca o producto necesita claridad visual y buena ejecución, podemos hablar.
              </h3>
              <p class="max-w-[660px] text-[1.12rem] leading-8 text-[var(--muted)]">
                Me interesan proyectos donde diseño, identidad y resolución digital se piensen juntos.
              </p>
            </div>
          </div>

          <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <aside class="glass-card reveal-item rounded-[24px] p-5">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">CONSULTA / INQUIRY</p>
              <p class="mt-5 max-w-[228px] leading-7 text-[var(--muted)]">Compartí contexto, timing y alcance. Con eso alcanza para empezar.</p>
            </aside>

            <form class="glass-panel reveal-item rounded-[30px] p-7" @submit.prevent="submitInquiry">
              <div class="space-y-3">
                <h3 class="font-['Space_Grotesk'] text-[1.95rem] font-medium tracking-[-.04em]">Dejá tu consulta</h3>
                <p class="leading-7 text-[var(--muted)]">Nombre, contacto y una idea breve del proyecto.</p>
              </div>
              <div class="mt-6 grid gap-4 md:grid-cols-2">
                <label class="field-card">
                  <span class="field-label text-[var(--accent)]">NOMBRE</span>
                  <input v-model="form.name" type="text" name="name" autocomplete="name" required placeholder="Tu nombre" class="field-input" />
                </label>
                <label class="field-card">
                  <span class="field-label text-[var(--accent)]">EMAIL</span>
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    inputmode="email"
                    required
                    placeholder="mail@dominio.com"
                    class="field-input"
                  />
                </label>
              </div>
              <label class="field-card mt-4 block">
                <span class="field-label text-[var(--earth)]">TIPO DE PROYECTO</span>
                <input v-model="form.project" type="text" name="project" placeholder="Branding, portfolio, producto o web" class="field-input" />
              </label>
              <label class="field-card mt-4 block">
                <span class="field-label text-[var(--accent)]">MENSAJE</span>
                <textarea v-model="form.message" rows="6" name="message" required placeholder="Contexto, alcance y tiempos." class="field-input resize-none"></textarea>
              </label>
              <div class="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p class="leading-7 text-[var(--muted)]">Respuesta breve, clara y con contexto. ES / EN.</p>
                <button type="submit" class="rounded-full bg-[var(--ink)] px-6 py-4 font-['DM_Sans'] text-sm font-bold tracking-[.06em] text-[var(--sand)] shadow-[0_18px_32px_rgba(30,30,27,.18)]">
                  Enviar consulta
                </button>
              </div>
            </form>
          </div>

          <div class="grid gap-8 xl:grid-cols-[384px_minmax(0,1fr)]">
            <article class="glass-panel reveal-item rounded-[28px] p-8">
              <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">DIRECTO</p>
              <a :href="`mailto:${email}`" class="mt-5 block font-['Space_Grotesk'] text-[1.8rem] font-medium leading-tight tracking-[-.04em] hover:text-[var(--accent)]">
                {{ email }}
              </a>
              <p class="mt-5 whitespace-pre-line text-[1.05rem] leading-8 text-[var(--muted)]">
                Buenos Aires / Remoto
                ES + EN
                Proyectos selectos
              </p>
            </article>
            <div class="reveal-item divide-y divide-[rgba(207,199,187,.95)] rounded-[28px] border border-[rgba(207,199,187,.7)] bg-[rgba(243,239,231,.55)] px-6 backdrop-blur-xl">
              <button
                v-for="link in contactLinks"
                :key="link.title"
                type="button"
                class="flex w-full items-start justify-between gap-5 py-6 text-left transition-colors duration-300"
                :class="link.href ? 'hover:text-[var(--accent)]' : 'cursor-not-allowed opacity-70'"
                :disabled="!link.href"
                @click="openLink(link.href)"
              >
                <div class="max-w-[30rem]">
                  <span class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">{{ link.title }}</span>
                  <span class="mt-2 block text-[1.05rem] leading-7">{{ link.body }}</span>
                </div>
                <span
                  class="shrink-0 rounded-full border px-3 py-2 font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[.16em]"
                  :class="
                    link.href
                      ? 'border-[rgba(124,140,255,.18)] bg-[rgba(124,140,255,.08)] text-[var(--accent)]'
                      : 'border-[rgba(207,199,187,.9)] bg-white/45 text-[var(--muted)]'
                  "
                >
                  {{ link.badge }}
                </span>
              </button>
            </div>
          </div>

          <div class="grid gap-8 border-t border-[rgba(207,199,187,.95)] pt-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
            <div class="reveal-item space-y-3">
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">CIERRE / AVAILABILITY</p>
              <p class="max-w-[236px] leading-7 text-[var(--muted)]">Pocas colaboraciones. Buena dirección. Trabajo bien resuelto.</p>
            </div>
            <div class="reveal-item space-y-3">
              <h3 class="max-w-[680px] font-['Space_Grotesk'] text-[1.95rem] font-medium leading-[1.06] tracking-[-.04em]">
                Disponible para proyectos donde identidad, producto y ejecución importen por igual.
              </h3>
              <p class="text-base font-medium text-[var(--accent)]">Selective work. Clear direction. Real craft.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="motion" class="section-shell reveal-section relative isolate overflow-hidden bg-[var(--ink)] px-4 py-20 text-[var(--sand)]">
        <div class="section-aura section-aura-dark">
          <span class="ambient-orb ambient-orb-primary"></span>
          <span class="ambient-orb ambient-orb-secondary"></span>
          <span class="ambient-orb ambient-orb-soft"></span>
          <span class="ambient-ribbon ambient-ribbon-a"></span>
          <span class="ambient-ribbon ambient-ribbon-b"></span>
          <span class="ambient-mesh"></span>
        </div>
        <div class="relative z-10 mx-auto max-w-[1320px]">
          <div class="reveal-item max-w-[760px] space-y-4">
            <p class="font-['DM_Sans'] text-[12px] font-semibold uppercase tracking-[.24em] text-[var(--accent)]">MOTION / GSAP PREVIEW</p>
            <h2 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-.05em]">
              Estados futuros del portfolio
            </h2>
            <p class="max-w-[620px] text-lg leading-8 text-[rgba(243,239,231,.72)]">
              Secuencias visuales listas para llevar a entrada, scroll y hover con GSAP.
            </p>
          </div>
          <div class="mt-8 grid gap-5 lg:grid-cols-3 xl:grid-cols-5">
            <article
              v-for="[title, body] in motionCards"
              :key="title"
              class="motion-card rounded-[28px] border border-[rgba(207,199,187,.18)] bg-[rgba(243,239,231,.96)] p-5 text-[var(--ink)]"
              @mouseenter="hoverCard($event, true)"
              @mouseleave="hoverCard($event, false)"
            >
              <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">{{ title }}</p>
              <div class="mt-4 rounded-[18px] bg-[rgba(227,221,210,.78)] p-4">
                <div class="h-2 w-24 rounded-full bg-[var(--accent)]"></div>
                <div class="mt-3 h-4 w-44 rounded-full bg-[var(--ink)]"></div>
                <div class="mt-3 h-4 w-36 rounded-full bg-[rgba(30,30,27,.72)]"></div>
                <div class="mt-3 h-10 w-28 rounded-[16px] bg-[var(--earth)]"></div>
              </div>
              <p class="mt-4 text-[14px] leading-6 text-[var(--muted)]">{{ body }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-[rgba(207,199,187,.82)] bg-[rgba(243,239,231,.7)] px-4 py-10 backdrop-blur-xl">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,352px)_repeat(3,minmax(0,1fr))]">
          <div class="space-y-3">
            <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.16em]">facundo.dev</p>
            <p class="max-w-[352px] leading-7 text-[var(--muted)]">
              Diseñador y programador enfocado en producto, identidad y experiencia digital.
            </p>
          </div>
          <div v-for="column in footerColumns" :key="column.label" class="space-y-3">
            <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">{{ column.label }}</p>
            <div class="space-y-1 text-sm leading-7">
              <p v-for="item in column.items" :key="item">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 border-t border-[rgba(207,199,187,.82)] pt-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Portfolio / 2026</p>
          <p>Diseño y desarrollo con criterio visual.</p>
          <p>ES / EN</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.portfolio-app {
  --sand: #f3efe7;
  --sand-alt: #e3ddd2;
  --ink: #1e1e1b;
  --muted: #5e5a55;
  --accent: #7c8cff;
  --earth: #b6a48a;
}

.section-shell {
  position: relative;
}

.section-aura {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.section-aura-home {
  background:
    radial-gradient(circle at 78% 16%, rgba(124, 140, 255, .18), transparent 24%),
    radial-gradient(circle at 16% 82%, rgba(182, 164, 138, .16), transparent 20%),
    radial-gradient(circle at 52% 48%, rgba(255, 255, 255, .3), transparent 36%);
}

.section-aura-muted {
  background:
    radial-gradient(circle at 16% 18%, rgba(182, 164, 138, .18), transparent 20%),
    radial-gradient(circle at 84% 78%, rgba(124, 140, 255, .15), transparent 18%);
}

.section-aura-dark {
  background:
    radial-gradient(circle at 10% 10%, rgba(124, 140, 255, .14), transparent 20%),
    radial-gradient(circle at 88% 16%, rgba(182, 164, 138, .12), transparent 18%);
}

.ambient-orb,
.ambient-ribbon,
.ambient-mesh {
  position: absolute;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.ambient-orb {
  border-radius: 999px;
  filter: blur(10px);
  opacity: .78;
}

.ambient-orb-primary {
  top: 4%;
  right: 5%;
  width: 28rem;
  height: 28rem;
  background: radial-gradient(circle, rgba(124, 140, 255, .24) 0%, rgba(124, 140, 255, 0) 70%);
  animation: ambientFloatPrimary 18s ease-in-out infinite alternate;
}

.ambient-orb-secondary {
  bottom: 4%;
  left: 2%;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, rgba(182, 164, 138, .24) 0%, rgba(182, 164, 138, 0) 72%);
  animation: ambientFloatSecondary 22s ease-in-out infinite alternate;
}

.ambient-orb-soft {
  top: 34%;
  left: 38%;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(255, 255, 255, .28) 0%, rgba(255, 255, 255, 0) 72%);
  opacity: .55;
  animation: ambientFloatSoft 24s ease-in-out infinite alternate;
}

.ambient-ribbon {
  border-radius: 999px;
  opacity: .34;
  filter: blur(2px);
}

.ambient-ribbon-a {
  top: 14%;
  left: -10%;
  width: 36rem;
  height: 10rem;
  rotate: -18deg;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .4), rgba(255, 255, 255, 0));
  animation: ambientRibbonLeft 26s ease-in-out infinite alternate;
}

.ambient-ribbon-b {
  right: -8%;
  bottom: 10%;
  width: 30rem;
  height: 8rem;
  rotate: 16deg;
  background: linear-gradient(90deg, rgba(124, 140, 255, 0), rgba(124, 140, 255, .18), rgba(124, 140, 255, 0));
  animation: ambientRibbonRight 30s ease-in-out infinite alternate;
}

.ambient-mesh {
  inset: -10%;
  opacity: .16;
  background-image:
    linear-gradient(rgba(207, 199, 187, .32) 1px, transparent 1px),
    linear-gradient(90deg, rgba(207, 199, 187, .2) 1px, transparent 1px);
  background-size: 120px 120px;
  mask-image: radial-gradient(circle at center, black 28%, transparent 82%);
  animation: ambientMeshDrift 36s linear infinite;
}

.section-aura-muted .ambient-orb-primary {
  background: radial-gradient(circle, rgba(182, 164, 138, .22) 0%, rgba(182, 164, 138, 0) 70%);
}

.section-aura-muted .ambient-orb-secondary {
  background: radial-gradient(circle, rgba(124, 140, 255, .18) 0%, rgba(124, 140, 255, 0) 70%);
}

.section-aura-dark .ambient-orb-primary {
  background: radial-gradient(circle, rgba(124, 140, 255, .28) 0%, rgba(124, 140, 255, 0) 70%);
  opacity: .6;
}

.section-aura-dark .ambient-orb-secondary {
  background: radial-gradient(circle, rgba(182, 164, 138, .18) 0%, rgba(182, 164, 138, 0) 70%);
  opacity: .5;
}

.section-aura-dark .ambient-orb-soft {
  background: radial-gradient(circle, rgba(255, 255, 255, .1) 0%, rgba(255, 255, 255, 0) 72%);
  opacity: .35;
}

.section-aura-dark .ambient-ribbon-a {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .16), rgba(255, 255, 255, 0));
}

.section-aura-dark .ambient-ribbon-b {
  background: linear-gradient(90deg, rgba(124, 140, 255, 0), rgba(124, 140, 255, .22), rgba(124, 140, 255, 0));
}

.section-aura-dark .ambient-mesh {
  opacity: .12;
  background-image:
    linear-gradient(rgba(255, 255, 255, .08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .05) 1px, transparent 1px);
}

.glass-panel {
  background: rgba(243, 239, 231, .7);
  border: 1px solid rgba(207, 199, 187, .72);
  box-shadow: 0 18px 38px rgba(30, 30, 27, .08);
  backdrop-filter: blur(18px);
}

.glass-card {
  background: rgba(243, 239, 231, .82);
  border: 1px solid rgba(207, 199, 187, .72);
  box-shadow: 0 16px 32px rgba(30, 30, 27, .06);
  backdrop-filter: blur(16px);
}

.project-dark {
  background:
    radial-gradient(circle at top right, rgba(124, 140, 255, .12), transparent 28%),
    #1e1e1b;
  border: 1px solid rgba(243, 239, 231, .12);
  box-shadow: 0 22px 46px rgba(30, 30, 27, .24);
  color: var(--sand);
}

.field-card {
  display: flex;
  flex-direction: column;
  gap: .65rem;
  border: 1px solid rgba(207, 199, 187, .76);
  border-radius: 18px;
  background: rgba(243, 239, 231, .78);
  padding: 1rem 1.1rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3);
}

.field-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
}

.field-input {
  border: 0;
  background: transparent;
  color: var(--ink);
  outline: none;
}

.field-input::placeholder {
  color: var(--muted);
}

@keyframes ambientFloatPrimary {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(-42px, 28px, 0) scale(1.08);
  }
}

@keyframes ambientFloatSecondary {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(36px, -26px, 0) scale(.92);
  }
}

@keyframes ambientFloatSoft {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(-24px, 20px, 0) scale(1.06);
  }
}

@keyframes ambientRibbonLeft {
  0% {
    transform: translate3d(0, 0, 0) rotate(-18deg);
  }
  100% {
    transform: translate3d(44px, -10px, 0) rotate(-10deg);
  }
}

@keyframes ambientRibbonRight {
  0% {
    transform: translate3d(0, 0, 0) rotate(16deg);
  }
  100% {
    transform: translate3d(-36px, 14px, 0) rotate(24deg);
  }
}

@keyframes ambientMeshDrift {
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: 140px 90px, -140px 70px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-orb,
  .ambient-ribbon,
  .ambient-mesh {
    animation: none !important;
  }
}

@media (max-width: 767px) {
  .ambient-orb-primary,
  .ambient-orb-secondary,
  .ambient-orb-soft {
    width: 16rem;
    height: 16rem;
  }

  .ambient-ribbon-a,
  .ambient-ribbon-b {
    width: 18rem;
  }

  .ambient-mesh {
    opacity: .1;
    background-size: 88px 88px;
  }
}
</style>
