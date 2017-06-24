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
  RECEIVE_USERS_QUIZS_ROW : 'RECEIVE_USERS_QUIZS_ROW',
  GO_TO_QUESTION : 'GO_TO_QUESTION',
  ANSWERE_A_QUESTION : 'ANSWERE_A_QUESTION',
  UPDATE_USE_CHECK_CURRENT_QUESTION : 'UPDATE_USE_CHECK_CURRENT_QUESTION'
}

const state = {
  questions: [],
  userQuestions:[],
  quiz:{},
  answereds: 0,
  usersQuizsRow:{answerDetail:[]},
  currentQuestionId:0
}

// getters
const getters = {
  questions : state => state.questions ,
  mapUserQuestions :  state => state.questions.map(x=> {
    let getUserCheckQuestion = state.usersQuizsRow.answerDetail.filter(y=>y.id==x.id ).shift()
    let userCheck = []
    if (getUserCheckQuestion) userCheck = getUserCheckQuestion.userCheck || []
    let userQuestion = Object.assign({}, x , 
    { userCheck: userCheck, isAnswered : userCheck.length!==0  }, 
    { number : state.questions.map(x=>x.id).indexOf(state.currentQuestionId)+1 } )
    return userQuestion
  }) ,
  quiz: state => state.quiz,
  currentQuestion:  state => state.questions.filter(x=>x.id == state.currentQuestionId ).map(x=> {
    let getUserCheckQuestion = state.usersQuizsRow.answerDetail.filter(y=>y.id==x.id ).shift()
    let userCheck = []
    if (getUserCheckQuestion) userCheck = getUserCheckQuestion.userCheck || []
    let userQuestion = Object.assign({}, x , 
    { userCheck: userCheck, isAnswered : userCheck.length!==0  }, 
    { number : state.questions.map(x=>x.id).indexOf(state.currentQuestionId)+1 } )
    return userQuestion
  }).shift()||{},
  previous :(state)=> true,
  next : (state)=> true,
  // previous: (state) => state.questions.length !== 0 && state.questions.map(x => x).shift().id !== state.currentQuestion.id,
  // next: (state) => state.questions.length !== 0 && state.currentQuestion.id !== state.questions.map(x => x).pop().id,
  answereds: (state) => state.userQuestions.filter(x => x.userCheck.length !== 0).length
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
  getUsersQuizsRow : co(function*({commit}, { userId, quizId } ){
    let recUsersQuizsRow ;
    try {
        recUsersQuizsRow =  yield usersQuizsSrv.getOne( userId, quizId )
    } catch (error) {
      yield usersQuizsSrv.save({
                                "answerDetail": [{}],
                                "result": "string",
                                "scopes": 0,
                                "scopesPraction": "string",
                                "quizId": quizId,
                                "applicationUserId": userId
                                })
      recUsersQuizsRow =  yield usersQuizsSrv.getOne( userId, quizId )
    }
    commit(mutationTypes.RECEIVE_USERS_QUIZS_ROW, recUsersQuizsRow)
  }),
  goToQuestion : co( function*({commit}, questionId) {
    commit(mutationTypes.GO_TO_QUESTION, questionId)
  }),
  answer : co(function* ({ dispatch, commit , state } , question) {
    console.log('quétin',question)
    let rec = yield usersQuizsSrv.userAnswerQuestion( state.usersQuizsRow.id, question )
    yield dispatch('getUsersQuizsRow', {userId : JSON.parse(sessionStorage.getItem('userinfo')).userId , quizId : state.quizId })
    commit(mutationTypes.ANSWERE_A_QUESTION )
  })
}
const mutations = {
  [mutationTypes.RECEIVE_QUIZ] (state, quiz) {
    state.quiz = quiz
  },
  [mutationTypes.GO_TO_QUESTION] (state, currentQuestionId) {
    state.currentQuestionId = currentQuestionId
  },
  [mutationTypes.RECEIVE_QUESTIONS] (state , questions) {
    state.questions = questions
  },
  [mutationTypes.RECEIVE_USERS_QUIZS_ROW](state, usersQuizsRow ){
    console.log('mutationTypes usersQuizsRow',usersQuizsRow)
    state.usersQuizsRow = usersQuizsRow
  },
  [mutationTypes.ANSWERE_A_QUESTION]( state ){
   
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
