<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { milestones } from '../content/portfolio'

const root = ref(null)
let ctx

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.tl-milestone', root.value)
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        x: -36,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 84%',
        },
      })
    })

    gsap.from('.tl-track-fill', {
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 60%',
        end: 'bottom 55%',
        scrub: 0.8,
      },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="root" class="tl-root">
    <div class="tl-track" aria-hidden="true">
      <div class="tl-track-fill" />
    </div>

    <div
      v-for="ms in milestones"
      :key="ms.id"
      class="tl-milestone"
      :class="{ 'tl-milestone-now': ms.isNow }"
    >
      <!-- dot -->
      <div class="tl-dot" aria-hidden="true">
        <div class="tl-dot-ring" />
      </div>

      <!-- card -->
      <div class="tl-card glass-panel">
        <span class="tl-num" aria-hidden="true">{{ ms.num }}</span>

        <p class="tl-year">
          <span class="tl-year-dot" aria-hidden="true" />
          {{ ms.year }}
        </p>

        <h3 class="tl-title">{{ ms.title }}</h3>
        <p class="tl-body">{{ ms.body }}</p>

        <span v-if="ms.tag && !ms.isNow" class="tl-tag">{{ ms.tag }}</span>

        <span v-if="ms.isNow" class="tl-open-badge">
          <span class="tl-open-dot" aria-hidden="true" />
          Open to work · disponible ahora
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tl-root {
  position: relative;
}

/* ── track ── */
.tl-track {
  position: absolute;
  left: 11px;
  top: 28px;
  bottom: 0;
  width: 1px;
  background: rgba(207, 199, 187, 0.55);
}

.tl-track-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--accent) 0%, rgba(124, 140, 255, 0.22) 100%);
  box-shadow: 0 0 12px rgba(124, 140, 255, 0.45);
  transform-origin: top center;
}

/* ── milestone row ── */
.tl-milestone {
  display: grid;
  grid-template-columns: 24px 1fr;
  column-gap: 32px;
  padding-bottom: 44px;
}

/* ── dot ── */
.tl-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--sand);
  border: 2px solid rgba(207, 199, 187, 0.9);
  margin-top: 6px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  transition: border-color 0.45s ease, box-shadow 0.45s ease, background 0.45s ease;
}

.tl-milestone-now .tl-dot {
  width: 28px;
  height: 28px;
  margin-top: 4px;
  background: linear-gradient(135deg, var(--accent), #a78bfa);
  border: none;
  box-shadow:
    0 0 0 6px rgba(124, 140, 255, 0.1),
    0 0 28px rgba(124, 140, 255, 0.5);
}

.tl-dot-ring {
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  border: 1px solid rgba(124, 140, 255, 0.4);
  animation: tl-ring 2.8s ease-out infinite;
}

.tl-milestone-now .tl-dot-ring {
  inset: -9px;
  border-color: rgba(124, 140, 255, 0.55);
}

@keyframes tl-ring {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.8); opacity: 0;    }
}

/* ── card ── */
.tl-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 28px 32px;
}

.tl-milestone-now .tl-card {
  background: rgba(124, 140, 255, 0.06) !important;
  border-color: rgba(124, 140, 255, 0.28) !important;
}

.tl-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 0% 0%, rgba(124, 140, 255, 0.07) 0%, transparent 55%);
  pointer-events: none;
}

/* ── big number decoration ── */
.tl-num {
  position: absolute;
  right: 24px;
  top: 16px;
  font-size: 88px;
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: rgba(124, 140, 255, 0.09);
  pointer-events: none;
  user-select: none;
}

/* ── year label ── */
.tl-year {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}

.tl-year-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

/* ── title + body ── */
.tl-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: var(--ink);
  margin-bottom: 10px;
}

.tl-body {
  font-size: 14.5px;
  line-height: 1.82;
  color: var(--muted);
  max-width: 520px;
}

/* ── tag ── */
.tl-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  background: rgba(243, 239, 231, 0.9);
  border: 1px solid rgba(207, 199, 187, 0.95);
  border-radius: 100px;
  padding: 6px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  box-shadow: 0 6px 14px rgba(30, 30, 27, 0.05);
}

/* ── open to work ── */
.tl-open-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.28);
  border-radius: 100px;
  padding: 8px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #34d399;
}

.tl-open-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 7px rgba(52, 211, 153, 0.7);
  animation: tl-blink 1.4s ease-in-out infinite;
}

@keyframes tl-blink {
  0%, 100% { opacity: 1;    }
  50%       { opacity: 0.2; }
}

@media (prefers-reduced-motion: reduce) {
  .tl-dot-ring { animation: none; }
  .tl-open-dot { animation: none; }
}
</style>
