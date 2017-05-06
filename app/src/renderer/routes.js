export default [{
    path: '/',
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
      },
      {
        path: 'login',
        component: require('components/DashBoard/Login'),
        beforeEnter: (to, from, next) => {
          // alert('ok');
          next()
        }
      }
    ]
  },
  {
    path: '/Quiz',
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
    path: '*',
    redirect: '/'
  }
]