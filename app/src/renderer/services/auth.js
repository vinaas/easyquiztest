var Promise = require('bluebird')
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
})
export class AuthServices {
  get isAuthenticated () {
    return !!this.token()
  }
  get token () {
    return sessionStorage.getItem('auth-token')
  }

  login = Promise.coroutine(function* (userCertification) {
    if (typeof userCertification !== 'object') {
      return Error('User Certification InValid')
    }
    let username = userCertification.username
    let password = userCertification.password
    var ret = yield axios.post('api/ApplicationUsers/login', {
      'username': username,
      'password': password
    })
    this._setToken(ret.data)
    return ret.data
  });
  getUserRoles = Promise.coroutine(function* () {
    var user = JSON.parse(sessionStorage.getItem('userinfo'))

    let ret = yield axios.get('api/ApplicationUsers/' + user.userId + '/roles')
    console.log('user info', ret.data)
    return ret.data
  })
  logout = Promise.coroutine(function* () {
    return yield axios.post('api/ApplicationUsers/logout')
  })
  getUserInfo () {
    if (!this.token) {
      return
    }
    return JSON.parse(sessionStorage.getItem('userinfo'))
  }
  _setToken (ret) {
    sessionStorage.setItem('userinfo', JSON.stringify(ret))
    axios.defaults.headers.common['Authorization'] = ret.id
  }
}
