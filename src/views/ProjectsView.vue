<script setup>
import { projectDetails } from '../content/portfolio'
import { usePageIntro } from '../composables/usePageIntro'

const { pageRoot } = usePageIntro()
</script>

<template>
  <section ref="pageRoot" class="route-page px-4 pb-18 pt-4 md:pb-20 md:pt-6">
    <div class="mx-auto flex max-w-[1200px] flex-col gap-10">
      <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24">
        <div class="space-y-5" data-reveal>
          <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">03 / PROYECTOS</p>
          <h1 class="font-['Space_Grotesk'] text-[clamp(2.6rem,5vw,3.7rem)] font-bold leading-[.96] tracking-[-.05em]">
            <span class="page-title-wrap"><span class="page-title-line">Proyectos</span></span>
          </h1>
          <div class="h-[3px] w-[72px] rounded-full bg-[var(--earth)]"></div>
        </div>

        <div class="space-y-4" data-reveal>
          <h2 class="max-w-[740px] font-['Space_Grotesk'] text-[clamp(2.1rem,4.8vw,3.1rem)] font-medium leading-[1.02] tracking-[-.05em]">
            <span class="page-title-wrap"><span class="page-title-line">Una muestra de cómo trabajo identidad, estructura y experiencia digital.</span></span>
          </h2>
          <p class="text-base font-medium text-[var(--muted)]">Una selección entre e-commerce, producto digital y servicios.</p>
        </div>
      </div>

      <article class="glass-panel rounded-[32px] p-6 md:p-8" data-card>
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
              <p class="text-[13px] font-medium leading-5 text-[var(--muted)]">Tienda online con identidad visual</p>
            </div>
          </div>
          <div class="flex flex-col justify-between gap-6">
            <div class="space-y-4" data-reveal>
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">01</p>
              <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">E-commerce / marca digital</p>
              <p class="text-base font-medium text-[var(--accent)]">e-commerce con dirección visual</p>
              <h3 class="max-w-[320px] font-['Space_Grotesk'] text-[clamp(2.8rem,5vw,3.4rem)] font-bold leading-[.96] tracking-[-.05em]">Latido Cerámico</h3>
              <p class="max-w-[380px] text-[1.08rem] leading-8 text-[var(--muted)]">
                Proyecto de e-commerce enfocado en una presentación de producto más cálida, visual y fácil de recorrer.
              </p>
            </div>
            <div class="space-y-4">
              <div class="flex flex-wrap gap-3 border-t border-[rgba(207,199,187,.95)] pt-4">
                <span v-for="tag in projectDetails[0].tags" :key="tag" class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                  {{ tag }}
                </span>
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
        <article class="project-dark rounded-[30px] p-8" data-card>
          <div class="flex h-full flex-col gap-7">
            <div class="space-y-4" data-reveal>
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">02 / NIGHTPREP</p>
              <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--earth)]">App / producto digital</p>
              <p class="text-base font-medium text-[var(--accent)]">concepto de producto digital</p>
              <h3 class="font-['Space_Grotesk'] text-[clamp(2.6rem,4.4vw,3.1rem)] font-bold leading-[.96] tracking-[-.05em]">NightPrep</h3>
              <p class="max-w-[460px] text-[1.06rem] leading-8 text-[rgba(243,239,231,.78)]">
                Concepto de app para descubrir boliches, bares y eventos desde una interfaz apoyada en mapa, contexto rápido y exploración visual.
              </p>
            </div>
            <div class="relative overflow-hidden rounded-[22px]">
              <img src="/portfolio/nightprep.png" alt="Proyecto NightPrep" loading="lazy" decoding="async" data-visual class="h-[320px] w-full object-cover" />
            </div>
            <div class="flex flex-wrap gap-3 border-t border-[rgba(243,239,231,.16)] pt-4">
              <span v-for="tag in projectDetails[1].tags" :key="tag" class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.14em] text-[rgba(243,239,231,.78)]">
                {{ tag }}
              </span>
            </div>
          </div>
        </article>

        <article class="glass-panel rounded-[30px] p-8" data-card>
          <div class="flex h-full flex-col gap-6">
            <div class="relative overflow-hidden rounded-[22px]">
              <img src="/portfolio/pulid-car.png" alt="Proyecto Pulid Car" loading="lazy" decoding="async" data-visual class="h-[228px] w-full object-cover" />
            </div>
            <div class="space-y-3" data-reveal>
              <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">03 / PULID CAR</p>
              <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Marca de servicios / identidad comercial</p>
              <p class="text-base font-medium text-[var(--accent)]">identidad y presencia digital</p>
              <h3 class="font-['Space_Grotesk'] text-[2.6rem] font-bold leading-[.98] tracking-[-.05em]">Pulid Car</h3>
              <p class="leading-8 text-[var(--muted)]">
                Identidad visual y presencia digital para un servicio de restauración de ópticas, buscando verse claro, confiable y directo.
              </p>
            </div>
            <div class="flex flex-wrap gap-3 border-t border-[rgba(207,199,187,.95)] pt-4">
              <span v-for="tag in projectDetails[2].tags" :key="tag" class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
