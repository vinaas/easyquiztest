export default [
  {
    path: '/',
    name: 'dashboard',
    component: require('components/DashBoard')
  },
  {
    path: '/about',
    name: 'about',
    component: require('components/AboutView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
