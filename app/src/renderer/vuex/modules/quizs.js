// import * as mutationTypes from '../mutation-mutationTypes'
import quizApi from '../../api/quiz'
// import { QuizService } from '../../services/quiz'
import { QuizService } from '../../services/quiz'
import { QuestionService } from '../../services/question'
import { UsersQuizsService} from '../../services/users-quizes'
import Promise from 'bluebird';

const co = Promise.coroutine;

const quizSrv = new QuizService()
const questionSrv = new QuestionService()
const usersQuizsSrv = new UsersQuizsService()

const mutationTypes= {
  RECEIVE_QUIZ : 'RECEIVE_QUIZ',
  RECEIVE_QUESTIONS:'RECEIVE_QUESTIONS',
  GO_TO_QUESTION : 'GO_TO_QUESTION',
  ANSWERE_A_QUESTION : 'ANSWERE_A_QUESTION'
}

const state = {
  questions: [],
  quiz:{},
  currentQuestion: {id: 1},
  answereds: 0,
  detailUserAnswer : {}
}

// getters
const getters = {
  getQuiz: state => state.quiz,
  getCurrentQuestion: (state) => state.currentQuestion,
  previous: (state) => state.questions.length !== 0 && state.questions.map(x => x).shift().id !== state.currentQuestion.id,
  next: (state) => state.questions.length !== 0 && state.currentQuestion.id !== state.questions.map(x => x).pop().id,
  answereds: (state) => state.questions.filter(x => x.isAnswered == true).length
}

// actions
const actions = {
  getQuiz : co(function * ({commit}, id) {
    let recQuiz = yield quizSrv.getBy(id)
    commit(mutationTypes.RECEIVE_QUIZ,  recQuiz)
  }),
  getQuestions : co(function*( {commit}, quizId){
    let recQuestions = yield quizSrv.getQuestionsBy(quizId);
    commit(mutationTypes.RECEIVE_QUESTIONS , recQuestions )
  }),
  goToQuestion : co( function*({commit}, currentQuestion) {
    commit(mutationTypes.GO_TO_QUESTION, {
      id: currentQuestion.id
    })
  }),
  answer : co(function* ({commit} , detail) {
    commit(mutationTypes.ANSWERE_A_QUESTION)
  })
}
const mutations = {
  [mutationTypes.RECEIVE_QUIZ] (state, quiz) {
    state.quiz = quiz
  },
  [mutationTypes.GO_TO_QUESTION] (state, question) {
    let questionFilter = state.questions.filter(x => x.id == question.id)
    if (questionFilter) {
      state.currentQuestion = questionFilter[0]
    }
  },
  [mutationTypes.ANSWERE_A_QUESTION] (state) {
    state.questions.forEach(function (current, index, arr) {
      if (current.id === state.currentQuestion.id) {
        current.isAnswered = true
      }
    })
  },
  [mutationTypes.RECEIVE_QUESTIONS] (state , questions) {
    state.questions = questions
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
