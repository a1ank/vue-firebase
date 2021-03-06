import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import Store from "./store"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
  ],
  mode: 'history'
})
function AuthGuard(from, to, next){
  if(Store.getters.isUserAuthenticated)
  next()
  else
  next('/signin')
}