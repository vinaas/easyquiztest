export default [{
    path: '/landing-page',
    name: 'landing-page',
    component: require('components/WelcomePage')
  },
  {
    path: '/dashboard',
    // name: 'dashboard',
    component: require('components/DashBoard'),
    children: [{
        path: '',
        component: require('components/DashBoard/CurrentPage')
      },
      {
        path: 'about',
        component: require('components/DashBoard/About'),
        beforeEnter: (to, from, next) => {
          // alert('ok');
          next()
        }
      }
    ]
  },
  {
    path: '/',
    component: require('components/Quiz'),
    beforeEnter: (to, from, next) => {
      // alert('ok');
      next()
    }
  }, {
    path: '/login',
    name: 'login',
    component: require('components/Login')
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