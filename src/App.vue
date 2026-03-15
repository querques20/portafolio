<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { email, footerColumns, navItems } from './content/portfolio'

const route = useRoute()
const router = useRouter()

const ambientScene = ref(null)
const routeViewport = ref(null)
const activeRouteName = computed(() => route.name ?? 'home')
const isDesktopNavVisible = ref(false)
const isDesktopNavHovered = ref(false)
const isRouteTransitioning = ref(false)

const desktopNavTopOffset = 24
const desktopNavScrollDetectionThreshold = 2
const desktopNavHideThreshold = 12
const desktopNavWheelIntentThreshold = 3
const desktopNavRevealHoldMs = 420
const routeOrderByName = Object.fromEntries(navItems.map((item) => [item.name, item.order]))

let skipNextRouteEnterAnimation = false
let lastScrollY = 0
let ambientContext
let scrollFrameId
let desktopNavRevealLockUntil = 0

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

const holdDesktopNavVisible = () => {
  desktopNavRevealLockUntil = performance.now() + desktopNavRevealHoldMs
  isDesktopNavVisible.value = true
}

const applyDesktopNavVisibilityFromScroll = (currentScrollY) => {
  if (!isDesktopNavEnabled()) {
    isDesktopNavVisible.value = true
    return
  }

  if (isRouteTransitioning.value || isDesktopNavHovered.value || currentScrollY <= desktopNavTopOffset) {
    isDesktopNavVisible.value = true
    return
  }

  if (performance.now() < desktopNavRevealLockUntil) {
    isDesktopNavVisible.value = true
  }
}

const syncDesktopNavVisibility = () => {
  const currentScrollY = Math.max(window.scrollY || 0, 0)

  lastScrollY = currentScrollY

  applyDesktopNavVisibilityFromScroll(currentScrollY)
}

const updateDesktopNavFromScroll = () => {
  if (!isDesktopNavEnabled()) {
    syncDesktopNavVisibility()
    return
  }

  const currentScrollY = Math.max(window.scrollY || 0, 0)

  if (currentScrollY <= desktopNavTopOffset) {
    lastScrollY = currentScrollY
    desktopNavRevealLockUntil = 0
    isDesktopNavVisible.value = true
    return
  }

  const delta = currentScrollY - lastScrollY
  lastScrollY = currentScrollY

  if (Math.abs(delta) < desktopNavScrollDetectionThreshold) return

  if (isRouteTransitioning.value || isDesktopNavHovered.value) {
    isDesktopNavVisible.value = true
    return
  }

  if (delta < 0) {
    holdDesktopNavVisible()
    return
  }

  if (performance.now() < desktopNavRevealLockUntil) return

  if (delta >= desktopNavHideThreshold) {
    isDesktopNavVisible.value = false
  }
}

const handleWindowScroll = () => {
  if (scrollFrameId) return

  scrollFrameId = window.requestAnimationFrame(() => {
    scrollFrameId = undefined
    updateDesktopNavFromScroll()
  })
}

const handleWindowWheel = (event) => {
  if (!isDesktopNavEnabled()) return

  const currentScrollY = Math.max(window.scrollY || 0, 0)

  if (currentScrollY <= desktopNavTopOffset || isRouteTransitioning.value || isDesktopNavHovered.value) {
    isDesktopNavVisible.value = true
    return
  }

  if (event.deltaY <= -desktopNavWheelIntentThreshold) {
    holdDesktopNavVisible()
  }
}

const handleDesktopNavEnter = () => {
  if (!isDesktopNavEnabled()) return
  isDesktopNavHovered.value = true
  showDesktopNav()
}

const handleDesktopNavLeave = () => {
  isDesktopNavHovered.value = false
  applyDesktopNavVisibilityFromScroll(Math.max(window.scrollY || 0, 0))
}

const handleDesktopNavFocusOut = (event) => {
  const nextTarget = event.relatedTarget

  if (nextTarget instanceof HTMLElement && event.currentTarget instanceof HTMLElement && event.currentTarget.contains(nextTarget)) return

  handleDesktopNavLeave()
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
  window.addEventListener('scroll', handleWindowScroll, { passive: true })
  window.addEventListener('wheel', handleWindowWheel, { passive: true })
  window.addEventListener('resize', syncDesktopNavVisibility, { passive: true })

  if (!ambientScene.value || prefersReducedMotion()) return

  ambientContext = gsap.context(() => {
    const nebulaGroups = gsap.utils.toArray('[data-site-nebula]')
    const nebulaMotion = [
      { x: -186, y: 102, rotate: -10, scale: 1.14, opacity: 0.98, duration: 4.8 },
      { x: 154, y: -96, rotate: 11, scale: 1.18, opacity: 0.9, duration: 4.2 },
      { x: -128, y: 86, rotate: 14, scale: 1.16, opacity: 0.84, duration: 3.9 },
    ]

    gsap.set(nebulaGroups, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transformOrigin: '50% 50%',
    })

    nebulaGroups.forEach((item, index) => {
      const motion = nebulaMotion[index] ?? nebulaMotion[nebulaMotion.length - 1]

      gsap.to(item, {
        x: motion.x,
        y: motion.y,
        rotate: motion.rotate,
        scale: motion.scale,
        opacity: motion.opacity,
        duration: motion.duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, ambientScene.value)
})

onBeforeUnmount(() => {
  if (scrollFrameId) window.cancelAnimationFrame(scrollFrameId)
  window.removeEventListener('scroll', handleWindowScroll)
  window.removeEventListener('wheel', handleWindowWheel)
  window.removeEventListener('resize', syncDesktopNavVisibility)
  ambientContext?.revert()
})
</script>

<template>
  <div class="portfolio-app bg-[var(--sand-alt)] text-[var(--ink)]">
    <div ref="ambientScene" class="site-ambient" aria-hidden="true">
      <div class="site-nebula site-nebula-primary" data-site-nebula>
        <div class="site-nebula-mist site-nebula-mist-primary" data-site-mist data-base-opacity="0.84"></div>
        <div class="site-nebula-mist site-nebula-mist-accent" data-site-mist data-base-opacity="0.72"></div>
        <div class="site-nebula-mist site-nebula-mist-tail" data-site-mist data-base-opacity="0.58"></div>
      </div>

      <div class="site-nebula site-nebula-secondary" data-site-nebula>
        <div class="site-nebula-mist site-nebula-mist-secondary" data-site-mist data-base-opacity="0.68"></div>
        <div class="site-nebula-mist site-nebula-mist-soft" data-site-mist data-base-opacity="0.5"></div>
      </div>

      <div class="site-nebula site-nebula-tertiary" data-site-nebula>
        <div class="site-nebula-mist site-nebula-mist-tertiary" data-site-mist data-base-opacity="0.6"></div>
        <div class="site-nebula-mist site-nebula-mist-glow" data-site-mist data-base-opacity="0.46"></div>
      </div>
    </div>

    <header class="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-6">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-3">
        <div
          class="hero-nav-shell"
          :class="isDesktopNavVisible ? 'nav-shell-visible' : 'nav-shell-hidden'"
          @mouseenter="handleDesktopNavEnter"
          @mouseleave="handleDesktopNavLeave"
          @focusin="handleDesktopNavEnter"
          @focusout="handleDesktopNavFocusOut"
        >
          <nav
            class="hero-nav pointer-events-auto flex items-center justify-between gap-4 rounded-full border-[rgba(207,199,187,.88)] bg-white px-4 py-3 backdrop-blur-xl shadow-[0_18px_40px_rgba(30,30,27,.08)]"
          >
            <button type="button" class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.18em]" @click="navigateToRoute('home')">
              facundo.dev
            </button>

            <div class="hidden items-center gap-2 md:flex">
              <button
                v-for="item in navItems"
                :key="item.name"
                type="button"
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

            <button
              type="button"
              class="rounded-full border border-[rgba(207,199,187,.72)] bg-[rgba(248,246,241,.96)] px-4 py-2 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] text-[var(--ink)] md:hidden"
              @click="navigateToRoute('contact')"
            >
              Contacto
            </button>
          </nav>
        </div>

        <div class="pointer-events-auto md:hidden">
          <div
            class="flex flex-wrap items-center gap-2 rounded-[28px] border-[rgba(207,199,187,.72)] bg-white px-2 py-2 backdrop-blur-xl shadow-[0_16px_34px_rgba(30,30,27,.07)]"
          >
            <button
              v-for="item in navItems"
              :key="`${item.name}-mobile`"
              type="button"
              class="shrink-0 rounded-full px-4 py-2 font-['DM_Sans'] text-[11px] font-bold uppercase tracking-[.18em] transition-all duration-300"
              :class="activeRouteName === item.name ? 'bg-[var(--ink)] text-[var(--sand)]' : 'bg-[rgba(248,246,241,.96)] text-[var(--muted)]'"
              @click="navigateToRoute(item.name)"
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

    <main class="pt-28 md:pt-24">
      <div ref="routeViewport" class="route-stage route-viewport">
        <RouterView />
      </div>
    </main>

    <footer class="border-t border-[rgba(196,186,171,.82)] bg-[rgba(227,221,210,.82)] px-4 py-10 backdrop-blur-xl">
      <div class="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,352px)_repeat(3,minmax(0,1fr))]">
          <div class="space-y-3">
            <p class="font-['DM_Sans'] text-[13px] font-bold uppercase tracking-[.16em]">facundo.dev</p>
            <p class="max-w-[352px] leading-7 text-[var(--muted)]">
              Diseñador y desarrollador enfocado en producto, identidad y experiencia digital.
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
          <p>Diseño, desarrollo y dirección visual.</p>
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

.site-ambient {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.site-nebula {
  position: absolute;
  isolation: isolate;
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.site-nebula-primary {
  right: -14%;
  top: 10%;
  width: clamp(28rem, 50vw, 52rem);
  height: clamp(22rem, 36vw, 38rem);
}

.site-nebula-secondary {
  left: -10%;
  bottom: 10%;
  width: clamp(18rem, 30vw, 30rem);
  height: clamp(14rem, 24vw, 24rem);
  opacity: .84;
}

.site-nebula-tertiary {
  left: 36%;
  top: 34%;
  width: clamp(16rem, 24vw, 24rem);
  height: clamp(12rem, 18vw, 18rem);
  opacity: .72;
}

.site-nebula-mist {
  position: absolute;
  border-radius: 44% 56% 62% 38% / 42% 38% 62% 58%;
  filter: blur(38px);
  mix-blend-mode: screen;
}

.site-nebula-mist-primary {
  inset: 4% 8% 10% 18%;
  background:
    radial-gradient(circle at 42% 44%, rgba(226, 232, 255, .98) 0%, rgba(124, 140, 255, .62) 24%, rgba(124, 140, 255, .26) 50%, rgba(124, 140, 255, 0) 78%);
}

.site-nebula-mist-accent {
  inset: 14% 0 8% 26%;
  border-radius: 58% 42% 46% 54% / 48% 60% 40% 52%;
  background:
    radial-gradient(ellipse at 66% 52%, rgba(198, 208, 255, .9) 0%, rgba(124, 140, 255, .48) 22%, rgba(124, 140, 255, .18) 50%, rgba(124, 140, 255, 0) 78%);
}

.site-nebula-mist-tail {
  inset: 30% 16% 2% 6%;
  border-radius: 62% 38% 54% 46% / 34% 54% 46% 66%;
  background:
    radial-gradient(ellipse at 36% 54%, rgba(178, 193, 255, .74) 0%, rgba(124, 140, 255, .34) 26%, rgba(124, 140, 255, .12) 52%, rgba(124, 140, 255, 0) 80%);
}

.site-nebula-mist-secondary {
  inset: 2% 10% 10% 8%;
  background:
    radial-gradient(circle at 44% 44%, rgba(208, 217, 255, .82) 0%, rgba(124, 140, 255, .42) 26%, rgba(124, 140, 255, .18) 52%, rgba(124, 140, 255, 0) 80%);
}

.site-nebula-mist-soft {
  inset: 28% 4% 0 20%;
  border-radius: 52% 48% 58% 42% / 58% 42% 58% 42%;
  background:
    radial-gradient(ellipse at 62% 46%, rgba(170, 188, 255, .62) 0%, rgba(124, 140, 255, .28) 28%, rgba(124, 140, 255, .12) 54%, rgba(124, 140, 255, 0) 82%);
}

.site-nebula-mist-tertiary {
  inset: 8% 8% 10% 10%;
  border-radius: 46% 54% 50% 50% / 54% 46% 54% 46%;
  background:
    radial-gradient(circle at 52% 48%, rgba(214, 223, 255, .78) 0%, rgba(124, 140, 255, .34) 28%, rgba(124, 140, 255, .14) 56%, rgba(124, 140, 255, 0) 82%);
}

.site-nebula-mist-glow {
  inset: 18% 18% 14% 18%;
  border-radius: 58% 42% 62% 38% / 38% 58% 42% 62%;
  background:
    radial-gradient(circle at 48% 50%, rgba(228, 233, 255, .82) 0%, rgba(124, 140, 255, .28) 30%, rgba(124, 140, 255, .1) 54%, rgba(124, 140, 255, 0) 80%);
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
      transform .44s cubic-bezier(.22, 1, .36, 1),
      opacity .28s ease;
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

@media (max-width: 1023px) {
  .site-nebula-primary {
    right: -28%;
    top: 14%;
    width: 24rem;
    height: 18rem;
  }

  .site-nebula-secondary {
    left: auto;
    right: -16%;
    bottom: 10%;
    width: 14rem;
    height: 11rem;
  }

  .site-nebula-tertiary {
    left: 20%;
    top: 40%;
    width: 12rem;
    height: 10rem;
  }
}
</style>
