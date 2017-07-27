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
  path: '/admin',
  component: require('components/AdminView'),
  children: [{
    path: '',
    component: require('components/Admin/CurrentPage')
  },
  {
    path: 'quizlist',
    component: require('components/Admin/QuizList'),
    beforeEnter: (to, from, next) => {
      next()
    }
  },
   {
    path: 'appuserslist',
    component: require('components/Admin/ApplicationUser'),
    beforeEnter: (to, from, next) => {
      next()
    }
  },
  {
    name: 'questionList',
    path: 'questionList/:id',
    component: require('components/Admin/questionList')
  }
  ]
},
{
  path: '*',
  redirect: '/'
}
]
