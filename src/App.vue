<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { email, footerColumns, navItems } from './content/portfolio'
import WaveGrid from './components/WaveGrid.vue'
import CustomCursor from './components/CustomCursor.vue'

const route = useRoute()
const router = useRouter()

const routeViewport = ref(null)
const activeRouteName = computed(() => route.name ?? 'home')
const isDesktopNavVisible = ref(false)
const hasHomeIntroCompleted = ref(false)
const isRouteTransitioning = ref(false)
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => { mobileMenuOpen.value = !mobileMenuOpen.value }
const closeMobileMenu  = () => { mobileMenuOpen.value = false }

const routeOrderByName = Object.fromEntries(navItems.map((item) => [item.name, item.order]))

let skipNextRouteEnterAnimation = false

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isDesktopNavEnabled = () => window.innerWidth >= 768 && window.matchMedia('(pointer: fine)').matches
const shouldUseLateralRouteTransition = () => window.innerWidth >= 768 && !prefersReducedMotion()

const tweenTo = (target, vars) =>
  new Promise((resolve) => {
    gsap.to(target, {
      ...vars,
      onComplete: resolve,
    })
  })

const showDesktopNav = () => {
  isDesktopNavVisible.value = true
}

const hideDesktopNav = () => {
  isDesktopNavVisible.value = false
}

const syncDesktopNavVisibility = () => {
  if (!isDesktopNavEnabled() || route.name !== 'home' || prefersReducedMotion() || hasHomeIntroCompleted.value) {
    showDesktopNav()
    return
  }

  if (isRouteTransitioning.value) {
    showDesktopNav()
    return
  }

  hideDesktopNav()
}

const handlePageIntroComplete = () => {
  hasHomeIntroCompleted.value = true
  showDesktopNav()
}

const getRouteDirection = (nextName, currentName) => {
  const nextOrder = routeOrderByName[nextName] ?? 0
  const currentOrder = routeOrderByName[currentName] ?? 0

  if (nextOrder === currentOrder) return 1

  return nextOrder > currentOrder ? 1 : -1
}

const animateRouteIn = async (direction) => {
  if (!routeViewport.value || !shouldUseLateralRouteTransition()) {
    if (routeViewport.value) gsap.set(routeViewport.value, { clearProps: 'transform,opacity' })
    return
  }

  gsap.set(routeViewport.value, { x: `${direction * 72}px`, opacity: 0 })
  await tweenTo(routeViewport.value, {
    x: '0px',
    opacity: 1,
    duration: 0.58,
    ease: 'power3.out',
  })
  gsap.set(routeViewport.value, { clearProps: 'transform,opacity' })
}

const animateRouteOut = async (direction) => {
  if (!routeViewport.value || !shouldUseLateralRouteTransition()) return

  await tweenTo(routeViewport.value, {
    x: `${direction * -56}px`,
    opacity: 0,
    duration: 0.22,
    ease: 'power2.in',
  })
}

const navigateToRoute = async (name) => {
  closeMobileMenu()
  if (isRouteTransitioning.value) return

  if (route.name === name) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    return
  }

  const direction = getRouteDirection(name, route.name)

  isRouteTransitioning.value = true
  showDesktopNav()

  try {
    await animateRouteOut(direction)
    skipNextRouteEnterAnimation = true
    await router.push({ name })
    await nextTick()
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    await animateRouteIn(direction)
  } finally {
    isRouteTransitioning.value = false
    syncDesktopNavVisibility()
  }
}

provide('navigateToRoute', navigateToRoute)

watch(
  () => route.name,
  async (nextName, previousName) => {
    if (nextName !== 'home') {
      showDesktopNav()
    } else if (!previousName) {
      syncDesktopNavVisibility()
    }

    if (!previousName || skipNextRouteEnterAnimation) {
      skipNextRouteEnterAnimation = false
      return
    }

    await nextTick()
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    await animateRouteIn(getRouteDirection(nextName, previousName))
  }
)

onMounted(() => {
  syncDesktopNavVisibility()
  window.addEventListener('portfolio:intro-complete', handlePageIntroComplete)
  window.addEventListener('resize', syncDesktopNavVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('portfolio:intro-complete', handlePageIntroComplete)
  window.removeEventListener('resize', syncDesktopNavVisibility)
})
</script>

<template>
  <div class="portfolio-app bg-[var(--sand-alt)] text-[var(--ink)]">
    <CustomCursor />
    <WaveGrid />

    <header class="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-6">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-3">
        <div
          class="hero-nav-shell"
          :class="isDesktopNavVisible ? 'nav-shell-visible' : 'nav-shell-hidden'"
        >
          <nav
            class="hero-nav pointer-events-auto flex items-center justify-between gap-4 rounded-full border-[rgba(207,199,187,.88)] bg-white px-4 py-3 backdrop-blur-xl shadow-[0_18px_40px_rgba(30,30,27,.08)]"
          >
            <button type="button" aria-label="Volver al inicio" class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.18em]" @click="navigateToRoute('home')">
              querque.dev
            </button>

            <div class="hidden items-center gap-2 md:flex">
              <button
                v-for="item in navItems"
                :key="item.name"
                type="button"
                :aria-current="activeRouteName === item.name ? 'page' : undefined"
                class="rounded-full px-4 py-2 font-['DM_Sans'] text-[12px] font-bold uppercase tracking-[.18em] transition-all duration-300"
                :class="activeRouteName === item.name ? 'bg-[rgba(227,221,210,.9)] text-[var(--ink)]' : 'text-[var(--muted)] hover:bg-[rgba(227,221,210,.62)] hover:text-[var(--ink)]'"
                @click="navigateToRoute(item.name)"
              >
                {{ item.label }}
              </button>
              <span class="rounded-full bg-[rgba(124,140,255,.12)] px-4 py-2 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.22em] text-[var(--accent)]">
                ES / EN
              </span>
            </div>

            <!-- hamburger button (mobile only) -->
            <button
              type="button"
              :aria-label="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
              class="hamburger-btn pointer-events-auto md:hidden"
              :class="{ 'is-open': mobileMenuOpen }"
              @click="toggleMobileMenu"
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- mobile menu overlay -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-40 flex flex-col justify-center px-6 md:hidden"
        style="background: rgba(243,239,231,0.97); backdrop-filter: blur(24px);"
        @click.self="closeMobileMenu"
      >
        <nav class="flex flex-col gap-2">
          <button
            v-for="item in navItems"
            :key="`overlay-${item.name}`"
            type="button"
            :aria-current="activeRouteName === item.name ? 'page' : undefined"
            class="w-full rounded-[20px] px-6 py-5 text-left font-['Space_Grotesk'] text-[2rem] font-bold tracking-[-.04em] transition-all duration-200"
            :class="activeRouteName === item.name ? 'text-[var(--accent)]' : 'text-[var(--ink)] hover:text-[var(--accent)]'"
            @click="navigateToRoute(item.name)"
          >
            {{ item.label }}
          </button>
        </nav>
        <div class="mt-10 border-t border-[rgba(207,199,187,.72)] pt-8">
          <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.22em] text-[var(--muted)]">querque.dev · Buenos Aires</p>
        </div>
      </div>
    </Transition>

    <main class="pt-28 md:pt-24">
      <div ref="routeViewport" class="route-stage route-viewport">
        <RouterView />
      </div>
    </main>

    <footer class="border-t border-[rgba(196,186,171,.82)] bg-[rgba(227,221,210,.82)] px-4 py-10 backdrop-blur-xl">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,352px)_repeat(3,minmax(0,1fr))]">
          <div class="space-y-3">
            <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.16em]">querque.dev</p>
            <p class="max-w-[352px] leading-7 text-[var(--muted)]">
              Desarrollador full stack. Estudio, práctica constante y compromiso real en cada proyecto.
            </p>
          </div>

          <div v-for="column in footerColumns" :key="column.label" class="space-y-3">
            <p class="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">{{ column.label }}</p>
            <div class="space-y-1 text-sm leading-7">
              <template v-for="item in column.items" :key="typeof item === 'string' ? item : item.text">
                <button
                  v-if="typeof item === 'object'"
                  type="button"
                  class="block text-left hover:text-[var(--accent)] transition-colors duration-200"
                  @click="navigateToRoute(item.route)"
                >{{ item.text }}</button>
                <p v-else>{{ item }}</p>
              </template>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3 border-t border-[rgba(207,199,187,.82)] pt-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Portfolio / 2026</p>
          <p>Proyectos reales, aprendizaje constante y trabajo serio.</p>
          <p>{{ email }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.portfolio-app {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  --sand: #f3efe7;
  --sand-alt: #e3ddd2;
  --ink: #1e1e1b;
  --muted: #5e5a55;
  --accent: #7c8cff;
  --earth: #b6a48a;
}

header,
main,
footer {
  position: relative;
  z-index: 1;
}

.route-stage {
  overflow-x: clip;
}

.hero-nav-shell {
  will-change: transform, opacity;
}

@media (min-width: 768px) {
  .hero-nav-shell {
    transition:
      transform .4s cubic-bezier(.22, 1, .36, 1),
      opacity .24s ease;
  }

  .nav-shell-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    pointer-events: auto;
  }

  .nav-shell-hidden {
    opacity: 0;
    transform: translate3d(0, -120%, 0);
    pointer-events: none;
  }
}

/* ── hamburger ── */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 50%;
  border: 1px solid rgba(207, 199, 187, 0.72);
  background: rgba(248, 246, 241, 0.96);
  cursor: pointer;
}

.hamburger-btn span {
  display: block;
  height: 1.5px;
  border-radius: 2px;
  background: #1e1e1b;
  transform-origin: center;
  transition: transform 0.28s cubic-bezier(.22,1,.36,1), opacity 0.2s ease, width 0.28s ease;
}

.hamburger-btn span:nth-child(1) { width: 100%; }
.hamburger-btn span:nth-child(2) { width: 70%; }
.hamburger-btn span:nth-child(3) { width: 100%; }

.hamburger-btn.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); width: 100%; }
.hamburger-btn.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger-btn.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); width: 100%; }

/* ── mobile menu transition ── */
.mobile-menu-enter-active { transition: opacity 0.28s ease, transform 0.32s cubic-bezier(.22,1,.36,1); }
.mobile-menu-leave-active { transition: opacity 0.22s ease, transform 0.24s ease; }
.mobile-menu-enter-from  { opacity: 0; transform: translateY(-12px); }
.mobile-menu-leave-to    { opacity: 0; transform: translateY(-8px); }

</style>
