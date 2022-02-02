import Vue from 'vue'
import VueRouter from 'vue-router'
import LootPoints from '@/components/LootPoints'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LootPoints
  },
  { // Total hack to work with github pages - lol
    path: '/loot-history-table/',
    name: 'home2',
    component: LootPoints
  }
]

// Change the base here for github pages
let base = process.env.BASE_URL
if (process.env.NODE_ENV === 'production') {
  base = 'https://bacontech.github.io/loot-history-table/'
}

const router = new VueRouter({
  mode: 'history',
  base: base,
  routes
})

export default router
