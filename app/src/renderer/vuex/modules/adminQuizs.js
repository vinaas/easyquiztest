import * as types from '../mutation-types'
import { QuizService } from '../../services/quiz'
import Promise from 'bluebird'
import _ from 'lodash'
const quizService = new QuizService()
const mutationTypes = {
  RECEIVE_QUIZS: 'RECEIVE_QUIZS',
  SAVE_QUIZ: 'SAVE_QUIZ',
  REMOVE_QUIZ: 'REMOVE_QUIZ',
  SELECT_QUIZ: 'SELECT_QUIZ',
  RESET_CURRENT: 'RESET_CURRENT',
  UPDATE_CURRENT: 'UPDATE_CURRENT',
  ADD_TO_LIST: 'ADD_TO_LIST'
}
const state = {
  all: [],
  currentQuiz: {},
  lst: []
}

const mutations = {
  [mutationTypes.SELECT_QUIZ] (state, selectedQuiz) {
    let filter = state.all.filter(x => selectedQuiz && x.id == selectedQuiz.id)
    if (filter.length) {
      state.currentQuiz = filter[0]
    }
  },
  [mutationTypes.SAVE_QUIZ] (state) { },
  [mutationTypes.REMOVE_QUIZ] (state) { },
  // buoc2 cap nhat state => cap nhat lai giao dien
  [mutationTypes.RECEIVE_QUIZS] (state, { quizList }) {
    state.all = quizList
  },
  [mutationTypes.RESET_CURRENT] (state) {
    state.currentQuiz = {}
  },
  [mutationTypes.UPDATE_CURRENT] (state, quiz) {
    state.currentQuiz = quiz
  }
}
const actions = {

  getAll: Promise.coroutine(function* ({ commit }) {
    let quizList = yield quizService.getAll()
    // buoc1 action 
    // lay data tu api => done=> commit 1 cai mutation 
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
  }),
  removeQuiz: Promise.coroutine(function* ({ commit }, quiz) {
    var ret = yield quizService.remove(quiz.id)
  }),
  updateCurrent: Promise.coroutine(function* ({ commit }, selectedQuiz) {
    commit(mutationTypes.UPDATE_CURRENT, selectedQuiz)
  })

}

const getters = {
  all: state => state.all,
  currentQuiz: state => state.currentQuiz,
  title: state => _.isEmpty(state.currentQuiz) ? 'Tạo mới' : 'Cập nhật'
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
