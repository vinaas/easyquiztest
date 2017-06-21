import Promise from 'bluebird'
import {UserService} from '../../services/user'
const co = Promise.coroutine;
const userService = new UserService();
const mutationTypes = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT'
}
const state = {
    user: {}
}

const mutations = {
    [mutationTypes.LOG_IN](state, userInfo) {
        state.user = userInfo
    },
    [mutationTypes.LOG_OUT](state){
        state.user = {}
    }

}
const actions = {
    login: Promise.coroutine( function* ({commit}, userInfo) {
        var retUser = yield userService.getBy(userInfo.userId)
        commit(mutationTypes.LOG_IN, retUser)
    }),
    logout: function({commit}){
        commit(mutationTypes.LOG_OUT)
    }
}

const getters = {
    user: state => state.user
}
export default {
    state,
    mutations,
    actions,
    getters
}