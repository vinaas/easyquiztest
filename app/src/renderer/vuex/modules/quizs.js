import * as types from '../mutation-types'
import quizApi from '../../api/quiz'
const state = {
    all: [],
    currentQuestion: {id:1},
    next: true,
    previous: true,
    answereds: 0,

}

// getters
const getters = {
    getAllQuizs: state => state.all,
    getCurrentQuestion: (state) => state.currentQuestion,
    previous: (state) =>state.all.length!==0 && state.all.map(x => x).shift().id !== state.currentQuestion.id,
    next: (state) => state.all.length!==0 && state.currentQuestion.id !== state.all.map(x => x).pop().id,
    answereds : (state)=> state.all.filter(x=>x.userAnswered.length !== 0).length
}

// actions
const actions = {
    getAllQuizs({commit}) {
        quizApi.getQuizs().then(function (quizs) {
            commit(types.RECEIVE_QUIZS, {
                quizs
            })
        })
    },
    goToQuestion({commit}, currentQuestion) {
        commit(types.GO_TO_QUESTION, {
            id: currentQuestion.id
        })
    },
    answer({commit}){
        commit(types.ANSWERE_A_QUESTION)
    }
}
const mutations = {
    [types.RECEIVE_QUIZS](state, {
        quizs
    }) {
        state.all = quizs
    },
    [types.GO_TO_QUESTION](state, question) {
        let questionFilter = state.all.filter(x => x.id == question.id)
        if (questionFilter) {
            state.currentQuestion = questionFilter[0]
        }
    },
    [types.ANSWERE_A_QUESTION](state) {
         
        state.all.forEach(function(current,index,arr) {
            if(current.id ===  state.currentQuestion.id ){
                current.isAnswered = true
            }
        });
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}