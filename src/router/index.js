import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Network from '../views/Network.vue'
import WordCloud from '../views/WordCloud.vue'
import ImageResize from '../views/ImageResize.vue'
import QRcode from '../views/QRcode.vue'
import Galaxie from '../views/Galaxie.vue'


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
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router