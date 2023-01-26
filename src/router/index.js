import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WordCloud from '../views/WordCloud.vue'
import ImageResize from '../views/ImageResize.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wordcloud',
    name: 'WordCloud',
    component: WordCloud
  },
  {
    path: '/imageresize',
    name: 'ImageResize',
    component: ImageResize
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router