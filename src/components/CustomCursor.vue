<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const dot    = ref(null)
const ring   = ref(null)
const isHover = ref(false)
const isVisible = ref(false)

let mx = 0, my = 0   // real mouse pos
let rx = 0, ry = 0   // ring pos (lagged)
let animId

const LERP = 0.12    // ring lag (0 = no movement, 1 = instant)

function lerp(a, b, t) { return a + (b - a) * t }

function moveDot(x, y) {
  if (!dot.value) return
  dot.value.style.transform = `translate(${x}px, ${y}px)`
}

function moveRing(x, y) {
  if (!ring.value) return
  ring.value.style.transform = `translate(${x}px, ${y}px)`
}

function loop() {
  animId = requestAnimationFrame(loop)
  rx = lerp(rx, mx, LERP)
  ry = lerp(ry, my, LERP)
  moveRing(rx, ry)
}

function onMouseMove(e) {
  mx = e.clientX
  my = e.clientY
  moveDot(mx, my)
  if (!isVisible.value) {
    isVisible.value = true
    rx = mx; ry = my
    moveRing(rx, ry)
  }
}

function onMouseEnter() { isVisible.value = true }
function onMouseLeave() { isVisible.value = false }

function onMouseDown() {
  dot.value?.classList.add('cursor-click')
  ring.value?.classList.add('cursor-click')
}
function onMouseUp() {
  dot.value?.classList.remove('cursor-click')
  ring.value?.classList.remove('cursor-click')
}

function setHover(val) { isHover.value = val }

function delegateHover(e) {
  const el = e.target.closest('a, button, [data-cursor-hover]')
  setHover(!!el)
}

onMounted(() => {
  // only on pointer-fine devices (desktop)
  if (!window.matchMedia('(pointer: fine)').matches) return

  document.documentElement.classList.add('custom-cursor-active')

  window.addEventListener('mousemove',  onMouseMove,  { passive: true })
  document.addEventListener('mouseenter', onMouseEnter)
  document.addEventListener('mouseleave', onMouseLeave)
  document.addEventListener('mouseover',  delegateHover, { passive: true })
  document.addEventListener('mousedown',  onMouseDown)
  document.addEventListener('mouseup',    onMouseUp)

  loop()
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('custom-cursor-active')
  window.removeEventListener('mousemove',  onMouseMove)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('mouseover',  delegateHover)
  document.removeEventListener('mousedown',  onMouseDown)
  document.removeEventListener('mouseup',    onMouseUp)
  cancelAnimationFrame(animId)
})
</script>

<template>
  <template v-if="isVisible">
    <!-- dot: snaps to mouse instantly -->
    <div
      ref="dot"
      class="cursor-dot"
      :class="{ 'cursor-hover': isHover }"
      aria-hidden="true"
    />
    <!-- ring: follows with lag -->
    <div
      ref="ring"
      class="cursor-ring"
      :class="{ 'cursor-hover': isHover }"
      aria-hidden="true"
    />
  </template>
</template>

<style>
/* hide native cursor when active */
.custom-cursor-active,
.custom-cursor-active * {
  cursor: none !important;
}
</style>

<style scoped>
/* ── dot ── */
.cursor-dot {
  position: fixed;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7c8cff;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transition: width .2s ease, height .2s ease, top .2s ease, left .2s ease, background .2s ease, opacity .15s ease;
}

.cursor-dot.cursor-hover {
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  background: #f3efe7;
}

.cursor-dot.cursor-click {
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  background: #a5b4ff;
}

/* ── ring ── */
.cursor-ring {
  position: fixed;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(124, 140, 255, 0.55);
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
  transition:
    width .35s cubic-bezier(.22,1,.36,1),
    height .35s cubic-bezier(.22,1,.36,1),
    top .35s cubic-bezier(.22,1,.36,1),
    left .35s cubic-bezier(.22,1,.36,1),
    border-color .25s ease,
    background .25s ease,
    opacity .15s ease;
}

.cursor-ring.cursor-hover {
  top: -30px;
  left: -30px;
  width: 60px;
  height: 60px;
  border-color: rgba(124, 140, 255, 0.35);
  background: rgba(124, 140, 255, 0.06);
}

.cursor-ring.cursor-click {
  top: -16px;
  left: -16px;
  width: 32px;
  height: 32px;
  background: rgba(124, 140, 255, 0.12);
}
</style>
