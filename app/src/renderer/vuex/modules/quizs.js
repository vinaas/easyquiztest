// import * as mutationTypes from '../mutation-mutationTypes'
import quizApi from '../../api/quiz'
import { QuizService } from '../../services/quiz'
import { QuestionService } from '../../services/question'
import { UsersQuizsService} from '../../services/users-quizes'

const quizSrv = new QuizService()
const qustonSrv = new QuizService()
const usersQuizsSrv = new UsersQuizsService()

const mutationTypes= {
  RECEIVE_QUIZS : 'RECEIVE_QUIZS',
  GO_TO_QUESTION : 'GO_TO_QUESTION',
  ANSWERE_A_QUESTION : 'ANSWERE_A_QUESTION'
}

const state = {
  all: [],
  quiz:{},
  currentQuestion: {id: 1},
  answereds: 0

}

// getters
const getters = {
  getAllQuizs: state => state.all,
  getCurrentQuestion: (state) => state.currentQuestion,
  previous: (state) => state.all.length !== 0 && state.all.map(x => x).shift().id !== state.currentQuestion.id,
  next: (state) => state.all.length !== 0 && state.currentQuestion.id !== state.all.map(x => x).pop().id,
  answereds: (state) => state.all.filter(x => x.isAnswered == true).length
}

// actions
const actions = {
  getAllQuizs ({commit}) {
    quizApi.getQuizs().then(function (quizs) {
      commit(mutationTypes.RECEIVE_QUIZS, {
        quizs
      })
    })
  },
  goToQuestion ({commit}, currentQuestion) {
    commit(mutationTypes.GO_TO_QUESTION, {
      id: currentQuestion.id
    })
  },
  answer ({commit}) {
    commit(mutationTypes.ANSWERE_A_QUESTION)
  }
}
const mutations = {
  [mutationTypes.RECEIVE_QUIZS] (state, {
        quizs
    }) {
    state.all = quizs
  },
  [mutationTypes.GO_TO_QUESTION] (state, question) {
    let questionFilter = state.all.filter(x => x.id == question.id)
    if (questionFilter) {
      state.currentQuestion = questionFilter[0]
    }
  },
  [mutationTypes.ANSWERE_A_QUESTION] (state) {
    state.all.forEach(function (current, index, arr) {
      if (current.id === state.currentQuestion.id) {
        current.isAnswered = true
      }
    })
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
