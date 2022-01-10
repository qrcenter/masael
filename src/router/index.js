import Vue from 'vue'
import VueRouter from 'vue-router'
import Questions from '../views/QuestionsView.vue'
import MyQuestions from '@/components/MyQuestions'
import Posts from '../views/PostsView.vue'
import Tags from '../views/TagsView.vue'
import Question from '@/components/Question'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import AuthGuard from './auth-guard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Questions',
    component: Questions,
    beforeEnter: AuthGuard
  },
  {
    path: '/my-questions',
    name: 'MyQuestions',
    component: MyQuestions,
    beforeEnter: AuthGuard
  },
  {
      path: '/question/:id/',
      name: 'Question',
      component: Question,
      props: true,
      beforeEnter: AuthGuard
    },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    beforeEnter: AuthGuard
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags,
    beforeEnter: AuthGuard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  // {
  //   path: '/courses/:type',
  //   name: 'Courses',
  //   component: Courses,
  //   props: true,
  //   beforeEnter: AuthGuard
  // },
  // {
  //   path: '/course/:id/:type',
  //   name: 'Course',
  //   component: Course,
  //   props: true,
  //   beforeEnter: AuthGuard
  // },
  
 
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
