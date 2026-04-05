<script setup>
import { inject, reactive } from 'vue'
import { contactLinks, email } from '../content/portfolio'
import { usePageIntro } from '../composables/usePageIntro'

const navigateToRoute = inject('navigateToRoute')
const { pageRoot } = usePageIntro()

const form = reactive({ name: '', email: '', project: '', message: '' })

const submitInquiry = () => {
  const subject = encodeURIComponent(`Consulta portfolio - ${form.project || 'Proyecto digital'}`)
  const body = encodeURIComponent(
    [`Nombre: ${form.name || '-'}`, `Email: ${form.email || '-'}`, `Tipo: ${form.project || '-'}`, '', form.message || '-'].join('\n')
  )

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
}

const openLink = (link) => {
  if (link.type === 'route' && link.routeName) return navigateToRoute(link.routeName)
  if (link.type === 'mailto' && link.href) return (window.location.href = link.href)
  if (!link.href) return

  window.open(link.href, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section ref="pageRoot" class="route-page px-4 pb-18 pt-4 md:pb-20 md:pt-6">
    <div class="mx-auto flex max-w-[1200px] flex-col gap-10">
      <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
        <div class="space-y-5" data-reveal>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">03 / CONTACTO</p>
          <h1 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.7rem)] font-bold leading-[.96] tracking-[-.05em]">
            <span class="page-title-wrap"><span class="page-title-line">Contacto</span></span>
          </h1>
          <div class="h-[3px] w-[72px] rounded-full bg-[var(--earth)]"></div>
          <p class="max-w-[240px] text-base font-medium leading-7 text-[var(--muted)]">Disponible para nuevos proyectos, colaboraciones y trabajos web donde pueda aportar de verdad.</p>
        </div>

        <div class="space-y-5" data-reveal>
          <h2 class="max-w-[740px] font-['Space_Grotesk'] text-[clamp(2.1rem,4.8vw,3rem)] font-medium leading-[1.02] tracking-[-.05em]">
            <span class="page-title-wrap"><span class="page-title-line">Si necesitás a alguien comprometido para sumarse a un sitio o desarrollo web, me interesa hablar.</span></span>
          </h2>
          <p class="max-w-[660px] text-[1.12rem] leading-8 text-[var(--muted)]">
            Ya tengo proyectos reales entregados y busco consolidar mi carrera en tech. Me involucro de verdad, respondo bien y sigo mejorando proyecto a proyecto.
          </p>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
        <aside class="glass-card rounded-[24px] p-5" data-card>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">CONSULTA / CONTACTO</p>
          <p class="mt-5 max-w-[228px] leading-7 text-[var(--muted)]">Si tenés una idea clara o una necesidad puntual, contame el contexto. Estoy disponible para proyectos freelance y colaboraciones.</p>
        </aside>

        <form class="glass-panel rounded-[30px] p-7" data-card @submit.prevent="submitInquiry">
          <div class="space-y-3" data-reveal>
            <h3 class="font-['Space_Grotesk'] text-[1.95rem] font-medium tracking-[-.04em]">Dejá tu consulta</h3>
            <p class="leading-7 text-[var(--muted)]">Nombre, mail y una idea breve de lo que necesitás.</p>
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
            <p class="leading-7 text-[var(--muted)]">Suelo responder con contexto, tiempos y próximos pasos. ES / EN.</p>
            <button type="submit" class="rounded-full bg-[var(--ink)] px-6 py-4 font-['DM_Sans'] text-sm font-bold tracking-[.06em] text-[var(--sand)] shadow-[0_18px_32px_rgba(30,30,27,.18)]">
              Enviar consulta
            </button>
          </div>
        </form>
      </div>

      <div class="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        <article class="glass-panel rounded-[28px] p-8" data-card>
          <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">DIRECTO</p>
          <a
            :href="`mailto:${email}`"
            class="mt-5 block font-['Space_Grotesk'] text-[clamp(1.1rem,1.55vw,1.42rem)] font-medium leading-[1.1] tracking-[-.03em] [overflow-wrap:anywhere] hover:text-[var(--accent)]"
          >
            {{ email }}
          </a>
          <p class="mt-5 whitespace-pre-line text-[1.05rem] leading-8 text-[var(--muted)]">
            Buenos Aires / Remoto
            ES / EN
            Proyectos y colaboraciones
          </p>
        </article>

        <div class="divide-y divide-[rgba(207,199,187,.95)] rounded-[28px] border border-[rgba(207,199,187,.7)] bg-[rgba(243,239,231,.55)] px-6 backdrop-blur-xl" data-card>
          <button
            v-for="link in contactLinks"
            :key="link.title"
            type="button"
            class="flex w-full items-start justify-between gap-5 py-6 text-left transition-colors duration-300"
            :class="link.href || link.routeName ? 'hover:text-[var(--accent)]' : 'cursor-not-allowed opacity-70'"
            :disabled="!link.href && !link.routeName"
            @click="openLink(link)"
          >
            <div class="max-w-[30rem]">
              <span class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">{{ link.title }}</span>
              <span class="mt-2 block text-[1.05rem] leading-7">{{ link.body }}</span>
            </div>
            <span
              class="shrink-0 rounded-full border px-3 py-2 font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[.16em]"
              :class="
                link.href || link.routeName
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
        <div class="space-y-3" data-reveal>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">CIERRE / DISPONIBILIDAD</p>
          <p class="max-w-[236px] leading-7 text-[var(--muted)]">Hoy estoy disponible para nuevas oportunidades profesionales y proyectos freelance bien planteados.</p>
        </div>
        <div class="space-y-3" data-reveal>
          <h3 class="max-w-[680px] font-['Space_Grotesk'] text-[1.95rem] font-medium leading-[1.06] tracking-[-.04em]">
            Si hay una oportunidad seria para trabajar y crecer, tengo proyectos reales entregados y estoy listo para dar más.
          </h3>
          <p class="text-base font-medium text-[var(--accent)]">Trabajo real entregado, compromiso constante y mejora continua.</p>
        </div>
      </div>
    </div>
  </section>
</template>
