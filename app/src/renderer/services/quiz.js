import Promise from 'bluebird'
const pathEntity = '/api/Quizzes';
export class QuizServices {
    getQuizs = Promise.coroutine(function* () {
        yield axios.get(pathEntity)
    })
    getQuiz = Promise.coroutine(function* (id) {
        yield axios.get(`${pathEntity}/${id}`)
    })
    save = Promise.coroutine(function* (bindingEntity) {
        yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity)
    })
    remove = Promise.coroutine(function* (id) {
        yield axios.delete(`${pathEntity}/${id}`)
    })

}