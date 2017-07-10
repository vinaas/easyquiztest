import * as types from '../mutation-types'

import {
  QuestionService
} from '../../services/question'
import {
  AnswersForAQuestionService
} from '../../services/answers-for-aquestion'
import {
  QuizService
} from '../../services/quiz.js'
import Promise from 'bluebird'
import _ from 'lodash'
const questionService = new QuestionService()
const answerService = new AnswersForAQuestionService()
const quizService=new QuizService();
const mutationTypes = {
  RECEIVE_QUESTIONS: 'RECEIVE_QUESTIONS',
  SAVE_QUESTION: 'SAVE_QUESTION',
  REMOVE_QUESTION: 'REMOVE_QUESTION',
  SELECT_QUESTION: 'SELECT_QUESTION',
  RESET_CURRENT: 'RESET_CURRENT',
  UPDATE_CURRENT: 'UPDATE_CURRENT',
  UPDATE_ANSWERS: 'UPDATE_ANSWERS',
  QUESTIONS_OF_QUIZ:'QUESTIONS_OF_QUIZ'
 
}
const state = {
  all: [],
  currentQuestion: {},
  questionsOfQuiz:[]
}

const mutations = {
  [mutationTypes.SELECT_QUESTION](state, selectedQuestion) {
    let filter = state.all.filter(x => selectedQuestion && x.id == selectedQuestion.id)
    if (filter.length) {
      state.currentQuestion = filter[0]
    }
  },
  [mutationTypes.SAVE_QUESTION](state) {},
  [mutationTypes.REMOVE_QUESTION](state) {},
  [mutationTypes.RECEIVE_QUESTIONS](state, {
    questionList
  }) {
    state.all = questionList
  },
  [mutationTypes.RESET_CURRENT](state) {
    state.currentQuestion = {}
  },
  [mutationTypes.UPDATE_CURRENT](state, question) {
    state.currentQuestion = question
  },

  [mutationTypes.UPDATE_ANSWERS](state) {

  },
  [mutationTypes.QUESTIONS_OF_QUIZ](state,{questionsOfQuiz}) {
     state.questionsOfQuiz=questionsOfQuiz
  }}
const actions = {
  getAll: Promise.coroutine(function* ({
    commit
  }) {
    let questionList = yield questionService.getAll()

    commit(mutationTypes.RECEIVE_QUESTIONS, {
      questionList
    })
  }),
  selectQuestion: function ({
    commit
  }, selectedQuestion) {
    commit(mutationTypes.SELECT_QUESTION, selectedQuestion)
  },
  saveQuestion: Promise.coroutine(function* ({
    commit
  }, selectedQuestion) {
    var ret = yield questionService.save(selectedQuestion)
    commit(mutationTypes.SAVE_QUESTION)
  }),

  removeQuestion: Promise.coroutine(function* ({
    commit
  }, question) {
    var ret = yield questionService.remove(question.id)
  }),
  updateCurrent: Promise.coroutine(function* ({
    commit
  }, selectedQuestion) {
    commit(mutationTypes.UPDATE_CURRENT, selectedQuestion)
  }),
  updateAnswers: Promise.coroutine(function* ({commit}, answers) {
      yield answerService.updateAnswers(answers)
      commit(mutationTypes.UPDATE_ANSWERS)
  }),
  getQuestionsOfQuiz: Promise.coroutine(function* ({commit}, quizId) {
      let questionsOfQuiz=yield quizService.getQuestionsBy(quizId)
      commit(mutationTypes.QUESTIONS_OF_QUIZ,{questionsOfQuiz})
  })

  

}

const getters = {
  questionsOfQuiz:state=>state.questionsOfQuiz,
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