import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/firebase.js"

const routes = [
  {
    path: '/',
    name: 'RoomList',
    meta: { requiresAuth: true },
    component: async () => {
      const RoomList = await import('@/components/pages/RoomList.vue');
      return RoomList;
    }
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: async () => {
      const ChatBoard = await import('@/components/pages/ChatBoard.vue');
      return ChatBoard;
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: async () => {
      const Login = await import('@/components/pages/Login.vue');
      return Login;
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: async () => {
      const SignUp = await import('@/components/pages/SignUp.vue');
      return SignUp;
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    const user = sessionStorage.getItem('user')
    if (!user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  else {
    next() 
  }
})

export default router
