import * as types from '../mutation-types'
import { QuizServices } from '../../services/quiz'
import Promise from 'bluebird'
const quizService = new QuizServices();
const mutationTypes = {
    RECEIVE_QUIZS: 'RECEIVE_QUIZS',
    SAVE_QUIZ: 'SAVE_QUIZ',
    REMOVE_QUIZ: 'REMOVE_QUIZ',
    SELECT_QUIZ: 'SELECT_QUIZ',
    RESET_CURRENT: 'RESET_CURRENT'
}
const state = {
    all: [],
    currentQuiz: {}
}

const mutations = {
    [mutationTypes.SELECT_QUIZ](state, { selectedQuiz }) {
        let filter = state.all.filter(x => x.id == selectedQuiz.id);
        if (filter) {
            state.current = filter[0]
        }
    },
    [mutationTypes.SAVE_QUIZ](state) { },
    [mutationTypes.REMOVE_QUIZ](state) { },
    [mutationTypes.RECEIVE_QUIZS](state, { quizList }) {
        state.all = quizList
    },
    [mutationTypes.RESET_CURRENT](state) {
        state.current = {}
    }
}
const actions = {
    getAll: Promise.coroutine(function* ({ commit }) {
        let quizList = yield quizService.getQuizs();
        commit(mutationTypes.RECEIVE_QUIZS, {
            quizList
        })

    }),
    selectQuiz: function ({ commit }, selectedQuiz) {
        commit(mutationTypes.SELECT_QUIZ, selectedQuiz)

    },
    saveQuiz: Promise.coroutine(function* ({ commit }, current) {
        var ret = yield quizService.save(current)
        commit(mutationTypes.SAVE_QUIZ)
        commit(mutations.RESET_CURRENT)
    }),
    removeQuiz: Promise.coroutine(function* ({ commit }, current) {
        var ret = yield quizService.remove(current.id)
    })



}

const getters = {
    all: state => state.all,
    current: state => state.currentQuiz,
    title: state => !!state.current ? 'Cập nhật' : 'Tạo mới'
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
