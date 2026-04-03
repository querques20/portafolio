# Portfolio — Three.js Wave Grid + Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el fondo de nebulas GSAP con una grilla wave mesh en Three.js visible e interactiva, eliminar la sección Proyectos y reemplazarla con un timeline animado por scroll que comunica el recorrido de formación del autor.

**Architecture:** WaveGrid es un componente Vue que monta un renderer Three.js en un canvas fijo (`position: fixed`) en `App.vue`. La timeline vive en `JourneyTimeline.vue` e integra GSAP para scroll-reveal de nodos y cards. Los datos del timeline se definen en `portfolio.js`.

**Tech Stack:** Vue 3 Composition API, Three.js (BufferGeometry + Points + LineSegments), GSAP, Tailwind CSS, Vite.

---

## File Map

| Acción | Archivo | Responsabilidad |
|--------|---------|-----------------|
| Crear | `src/components/WaveGrid.vue` | Canvas Three.js fijo — wave mesh de puntos + líneas, reacciona al mouse |
| Crear | `src/components/JourneyTimeline.vue` | Timeline scroll-driven con nodos, cards glassmorphism, línea que se dibuja |
| Modificar | `src/content/portfolio.js` | Agregar `milestones`, remover `previewProjects`, actualizar `navItems` |
| Modificar | `src/App.vue` | Reemplazar `<div ref="ambientScene">` con `<WaveGrid>`, remover lógica de nebulas |
| Modificar | `src/views/HomeView.vue` | Reemplazar sección de project cards con `<JourneyTimeline>` |
| Modificar | `src/router/index.js` | Eliminar ruta `/proyectos` y su import |
| Eliminar | `src/views/ProjectsView.vue` | Ya no se usa |

---

## Task 1: Instalar Three.js

**Files:**
- Modify: `package.json`

- [ ] Instalar Three.js

```bash
cd "/c/Users/facun/OneDrive/Desktop/querque.dev"
npm install three
```

Expected output: `added 1 package` y `three` aparece en `dependencies` de `package.json`.

- [ ] Verificar que el dev server sigue levantando

```bash
npm run dev
```

Expected: servidor en `http://localhost:5173` sin errores en consola.

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add package.json package-lock.json
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: add three.js dependency"
```

---

## Task 2: Datos del timeline en portfolio.js

**Files:**
- Modify: `src/content/portfolio.js`

Agregar export `milestones`, actualizar `navItems` eliminando proyectos, y remover `previewProjects`.

- [ ] Abrir `src/content/portfolio.js` y reemplazar el contenido completo con:

```js
export const email = 'facundo.albuquerque@gmail.com'

export const navItems = [
  { id: 'inicio',   name: 'home',    path: '/',         label: 'Inicio',   order: 0 },
  { id: 'sobre-mi', name: 'about',   path: '/sobre-mi', label: 'Sobre mí', order: 1 },
  { id: 'contacto', name: 'contact', path: '/contacto', label: 'Contacto', order: 2 },
]

export const heroLines = ['Diseño y desarrollo', 'digital', 'para sitios y marcas']
export const heroTags  = ['Full Stack', 'Vue / React / Node', 'WordPress / Laravel']

export const milestones = [
  {
    id: 'inicio',
    year: '2024 · Inicio',
    num: '01',
    title: 'Aposté todo al desarrollo web',
    body: 'Empecé a estudiar de forma intensiva, sin atajos. Impulsado por el interés real de construir cosas con código y entender cómo funciona todo de verdad.',
    tag: '📚 Inicio de formación intensiva',
    accent: 'var(--accent)',
  },
  {
    id: 'davinci',
    year: '2024 · Escuela Da Vinci',
    num: '02',
    title: 'Carrera Full Stack de 2 años',
    body: 'Formación acelerada cubriendo frontend, backend, bases de datos y herramientas reales. Vue, React, Node, Laravel, MySQL, MongoDB y más.',
    tag: '🎓 Carrera en curso · Full Stack',
    accent: 'var(--earth)',
  },
  {
    id: 'beca',
    year: '2025 · Reconocimiento',
    num: '03',
    title: 'Beca por promedio académico',
    body: 'Obtuve una beca por rendimiento en Da Vinci. Un hito que confirma que el esfuerzo real da resultados y me impulsó a seguir con más exigencia todavía.',
    tag: '⭐ Beca · promedio destacado',
    accent: 'var(--accent)',
  },
  {
    id: 'stack',
    year: '2025 · Stack real',
    num: '04',
    title: 'Proyectos de práctica en cada tecnología',
    body: 'No para mostrar — para entender de verdad cómo funciona cada parte. WordPress, Vue, React, Node, Laravel y bases de datos relacionales y no relacionales.',
    tag: '⚡ Stack completo · práctica constante',
    accent: 'var(--earth)',
  },
  {
    id: 'ahora',
    year: '2026 · Ahora',
    num: '→',
    title: 'Listo para mi primera oportunidad profesional',
    body: 'Sostengo este camino trabajando con mi vehículo en PedidosYa mientras busco mi primer rol en tech. Compromiso real, ganas de aprender rápido y disponibilidad total desde el día uno.',
    tag: null,
    accent: 'var(--accent)',
    isNow: true,
  },
]

export const pillars = [
  ['COMPROMISO', 'Me involucro de verdad y cuido cada entrega, incluso en esta primera etapa.', 'var(--accent)'],
  ['APRENDIZAJE', 'Estoy creciendo fuerte y convierto esa etapa en mejora constante.',             'var(--earth)'],
  ['RESPUESTA',   'Busco resolver con seriedad, comunicación clara y muchas ganas de sumar.',      'var(--accent)'],
]

export const aboutCards = [
  ['MOMENTO',   'Buscando mis primeras experiencias en desarrollo mientras sostengo mi camino con PedidosYa.', 'var(--accent)'],
  ['FORMACIÓN', 'Carrera intensiva Full Stack de 2 años en Escuela Da Vinci.',                                'var(--earth)'],
  ['STACK',     'WordPress, Vue, React, Node.js, Laravel y base real en MERN y LAMP.',                       'var(--accent)'],
  ['ACTITUD',   'Compromiso real, ganas de aprender y dedicación total en cada proyecto.',                    'var(--earth)'],
]

export const tools = [
  'WordPress', 'Vue', 'React', 'Node.js', 'JavaScript',
  'CSS', 'HTML', 'Laravel', 'MongoDB', 'Express', 'PHP', 'MySQL', 'Linux', 'Apache',
]

export const steps = [
  ['01 / ESCUCHAR', 'Entender qué necesita el proyecto y qué espera quien lo encarga.',                        'var(--accent)'],
  ['02 / ORDENAR',  'Definir estructura, stack y prioridades antes de empezar.',                               'var(--earth)'],
  ['03 / CUMPLIR',  'Trabajar con compromiso, comunicación y mejora constante hasta entregar.',                'var(--accent)'],
]

export const contactLinks = [
  { title: 'LinkedIn', body: 'Recorrido actual y disponibilidad profesional',      href: '',                   badge: 'Próximamente', type: 'external' },
  { title: 'GitHub',   body: 'Código, práctica constante y proceso de aprendizaje', href: '',                  badge: 'Próximamente', type: 'external' },
  { title: 'Inicio',   body: 'Volver al comienzo del sitio',                        routeName: 'home',         badge: 'Abrir',        type: 'route'    },
  { title: 'Respuesta',body: 'Contacto directo por mail',                            href: `mailto:${email}`,  badge: 'Email',        type: 'mailto'   },
]

export const footerColumns = [
  { label: 'NAVEGACIÓN', items: ['Inicio', 'Sobre mí', 'Contacto'] },
  { label: 'ENFOQUE',    items: ['Full Stack', 'WordPress', 'Vue / React', 'MERN + LAMP'] },
  { label: 'CONTACTO',   items: [email, 'Buenos Aires, AR', 'Disponible para primeros proyectos'] },
]
```

- [ ] Verificar que el dev server no tira errores de importaciones rotas.

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add src/content/portfolio.js
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: add milestones data, remove projects from nav"
```

---

## Task 3: Eliminar ruta de proyectos

**Files:**
- Modify: `src/router/index.js`
- Delete: `src/views/ProjectsView.vue`

- [ ] Reemplazar `src/router/index.js` con:

```js
import { createRouter, createWebHistory } from 'vue-router'
import { navItems } from '../content/portfolio'
import HomeView    from '../views/HomeView.vue'
import AboutView   from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'

const orderByName = Object.fromEntries(navItems.map((item) => [item.name, item.order]))

const routes = [
  { path: '/',          name: 'home',    component: HomeView,    meta: { order: orderByName.home    } },
  { path: '/sobre-mi',  name: 'about',   component: AboutView,   meta: { order: orderByName.about   } },
  { path: '/contacto',  name: 'contact', component: ContactView, meta: { order: orderByName.contact } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0, left: 0 } },
})

export default router
```

- [ ] Eliminar el archivo de la vista de proyectos (ya no se referencia):

```bash
rm "/c/Users/facun/OneDrive/Desktop/querque.dev/src/views/ProjectsView.vue"
```

- [ ] Confirmar en el browser que la URL `/proyectos` redirige a home (o 404 manejado por el router).

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add src/router/index.js
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" rm src/views/ProjectsView.vue
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: remove projects route and view"
```

---

## Task 4: Componente WaveGrid — Three.js

**Files:**
- Create: `src/components/WaveGrid.vue`

El canvas se monta en `position: fixed`, cubre toda la pantalla, z-index 0. Usa Three.js `BufferGeometry` + `Points` para los nodos y `LineSegments` para las líneas de la grilla. La onda se genera desplazando cada nodo en Y con `Math.sin(time + col * phaseX + row * phaseY)`. El mouse influye en el desplazamiento de los nodos cercanos.

- [ ] Crear `src/components/WaveGrid.vue`:

```vue
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvasEl = ref(null)

let renderer, scene, camera, pointsMesh, linesMesh
let animId, W, H
const mouse = new THREE.Vector2(0, 0)
let time = 0

// Grid config — tweak for density/feel
const COLS      = 26
const ROWS      = 16
const WAVE_AMP  = 0.28   // wave height in world units
const WAVE_SPD  = 0.008
const MOUSE_R   = 3.2    // influence radius in world units
const MOUSE_STR = 0.18   // repulsion strength

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function worldSize() {
  // map screen to world so grid always fills viewport
  const aspect = W / H
  const frustH  = 2 * Math.tan(THREE.MathUtils.degToRad(50) / 2) * 5
  const frustW  = frustH * aspect
  return { worldW: frustW, worldH: frustH }
}

function buildGeometries() {
  const { worldW, worldH } = worldSize()
  const positions  = []
  const lineIdxs   = []

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = (c / (COLS - 1) - 0.5) * worldW
      const y = (r / (ROWS - 1) - 0.5) * worldH
      positions.push(x, y, 0)

      const i = r * COLS + c
      if (c < COLS - 1) { lineIdxs.push(i, i + 1) }          // horizontal
      if (r < ROWS - 1) { lineIdxs.push(i, i + COLS) }       // vertical
      if (c < COLS - 1 && r < ROWS - 1 && (r + c) % 2 === 0) {
        lineIdxs.push(i, i + COLS + 1)                        // diagonal
      }
    }
  }

  return { positions: new Float32Array(positions), lineIdxs }
}

function init() {
  W = window.innerWidth
  H = window.innerHeight

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvasEl.value, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.setClearColor(0x000000, 0)

  // Scene + Camera
  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.z = 5

  const { positions, lineIdxs } = buildGeometries()

  // Points
  const ptGeo = new THREE.BufferGeometry()
  ptGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
  const ptMat = new THREE.PointsMaterial({
    color: 0x7c8cff,
    size: 0.048,
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
    opacity: 0.13,
  })
  linesMesh = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(linesMesh)
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (prefersReducedMotion()) return

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

      // Mouse repulsion (in world units)
      const mx = mouse.x * worldW * 0.5
      const my = mouse.y * worldH * 0.5
      const dx = baseX - mx
      const dy = baseY - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist / MOUSE_R)
      const repX = dx * influence * MOUSE_STR
      const repY = dy * influence * MOUSE_STR

      const fx = baseX + waveX + repX
      const fy = baseY + waveY + repY

      ptPos.setXY(idx, fx, fy)
      linePos.setXY(idx, fx, fy)
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
```

- [ ] Verificar en dev server que el canvas se ve en todas las páginas sin errores en consola.

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add src/components/WaveGrid.vue
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: add Three.js wave grid background component"
```

---

## Task 5: Integrar WaveGrid en App.vue

**Files:**
- Modify: `src/App.vue`

Reemplazar el bloque `<div ref="ambientScene" class="site-ambient">` y toda su lógica GSAP de nebulas con `<WaveGrid />`. El resto de App.vue (nav, footer, transiciones de ruta) no cambia.

- [ ] En `src/App.vue`, agregar el import de WaveGrid al bloque `<script setup>`:

Ubicar la línea:
```js
import { email, footerColumns, navItems } from './content/portfolio'
```
Reemplazarla con:
```js
import { email, footerColumns, navItems } from './content/portfolio'
import WaveGrid from './components/WaveGrid.vue'
```

- [ ] En el mismo `<script setup>`, eliminar estas líneas relacionadas a nebulas/ambient (ya no se usan):

```js
const ambientScene = ref(null)
```
```js
let ambientContext
```
Y el bloque dentro de `onMounted` que empieza con:
```js
if (!ambientScene.value || prefersReducedMotion()) return

ambientContext = gsap.context(() => {
  ...
})
```
Y en `onBeforeUnmount`:
```js
ambientContext?.revert()
```

- [ ] En el `<template>`, reemplazar el bloque completo:

```html
<div ref="ambientScene" class="site-ambient" aria-hidden="true">
  <div class="site-nebula site-nebula-primary" data-site-nebula>
    ...
  </div>
  <div class="site-nebula site-nebula-secondary" data-site-nebula>
    ...
  </div>
  <div class="site-nebula site-nebula-tertiary" data-site-nebula>
    ...
  </div>
</div>
```

Con:
```html
<WaveGrid />
```

- [ ] En el `<style scoped>` de App.vue, eliminar todas las reglas CSS relacionadas a `.site-ambient`, `.site-nebula`, `.site-nebula-*`, `.site-nebula-mist`, `.site-nebula-mist-*` (son ~140 líneas, desde `.site-ambient {` hasta el último bloque de media query de nebulas).

- [ ] Verificar en browser: grilla wave visible en todas las páginas, sin consola errors, navegación funciona.

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add src/App.vue
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: replace GSAP nebulas with Three.js WaveGrid"
```

---

## Task 6: Componente JourneyTimeline

**Files:**
- Create: `src/components/JourneyTimeline.vue`

Timeline scroll-driven. Cada milestone es una fila de `[dot | card]`. La línea vertical se "dibuja" via `scaleY` en un pseudo-elemento controlado por `IntersectionObserver`. Cada milestone entra con GSAP `from` al cruzar el viewport. El último nodo tiene el badge "Open to work".

- [ ] Crear `src/components/JourneyTimeline.vue`:

```vue
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { milestones } from '../content/portfolio'

const root = ref(null)
let ctx

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.tl-milestone', root.value)

    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        x: -32,
        duration: 0.72,
        ease: 'power3.out',
        delay: 0.06 * i,
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
        },
      })
    })

    // Animate the track fill on scroll
    gsap.from('.tl-track-fill', {
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: 0.6,
      },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
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
/* ── root ── */
.tl-root {
  position: relative;
  padding-left: 0;
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
  border: 1px solid rgba(124, 140, 255, 0.35);
  animation: tl-ring 2.8s ease-out infinite;
}

.tl-milestone-now .tl-dot-ring {
  inset: -9px;
  border-color: rgba(124, 140, 255, 0.5);
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
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
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

/* ── open to work badge ── */
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
</style>
```

**Nota importante:** `JourneyTimeline` usa `scrollTrigger` de GSAP. Se necesita registrar el plugin en `main.js`.

- [ ] Abrir `src/main.js` y agregar el registro del plugin ScrollTrigger:

```js
import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import router from './router'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

createApp(App).use(router).mount('#app')
```

- [ ] Verificar en dev server que no hay errores de importación.

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add src/components/JourneyTimeline.vue src/main.js
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: add JourneyTimeline component with scroll-driven animation"
```

---

## Task 7: Actualizar HomeView con el timeline

**Files:**
- Modify: `src/views/HomeView.vue`

Reemplazar la sección de project cards preview (`<section class="glass-panel">` con el grid `lg:grid-cols-3`) con `<JourneyTimeline />`. La sección de pillars (COMPROMISO, APRENDIZAJE, RESPUESTA) se mantiene.

- [ ] En `src/views/HomeView.vue`, agregar el import de JourneyTimeline en el bloque `<script setup>`:

Reemplazar:
```js
import { heroLines, heroTags, pillars, previewProjects } from '../content/portfolio'
```
Con:
```js
import { heroLines, heroTags, pillars } from '../content/portfolio'
import JourneyTimeline from '../components/JourneyTimeline.vue'
```

- [ ] En el `<template>`, reemplazar la sección completa de project cards:

```html
<section class="glass-panel rounded-[32px] p-6 md:p-9" data-card>
  <div class="space-y-4" data-reveal>
    <h2 class="max-w-[700px] font-['Space_Grotesk'] text-[clamp(2rem,4.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-.05em]">
      Una breve selección del tipo de proyectos en los que me gusta trabajar.
    </h2>
    <div class="section-divider" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  </div>
  <div class="mt-8 grid gap-6 lg:grid-cols-3">
    <article v-for="project in previewProjects" ...>
      ...
    </article>
  </div>
</section>
```

Con:
```html
<section class="glass-panel rounded-[32px] p-6 md:p-9" data-card>
  <div class="space-y-4 mb-10" data-reveal>
    <h2 class="max-w-[700px] font-['Space_Grotesk'] text-[clamp(2rem,4.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-.05em]">
      Mi recorrido de formación, constancia y compromiso.
    </h2>
    <div class="section-divider" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  </div>
  <JourneyTimeline />
</section>
```

- [ ] También eliminar la variable `previewProjects` del computed de `heroWordLines` no aplica, pero sí limpiar el `computed` que usaba `previewProjects` si lo hubiera. Revisar que no quede ninguna referencia a `previewProjects` en el script.

- [ ] Verificar en browser: home muestra el hero + timeline + pillars. Timeline anima al scrollear.

- [ ] Commit

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add src/views/HomeView.vue
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: replace project cards with JourneyTimeline on home"
```

---

## Task 8: Ajustes finales y smoke test

**Files:**
- Modify: `src/style.css` (si se necesitan tweaks de CSS globales)
- Modify: `src/views/ContactView.vue` (verificar que no referencia proyectos)

- [ ] Revisar `src/views/ContactView.vue` — buscar cualquier referencia a `'projects'` como routeName y cambiarla a `'home'` si existe.

- [ ] Verificar que `.glass-panel` tiene `backdrop-filter: blur` ya definido en `style.css` (lo tiene — no necesita cambios).

- [ ] Recorrer manualmente las 3 rutas en el browser:
  - `/` — hero + timeline animada + pillars ✓
  - `/sobre-mi` — bio + cards + stack + pasos ✓
  - `/contacto` — formulario + links ✓

- [ ] Verificar que la grilla Three.js es visible, se mueve al pasar el mouse y no degrada performance (CPU razonable en DevTools).

- [ ] Build de producción sin errores:

```bash
cd "/c/Users/facun/OneDrive/Desktop/querque.dev" && npm run build
```

Expected: `dist/` generado sin warnings críticos.

- [ ] Commit final

```bash
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" add -A
git -C "/c/Users/facun/OneDrive/Desktop/querque.dev" commit -m "feat: portfolio redesign — Three.js wave grid + journey timeline"
```

---

## Self-Review

**Spec coverage:**
- ✅ Three.js wave mesh visible como fondo global → Task 4 + Task 5
- ✅ Grilla de puntos conectados interactiva con mouse → `WaveGrid.vue`
- ✅ Proyectos eliminados → Task 2 (navItems) + Task 3 (router/view)
- ✅ Timeline scroll-driven con línea que se dibuja → `JourneyTimeline.vue`
- ✅ Nodos con pulso animado → CSS `@keyframes tl-ring`
- ✅ "Open to work" en último nodo → `tl-open-badge`
- ✅ Mantiene paleta beige/glassmorphism original → `glass-panel`, variables CSS
- ✅ Pillars section se mantiene → HomeView no la toca

**Tipo consistency:**
- `milestones` exportado en `portfolio.js` → importado en `JourneyTimeline.vue` ✓
- `WaveGrid` creado en `components/` → importado en `App.vue` ✓
- `JourneyTimeline` creado en `components/` → importado en `HomeView.vue` ✓
- `ScrollTrigger` registrado en `main.js` antes de que los componentes lo usen ✓
