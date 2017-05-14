import * as types from '../mutation-types'
import quizApi from '../../api/quiz'
const state = {
    all: []
}

// getters
const getters = {
    getAllQuizs: state => state.all
}

// actions
const actions = {
    getAllQuizs({ commit}) {
        quizApi.getQuizs(quizs => {
            commit(types.RECEIVE_QUIZS, {
                quizs
            })
        })
    }
}
const mutations = {
    [types.RECEIVE_QUIZS](state, { quizs}) {
        state.all = quizs
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}