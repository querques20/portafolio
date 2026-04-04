import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import AboutView   from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/',         name: 'home',    component: HomeView    },
  { path: '/sobre-mi', name: 'about',   component: AboutView   },
  { path: '/contacto', name: 'contact', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
