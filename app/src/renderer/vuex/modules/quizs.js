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
  RECEIVE_USER_QUESTIONS : 'RECEIVE_USER_QUESTIONS',
  GO_TO_QUESTION : 'GO_TO_QUESTION',
  ANSWERE_A_QUESTION : 'ANSWERE_A_QUESTION'
}

const state = {
  questions: [],
  userQuestions:[],
  quiz:{},
  currentQuestion: {id: 1},
  answereds: 0,
  detailUserAnswer : [],
  userCheck: []
}

// getters
const getters = {
  questions : state => state.questions ,
  userQuestions :  state => state.questions.map(x=> {
    let getUserCheck = state.detailUserAnswer.filter(y=> x.id==y.id ).shift() || []
    let userQuestion = Object.assign({}, x , { userCheck: getUserCheck } )
    return userQuestion
  }) ,
  quiz: state => state.quiz,
  getCurrentQuestion: (state) => state.currentQuestion,
  previous :(state)=> true,
  next : (state)=> true,
  answereds : (state)=> 1 
  // previous: (state) => state.questions.length !== 0 && state.questions.map(x => x).shift().id !== state.currentQuestion.id,
  // next: (state) => state.questions.length !== 0 && state.currentQuestion.id !== state.questions.map(x => x).pop().id,
  // answereds: (state) => state.userQuestions.filter(x => x.userCheck.length == 0).length
}

// actions
const actions = {
  getQuiz : co(function * ({commit}, id) {
    let recQuiz = yield quizSrv.getBy(id)
    commit(mutationTypes.RECEIVE_QUIZ,  recQuiz)
  }),
  getQuestions : co(function*( {commit}, quizId){
    let recQuestions = yield quizSrv.getQuestionsBy(quizId);
    console.log('recQuestions', recQuestions)
    commit(mutationTypes.RECEIVE_QUESTIONS , recQuestions )
  }),
  getUserQuestions : co(function*({commit}, { userId, quizId } ){
    let recUserQuestions =  yield usersQuizsSrv.getOne( userId, quizId )
    commit(mutations.RECEIVE_USER_QUESTIONS, recUserQuestions)
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
    console.log('dau phong', questions)
    state.questions = questions
  },
  [mutationTypes.RECEIVE_USER_QUESTIONS](state, userQuestions ){
    state.userQuestions = userQuestions
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
