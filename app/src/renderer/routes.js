export default [
  {
    path: '/',
    name: 'landing',
    component: require('components/WelcomePage')
  },
  {
    path: '/about',
    name: 'landing',
    component: require('components/LandingPageView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
