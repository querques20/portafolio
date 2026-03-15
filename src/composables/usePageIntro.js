import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

export function usePageIntro() {
  const pageRoot = ref(null)
  let context

  onMounted(async () => {
    await nextTick()

    if (!pageRoot.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    context = gsap.context(() => {
      const titleLines = gsap.utils.toArray('.page-title-line')
      const leadItems = gsap.utils.toArray('[data-reveal]')
      const cards = gsap.utils.toArray('[data-card]')
      const visuals = gsap.utils.toArray('[data-visual]')

      if (titleLines.length) {
        gsap.set(titleLines, { yPercent: 112, rotate: 3, transformOrigin: '0% 100%' })
      }

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (titleLines.length) {
        timeline.to(titleLines, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.11 })
      }

      if (leadItems.length) {
        timeline.from(
          leadItems,
          {
            opacity: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.08,
          },
          titleLines.length ? '-=0.5' : 0
        )
      }

      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 42,
          scale: 0.985,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.18,
        })
      }

      if (visuals.length) {
        gsap.from(visuals, {
          opacity: 0,
          scale: 1.06,
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        })
      }
    }, pageRoot.value)
  })

  onBeforeUnmount(() => {
    context?.revert()
  })

  return { pageRoot }
}
