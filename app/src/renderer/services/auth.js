var Promise = require("bluebird");
export class AuthServices {
    get isAuthenticated() {
        return !!this.token()
    }
    get token() {
        return sessionStorage.getItem('auth-token')
    }

    login = Promise.coroutine(function* (userCertification) {
        if (typeof userCertification !== 'object') {
            return Error('User Certification InValid')
        }
        let username = userCertification.username
        let password = userCertification.password
        var ret = yield axios.post('/ApplicationUsers/login', {
            'username': username,
            'password': password
        })
        this._setToken(ret);

    });
    logout = Promise.coroutine(function* () {
        return yield axios.post('/ApplicationUsers/logout')

    })
    getUserInfo() {
        if (!this.token) {
            return;
        }
        return sessionStorage.getItem('userinfo')

    }
    _setToken(ret) {
        sessionStorage.setItem('userinfo', ret)
        axios.defaults.headers.common['Authorization'] = ret.id
    }
}