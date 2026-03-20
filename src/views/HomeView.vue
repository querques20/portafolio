<script setup>
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { heroLines, heroTags, pillars, previewProjects } from '../content/portfolio'
import { usePageIntro } from '../composables/usePageIntro'

const router = useRouter()
const navigateToRoute = inject('navigateToRoute', (name) => router.push({ name }))
const { pageRoot } = usePageIntro()

const heroWordLines = computed(() =>
  heroLines.map((line, lineIndex) =>
    line.split(' ').map((word, wordIndex) => ({
      key: `${lineIndex}-${word}-${wordIndex}`,
      label: word,
      direction: (lineIndex + wordIndex) % 2 === 0 ? 'left' : 'right',
    }))
  )
)
</script>

<template>
  <section ref="pageRoot" class="route-page px-4 pb-20 pt-4 md:pb-22 md:pt-6">
    <div class="mx-auto flex max-w-[1200px] flex-col gap-20">
      <div class="flex flex-col items-center gap-8 py-4 text-center md:py-8">
        <div class="space-y-1">
          <h1
            class="hero-title mx-auto max-w-[980px] font-['Space_Grotesk'] text-[clamp(3.1rem,7vw,4.8rem)] leading-[.94] tracking-[-.06em]"
          >
            <span
              v-for="(lineWords, index) in heroWordLines"
              :key="heroLines[index]"
              class="page-title-wrap hero-title-line-wrap block"
            >
              <span class="page-title-line block text-center" :class="index === 1 ? 'font-medium' : 'font-bold'" data-hero-line>
                <span class="hero-title-word-row">
                  <span
                    v-for="word in lineWords"
                    :key="word.key"
                    class="hero-word"
                    :data-hero-word-direction="word.direction"
                    data-hero-word
                  >
                    {{ word.label }}
                  </span>
                </span>
              </span>
            </span>
          </h1>
        </div>

        <p class="max-w-[620px] text-[1.15rem] leading-8 text-[var(--muted)]" data-reveal>
          Estoy terminando una formación intensiva Full Stack y buscando mis primeras oportunidades para aportar compromiso real en proyectos web.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3" data-reveal>
          <button
            type="button"
            class="rounded-full bg-[var(--ink)] px-6 py-4 font-['DM_Sans'] text-sm font-bold tracking-[.06em] text-[var(--sand)] shadow-[0_18px_32px_rgba(30,30,27,.18)]"
            @click="navigateToRoute('projects')"
          >
            Ver proyectos
          </button>
          <button
            type="button"
            class="rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.75)] px-6 py-4 font-['DM_Sans'] text-sm font-bold tracking-[.06em]"
            @click="navigateToRoute('about')"
          >
            Sobre mí
          </button>
        </div>

        <div
          class="inline-flex w-fit flex-wrap items-center justify-center gap-3 rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(243,239,231,.72)] px-4 py-3 shadow-[0_16px_32px_rgba(30,30,27,.06)]"
          data-reveal
        >
          <template v-for="(tag, index) in heroTags" :key="tag">
            <span class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.16em] text-[var(--muted)]">{{ tag }}</span>
            <span v-if="index < heroTags.length - 1" class="h-1 w-1 rounded-full bg-[var(--earth)]"></span>
          </template>
        </div>
      </div>

      <section class="glass-panel rounded-[32px] p-6 md:p-9" data-card>
        <div class="space-y-4" data-reveal>
          <h2 class="max-w-[700px] font-['Space_Grotesk'] text-[clamp(2rem,4.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-.05em]">
            Una breve selección del tipo de proyectos en los que me gusta trabajar.
          </h2>
          <div class="section-divider" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="mt-8 grid gap-6 lg:grid-cols-3">
          <article
            v-for="project in previewProjects"
            :key="project.title"
            class="glass-card lift-card rounded-[24px] p-5"
            data-card
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

      <section class="glass-panel rounded-[32px] p-6 md:p-9" data-card>
        <div class="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-24">
          <div class="space-y-4" data-reveal>
            <p class="font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">PRIMERA ETAPA / PERFIL</p>
            <p class="max-w-[236px] leading-7 text-[var(--muted)]">
              Estoy construyendo experiencia real mientras estudio, practico y sigo mejorando proyecto a proyecto.
            </p>
          </div>
          <div class="space-y-4" data-reveal>
            <h2 class="max-w-[700px] font-['Space_Grotesk'] text-[clamp(2.1rem,4.8vw,2.7rem)] font-medium leading-[1.04] tracking-[-.05em]">
              Busco proyectos donde pueda sumar trabajo serio, criterio y muchas ganas de crecer.
            </h2>
            <p class="max-w-[620px] text-lg leading-8 text-[var(--muted)]">
              Me interesa involucrarme, aprender rápido y responder bien desde el primer encargo, tanto en WordPress como en stacks modernos de front-end y back-end.
            </p>
            <p class="text-base font-medium text-[var(--accent)]">Primeras oportunidades, compromiso real y mejora constante.</p>
          </div>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <article v-for="[title, body, accent] in pillars" :key="title" class="border-t border-[rgba(207,199,187,.92)] pt-5" data-card>
            <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em]" :style="{ color: accent }">{{ title }}</p>
            <p class="mt-3 max-w-[300px] leading-7">{{ body }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  width: fit-content;
}

.hero-title-line-wrap {
  width: 100%;
}

.hero-title-word-row {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.14em;
}

.hero-word {
  display: inline-block;
  will-change: transform, opacity;
}

.section-divider {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
  max-width: 720px;
}

.section-divider span {
  display: block;
  height: 1px;
  background: rgba(196, 186, 171, 0.9);
}

@media (max-width: 767px) {
  .section-divider {
    grid-template-columns: 1fr;
    max-width: 180px;
  }

  .section-divider span:nth-child(n + 2) {
    display: none;
  }
}

</style>
