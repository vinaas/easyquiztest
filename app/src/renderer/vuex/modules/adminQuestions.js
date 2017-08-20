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
const quizService = new QuizService()
const mutationTypes = {
  RECEIVE_QUESTIONS: 'RECEIVE_QUESTIONS',
  SAVE_QUESTION: 'SAVE_QUESTION',
  REMOVE_QUESTION: 'REMOVE_QUESTION',
  CURRENT_QUESTION: 'CURRENT_QUESTION',
  UPDATE_CURRENT_QUESTION: 'UPDATE_CURRENT_QUESTION',
  RESET_CURRENT: 'RESET_CURRENT',
  UPDATE_CURRENT: 'UPDATE_CURRENT',
  UPDATE_ANSWERS: 'UPDATE_ANSWERS',
  QUESTIONS_OF_QUIZ: 'QUESTIONS_OF_QUIZ',
  SELECT_ANSWERS: 'SELECT_ANSWERS',
  UPDATE_ANSWERS_CURRENT: 'UPDATE_ANSWERS_CURRENT',
  ADD_TO_LIST: 'ADD_TO_LIST'
}
const state = {
  all: [],

  questionsOfQuiz: [],
  currentAnswers: {},
  lst: { data: ['A']}
}

const mutations = {
  [mutationTypes.UPDATE_ANSWERS_CURRENT] (state, selectedAnswers) {
    state.currentAnswers = selectedAnswers
  },
  [mutationTypes.SELECT_ANSWERS] (state, selectedAnswers) {
    state.currentAnswers = selectedAnswers
  },
  [mutationTypes.SAVE_QUESTION] (state) {},
  [mutationTypes.REMOVE_QUESTION] (state) {},
  [mutationTypes.RECEIVE_QUESTIONS] (state, {
    questionList
  }) {
    state.all = questionList
  },
  [mutationTypes.UPDATE_ANSWERS] (state) {

  },
  [mutationTypes.QUESTIONS_OF_QUIZ] (state, {questionsOfQuiz}) {
    state.questionsOfQuiz = questionsOfQuiz
  }
}

const actions = {
  add: function ({commit}) {
    commit(mutationTypes.ADD_TO_LIST)
  },
  getAll: Promise.coroutine(function* ({
    commit
  }) {
    let questionList = yield questionService.getAll()
    commit(mutationTypes.RECEIVE_QUESTIONS, {
      questionList
    })
  }),
  selectAnswers: function ({
    commit
  }, selectedAnswers) {
    commit(mutationTypes.SELECT_ANSWERS, selectedAnswers)
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

  updateAnswers: Promise.coroutine(function* ({commit}, question) {
    yield answerService.updateAnswers(question)
    commit(mutationTypes.UPDATE_ANSWERS)
  }),
  getQuestionsOfQuiz: Promise.coroutine(function* ({commit}, quizId) {
    let questionsOfQuiz = yield quizService.getQuestionsBy(quizId)
    commit(mutationTypes.QUESTIONS_OF_QUIZ, {questionsOfQuiz})
  }),
  updateAnswersCurrent: Promise.coroutine(function* ({
    commit
  }, selectedAnswers) {
    commit(mutationTypes.UPDATE_ANSWERS_CURRENT, selectedAnswers)
  })

}

const getters = {
  currentAnswers: state => state.currentAnswers,
  questionsOfQuiz: state => state.questionsOfQuiz,
  all: state => state.all,
  currentQuestion: state => state.currentQuestion

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
