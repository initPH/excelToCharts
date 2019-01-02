import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'charts',
      component: require('@/components/home').default
    },
    {
      path: '*',
      redirect: '/'
    }, {
      path: '/track',
      name: 'track',
      component: require('@/components/trackjs').default
    }
  ]
})
