import * as types from '../mutation-types'
import { QuizServices } from '../../services/quiz'
import Promise from 'bluebird'
const quizService = new QuizServices();
const mutationTypes = {
    RECEIVE_QUIZS: 'RECEIVE_QUIZS',
    SAVE_QUIZ: 'SAVE_QUIZ',
    REMOVE_QUIZ: 'REMOVE_QUIZ',
    SELECT_QUIZ: 'SELECT_QUIZ',
    RESET_CURRENT: 'RESET_CURRENT',
    UPDATE_CURRENT: 'UPDATE_CURRENT'
}
const state = {
    all: [],
    currentQuiz: {}
}

const mutations = {
    [mutationTypes.SELECT_QUIZ](state, selectedQuiz) {
        let filter = state.all.filter(x => selectedQuiz && x.id == selectedQuiz.id);
        if (!!filter.length) {
            state.currentQuiz = filter[0]
        }
    },
    [mutationTypes.SAVE_QUIZ](state) { },
    [mutationTypes.REMOVE_QUIZ](state) { },
    [mutationTypes.RECEIVE_QUIZS](state, { quizList }) {
        state.all = quizList
    },
    [mutationTypes.RESET_CURRENT](state) {
        state.currentQuiz = {}
    },
    [mutationTypes.UPDATE_CURRENT](state, quiz) {
        state.currentQuiz = quiz
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
    saveQuiz: Promise.coroutine(function* ({ commit }, selectedQuiz) {
        var ret = yield quizService.save(selectedQuiz)
        commit(mutationTypes.SAVE_QUIZ)
        commit(mutationTypes.RESET_CURRENT)
    }),
    removeQuiz: Promise.coroutine(function* ({ commit }, current) {
        var ret = yield quizService.remove(current.id)
    }),
    updateCurrent: Promise.coroutine(function* ({ commit }, selectedQuiz) {
        commit(mutationTypes.UPDATE_CURRENT, selectedQuiz)
    }),



}

const getters = {
    all: state => state.all,
    currentQuiz: state => state.currentQuiz,
    title: state => !!state.currentQuiz ? 'Cập nhật' : 'Tạo mới'
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
