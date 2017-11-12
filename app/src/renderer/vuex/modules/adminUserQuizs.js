import * as types from '../mutation-types'
import { QuizService } from '../../services/quiz'
import Promise from 'bluebird'
import _ from 'lodash'
import { UsersQuizsService } from '../../services/users-quizes';
const usersQuizsService = new UsersQuizsService()
const mutationTypes = {
    GET_ALL_BY_QUIZID: 'GET_ALL_BY_QUIZID',
    SAVE_USERQUIZ: 'SAVE_USERQUIZ'
}
const state = {
    allByQuizId: []
}

const mutations = {
    [mutationTypes.GET_ALL_BY_QUIZID](state, userQuizs) {

        state.allByQuizId = userQuizs
    },
    [mutationTypes.SAVE_USERQUIZ](state) {}
}
const actions = {

    getAllByQuizId: Promise.coroutine(function*({ commit }, quizId) {
        let userQuizs = yield usersQuizsService.getByQuizId(quizId)
        commit(mutationTypes.GET_ALL_BY_QUIZID, userQuizs)
    }),
    saveUserQuiz: Promise.coroutine(function*({
        commit
    }, userQuiz) {
        var ret = yield usersQuizsService.save(userQuiz)
        commit(mutationTypes.SAVE_USERQUIZ)
    }),
    remove: Promise.coroutine(function*({
        commit
    }, id) {
        var ret = yield usersQuizsService.remove(id)
    }),
}
const getters = {
    allByQuizId: state => state.allByQuizId
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}