import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const Title = 'LarbinB0t'

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: `${Title} - Home`
    }
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import(/* webpackChunkName: "generator" */ '../views/Generator.vue'),
    meta: {
      title: `${Title} - Generator`
    }
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: () => import(/* webpackChunkName: "configuration" */ '../views/Configuration.vue'),
    meta: {
      title: `${Title} - Configuration`
    }
  },
  {
    path: '/release-notes',
    name: 'Release-Notes',
    component: () => import(/* webpackChunkName: "configuration" */ '../views/ReleaseNotes.vue'),
    meta: {
      title: `${Title} - Release Notes`
    }
  }
]

export const social = [
  {
    name: 'GitHub',
    icon: 'fab fa-github',
    link: 'https://github.com/Ealenn'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
