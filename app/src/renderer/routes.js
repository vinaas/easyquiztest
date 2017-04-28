export default [
  {
    path: '/',
    name: 'landing',
    component: require('components/WelcomePage')
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
