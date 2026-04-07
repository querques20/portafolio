<script setup>
import { aboutCards, steps, tools } from '../content/portfolio'
import { usePageIntro } from '../composables/usePageIntro'

const { pageRoot } = usePageIntro()
</script>

<template>
  <section ref="pageRoot" class="route-page px-4 pb-18 pt-4 md:pb-20 md:pt-6">
    <div class="mx-auto flex max-w-[1200px] flex-col gap-14 md:gap-16">
      <div class="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
        <div class="space-y-6" data-reveal>
          <div class="space-y-5">
            <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">02 / SOBRE MÍ</p>
            <h1 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.7rem)] font-bold leading-[.96] tracking-[-.05em]">
              <span class="page-title-wrap"><span class="page-title-line">Sobre mí</span></span>
            </h1>
            <div class="h-[3px] w-[72px] rounded-full bg-[var(--earth)]"></div>
            <p class="max-w-[230px] text-base font-medium leading-7 text-[var(--muted)]">Formación Full Stack, práctica constante y compromiso real.</p>
          </div>

          <div class="glass-panel overflow-hidden rounded-[30px] p-4" data-card>
            <div class="overflow-hidden rounded-[22px]">
              <img
                src="/portfolio/facundo-workspace.jpeg"
                alt="Facundo trabajando en su setup"
                width="800"
                height="360"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                data-visual
                class="h-[360px] w-full object-cover"
              />
            </div>
            <div class="mt-3 w-fit rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.82)] px-4 py-3 shadow-[0_14px_28px_rgba(30,30,27,.08)]">
              <p class="font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[.18em]">FACUNDO</p>
              <p class="text-[13px] font-medium leading-5 text-[var(--muted)]">Desarrollador Full Stack</p>
            </div>
          </div>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
            Buenos Aires · desarrollo web
          </p>
          <div class="h-[3px] w-[72px] rounded-full bg-[var(--accent)]"></div>
        </div>

        <div class="space-y-8" data-reveal>
          <p class="invisible font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em]" aria-hidden="true">02 / SOBRE MÍ</p>
          <h2 class="max-w-[740px] font-['Space_Grotesk'] text-[clamp(2.2rem,4.8vw,3.4rem)] font-medium leading-[1.02] tracking-[-.05em]">
            <span class="page-title-wrap"><span class="page-title-line">Formación constante, práctica real y ganas de seguir creciendo.</span></span>
          </h2>
          <div class="max-w-[760px] space-y-6 text-[1.08rem] leading-8 text-[var(--muted)] md:text-[1.14rem] md:leading-9">
            <p>
              Soy Facundo Luciano Alvarez, aunque en internet me muevo como querque.dev. Hace casi dos años empecé a estudiar desarrollo web de manera intensiva, impulsado por mi interés por las computadoras y por la posibilidad de construir cosas reales con ellas.
            </p>
            <p>
              Hoy estoy cursando una carrera acelerada de 2 años de Desarrollador Full Stack en Escuela Da Vinci. En ese recorrido también obtuve una beca por promedio, algo que me dio todavía más impulso para seguir con la misma exigencia.
            </p>
            <p>
              Actualmente trabajo en PedidosYa para sostener este camino mientras diseño y desarrollo sitios web para clientes de distintos rubros. Busco consolidar mi carrera con el primer rol formal en una empresa donde pueda aportar y crecer de verdad.
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-4 md:gap-7 xl:gap-8">
        <article v-for="[title, body, accent] in aboutCards" :key="title" class="glass-card rounded-[24px] p-6 md:p-7" data-card>
          <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: accent }">{{ title }}</p>
          <p class="mt-5 max-w-[240px] text-lg leading-8">{{ body }}</p>
        </article>
      </div>

      <div class="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
        <aside class="glass-card rounded-[24px] p-6 md:p-7" data-card>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">STACK / HERRAMIENTAS</p>
          <p class="mt-6 max-w-[240px] leading-8 text-[var(--muted)]">Tecnologías y stacks con los que estudio, practico y construyo proyectos web completos.</p>
        </aside>

        <section class="glass-panel rounded-[30px] p-8 md:p-10" data-card>
          <h3 class="max-w-[520px] font-['Space_Grotesk'] text-[2.2rem] font-medium leading-[1.04] tracking-[-.04em]" data-reveal>
            Herramientas con las que estoy construyendo mi perfil full stack.
          </h3>
          <div class="mt-8 flex flex-wrap gap-3">
            <span
              v-for="tool in tools"
              :key="tool.name"
              class="inline-flex items-center gap-2 rounded-full border px-4 py-3 font-['DM_Sans'] text-[13px] font-bold tracking-[.04em] shadow-[0_10px_22px_rgba(30,30,27,.05)]"
              :class="tool.studying
                ? 'border-[rgba(124,140,255,.25)] bg-[rgba(124,140,255,.06)]'
                : 'border-[rgba(207,199,187,.95)] bg-[rgba(243,239,231,.82)]'"
              data-card
            >
              {{ tool.name }}
              <span
                v-if="tool.studying"
                class="rounded-full bg-[rgba(124,140,255,.15)] px-2 py-0.5 font-['DM_Sans'] text-[9px] font-bold uppercase tracking-[.14em] text-[var(--accent)]"
              >Estudiando</span>
            </span>
          </div>
        </section>
      </div>

      <div class="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
        <aside class="glass-card rounded-[24px] p-6 md:p-7" data-card>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">MÉTODO / PROCESO</p>
          <p class="mt-6 max-w-[228px] leading-8 text-[var(--muted)]">Mi forma de trabajar en cada proyecto.</p>
        </aside>

        <section class="glass-panel rounded-[30px] p-8 md:p-10" data-card>
          <h3 class="max-w-[620px] font-['Space_Grotesk'] text-[1.95rem] font-medium leading-[1.06] tracking-[-.04em]" data-reveal>
            Compromiso, orden y ganas de responder bien.
          </h3>
          <div class="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
            <article v-for="[title, body, accent] in steps" :key="title" class="border-t border-[rgba(207,199,187,.95)] pt-6" data-card>
              <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: accent }">{{ title }}</p>
              <p class="mt-4 max-w-[260px] leading-8">{{ body }}</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
