import { createRouter, createWebHistory } from 'vue-router'
import { navItems } from '../content/portfolio'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'

const orderByName = Object.fromEntries(navItems.map((item) => [item.name, item.order]))

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { order: orderByName.home },
  },
  {
    path: '/sobre-mi',
    name: 'about',
    component: AboutView,
    meta: { order: orderByName.about },
  },
  {
    path: '/proyectos',
    name: 'projects',
    component: ProjectsView,
    meta: { order: orderByName.projects },
  },
  {
    path: '/contacto',
    name: 'contact',
    component: ContactView,
    meta: { order: orderByName.contact },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

export default router
