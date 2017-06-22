import Promise from 'bluebird'
const pathEntity = '/api/Quizzes';
export class QuizService {
    getAll = Promise.coroutine(function* () {
        let ret = yield axios.get(pathEntity)
        return ret.data
    })
    getQuiz = Promise.coroutine(function* (id) {
        let ret = yield axios.get(`${pathEntity}/${id}`)
        return ret.data
    })
    save = Promise.coroutine(function* (bindingEntity) {
        let ret = yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity)
        return ret.data
    })
    remove = Promise.coroutine(function* (id) {
        let ret = yield axios.delete(`${pathEntity}/${id}`)
        return ret.data
    })
    getQuestions = Promise.coroutine(function*(id){

    })

}