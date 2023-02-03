import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Network from '../views/Network.vue'
import WordCloud from '../views/WordCloud.vue'
import ImageResize from '../views/ImageResize.vue'
import QRcode from '../views/QRcode.vue'
import Galaxie from '../views/Galaxie.vue'
import Galaxie2 from '../views/Galaxie2.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/network',
    name: 'Network',
    component: Network
  },
  {
    path: '/wordcloud',
    name: 'WordCloud',
    component: WordCloud
  },
  {
    path: '/insta',
    name: 'ImageResize',
    component: ImageResize
  },
  {
    path: '/qrcode',
    name: 'QRcode',
    component: QRcode
  },
  {
    path: '/galaxie',
    name: 'Galaxie',
    component: Galaxie
  },
  {
    path: '/galaxie2',
    name: 'Galaxie2',
    component: Galaxie2
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router