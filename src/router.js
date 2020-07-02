import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/users/User.vue'
import Role from '@/views/powers/Role.vue'
import Power from '@/views/powers/Power.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      //   添加重定向
      redirect: { name: 'Login' }
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Home',
      path: '/home',
      component: Home,
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'User',
          path: 'user',
          component: User
        },
        {
          name: 'Role',
          path: 'role',
          component: Role
        },
        {
          name: 'Power',
          path: 'power',
          component: Power
        }
      ]
    }
  ]
})
