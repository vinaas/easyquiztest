// import * as mutationTypes from '../mutation-mutationTypes'
import quizApi from '../../api/quiz'
// import { QuizService } from '../../services/quiz'
import { KyThiService } from '../../services/ky-thi'
import { QuestionService } from '../../services/question'
import { UsersQuizsService } from '../../services/users-quizes'
import Promise from 'bluebird'

const co = Promise.coroutine

const kiThiService = new KyThiService()
const mutationTypes = {
  RECEIVE_QUIZ: 'RECEIVE_QUIZ',
}

const state = {
  quizs: []
}

// getters
// TODO refact here
const getters = {
  quizs: state => state.quizs,

}

// actions
const actions = {
  getQuizs: co(function* ({ commit }) {
    console.log("aaaKithi")
    let recQuizs = yield kiThiService.getAll()
    commit(mutationTypes.RECEIVE_QUIZ, recQuizs)
  })

}
const mutations = {
  [mutationTypes.RECEIVE_QUIZ](state, quizs) {
    state.quizs = quizs
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
