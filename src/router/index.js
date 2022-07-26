import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("../views/login.vue")
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import("../layout"),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import("../views/home.vue")
      },
      {
        path: '/bookShow',
        name: 'bookShow',
        component: () => import("../views/bookShow.vue")
      },
      {
        path: '/borrowBookShow',
        name: 'borrowBookShow',
        component: () => import("../views/borrowBookShow.vue")
      },
      {
        path: '/vipCenter',
        name: 'vipCenter',
        component: () => import("../views/vipCenter.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  //这里是一个简单的例子
  //即判断用户是否进入了需要鉴权的路由下（这里距离为news和message）
  if (to.path == '/' && sessionStorage.getItem('token') !==null) {
    next('/layout')
  } else if(to.path == '/layout' && sessionStorage.getItem('token')==null) {
    //如果不是，则直接放心即可
    next('/')
  }else{
    next()
  }
})

export default router
