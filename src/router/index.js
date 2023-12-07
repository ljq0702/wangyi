import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
    },
    {
      path: '/findMusic',
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: () => import('../views/findMusic/Recommend.vue')
        },{
          path: 'theCharts',
          name: 'theCharts',
          component: () => import('../views/findMusic/TheCharts.vue')
        },{
          path: 'songSheet',
          name: 'songSheet',
          component: () => import('../views/findMusic/SongSheet.vue')
        },{
          path: 'anchorRadio',
          name: 'anchorRadio',
          component: () => import('../views/findMusic/AnchorRadio.vue')
        },{
          path: 'singer',
          name: 'singer',
          component: () => import('../views/findMusic/Singer.vue')
        },{
          path: 'newDisc',
          name: 'newDisc',
          component: () => import('../views/findMusic/NewDisc.vue')
        },
      ]
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
