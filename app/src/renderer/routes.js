export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/WelcomePage')
  },
  {
    path: '*',
    redirect: '/'
  }
]
