export default [{
  path: '/',
    // name: 'dashboard',
  component: require('components/DashBoardView'),
  children: [{
    path: '',
    component: require('components/DashBoard/CurrentPage')
  },
  {
    path: 'about',
    component: require('components/DashBoard/About'),
    beforeEnter: (to, from, next) => {
      next()
    }
  },
  {
    path: 'login',
    component: require('components/DashBoard/Login'),
    beforeEnter: (to, from, next) => {
      next()
    }
  }
  ]
},
{
  path: '/Quiz',
  component: require('components/QuizView'),
  beforeEnter: (to, from, next) => {
      // alert('ok');
    next()
  }
},
{
  path: '*',
  redirect: '/'
}
]
