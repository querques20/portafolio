<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvasEl = ref(null)

let renderer, scene, camera, pointsMesh, linesMesh
let animId, W, H
const mouse = new THREE.Vector2(0, 0)
let time = 0

// Grid config
const COLS      = 26
const ROWS      = 16
const WAVE_AMP  = 0.18
const WAVE_SPD  = 0.003
const MOUSE_R   = 3.2
const MOUSE_STR = 0.14

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function worldSize() {
  const aspect = W / H
  const frustH  = 2 * Math.tan(THREE.MathUtils.degToRad(50) / 2) * 5
  const frustW  = frustH * aspect
  return { worldW: frustW, worldH: frustH }
}

function buildGeometries() {
  const { worldW, worldH } = worldSize()
  const positions = []
  const lineIdxs  = []

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = (c / (COLS - 1) - 0.5) * worldW
      const y = (r / (ROWS - 1) - 0.5) * worldH
      positions.push(x, y, 0)

      const i = r * COLS + c
      if (c < COLS - 1)                              lineIdxs.push(i, i + 1)
      if (r < ROWS - 1)                              lineIdxs.push(i, i + COLS)
      if (c < COLS - 1 && r < ROWS - 1 && (r + c) % 2 === 0)
                                                     lineIdxs.push(i, i + COLS + 1)
    }
  }

  return { positions: new Float32Array(positions), lineIdxs }
}

function init() {
  W = window.innerWidth
  H = window.innerHeight

  renderer = new THREE.WebGLRenderer({ canvas: canvasEl.value, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.setClearColor(0x000000, 0)

  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.z = 5

  const { positions, lineIdxs } = buildGeometries()

  // Points
  const ptGeo = new THREE.BufferGeometry()
  ptGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
  const ptMat = new THREE.PointsMaterial({
    color: 0x7c8cff,
    size: 0.05,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  })
  pointsMesh = new THREE.Points(ptGeo, ptMat)
  scene.add(pointsMesh)

  // Lines
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
  lineGeo.setIndex(lineIdxs)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x7c8cff,
    transparent: true,
    opacity: 0.14,
  })
  linesMesh = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(linesMesh)
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (prefersReducedMotion()) { renderer.render(scene, camera); return }

  time += WAVE_SPD
  const { worldW, worldH } = worldSize()
  const ptPos   = pointsMesh.geometry.attributes.position
  const linePos = linesMesh.geometry.attributes.position

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx   = r * COLS + c
      const baseX = (c / (COLS - 1) - 0.5) * worldW
      const baseY = (r / (ROWS - 1) - 0.5) * worldH

      const phase = c * 0.42 + r * 0.58
      const waveY = Math.sin(time + phase) * WAVE_AMP
      const waveX = Math.cos(time * 0.7 + phase * 1.2) * (WAVE_AMP * 0.5)

      // Mouse repulsion
      const mx = mouse.x * worldW * 0.5
      const my = mouse.y * worldH * 0.5
      const dx = baseX - mx
      const dy = baseY - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist / MOUSE_R)
      const repX = dx * influence * MOUSE_STR
      const repY = dy * influence * MOUSE_STR

      ptPos.setXY(idx, baseX + waveX + repX, baseY + waveY + repY)
      linePos.setXY(idx, baseX + waveX + repX, baseY + waveY + repY)
    }
  }

  ptPos.needsUpdate   = true
  linePos.needsUpdate = true
  renderer.render(scene, camera)
}

function onResize() {
  W = window.innerWidth
  H = window.innerHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

function onMouseMove(e) {
  mouse.x =  (e.clientX / W) * 2 - 1
  mouse.y = -((e.clientY / H) * 2 - 1)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize',    onResize,    { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  renderer?.dispose()
  window.removeEventListener('resize',    onResize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <canvas ref="canvasEl" class="wave-grid-canvas" aria-hidden="true" />
</template>

<style scoped>
.wave-grid-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
