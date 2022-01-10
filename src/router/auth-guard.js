import store from '@/store/index'
export default 
 (to, from, next) => {
  const user=window.$cookies.get('user');
    if (user) {
     store.dispatch('autoSignIn', user)
      next()
    }
   else
    next('/login')
  }

