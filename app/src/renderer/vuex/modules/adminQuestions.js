import * as types from '../mutation-types'
import { QuestionService } from '../../services/question'
import Promise from 'bluebird'
import _ from 'lodash'
const questionService = new QuestionService()
const mutationTypes = {
  RECEIVE_QUESTIONS: 'RECEIVE_QUESTIONS',
  SAVE_QUESTION: 'SAVE_QUESTION',
  REMOVE_QUESTION: 'REMOVE_QUESTION',
  SELECT_QUESTION: 'SELECT_QUESTION',
  RESET_CURRENT: 'RESET_CURRENT',
  UPDATE_CURRENT: 'UPDATE_CURRENT'
}
const state = {
  all: [],
  currentQuestion: {}
}

const mutations = {
  [mutationTypes.SELECT_QUESTION] (state, selectedQuestion) {
    let filter = state.all.filter(x => selectedQuestion && x.id == selectedQuestion.id)
    if (filter.length) {
      state.currentQuestion = filter[0]
    }
  },
  [mutationTypes.SAVE_QUESTION] (state) { },
  [mutationTypes.REMOVE_QUESTION] (state) { },
  [mutationTypes.RECEIVE_QUESTIONS] (state, { questionList }) {
    state.all = questionList
  },
  [mutationTypes.RESET_CURRENT] (state) {
    state.currentQuestion = {}
  },
  [mutationTypes.UPDATE_CURRENT] (state, question) {
    state.currentQuestion = question
  }
}
const actions = {
  getAll: Promise.coroutine(function* ({ commit }) {
    let questionList = yield questionService.getAll()
  
    commit(mutationTypes.RECEIVE_QUESTIONS, {
      questionList
    })
  }),
  selectQuestion: function ({ commit }, selectedQuestion) {
    commit(mutationTypes.SELECT_QUESTION, selectedQuestion)
  },
  saveQuestion: Promise.coroutine(function* ({ commit }, selectedQuestion) {
    var ret = yield questionService.save(selectedQuestion)
    commit(mutationTypes.SAVE_QUESTION)
  }),
  removeQuestion: Promise.coroutine(function* ({ commit }, question) {
    var ret = yield questionService.remove(question.id)
  }),
  updateCurrent: Promise.coroutine(function* ({ commit }, selectedQuestion) {
    commit(mutationTypes.UPDATE_CURRENT, selectedQuestion)
  })

}

const getters = {
  all: state => state.all,
  currentQuestion: state => state.currentQuestion,
  title: state => _.isEmpty(state.currentQuestion) ? 'Tạo mới' : 'Cập nhật'
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
