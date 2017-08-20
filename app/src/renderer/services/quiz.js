import Promise from 'bluebird'
const pathEntity = '/api/Quizzes'
export class QuizService {
  getAll = Promise.coroutine(function* (filter) {
    let ret = yield axios.get(pathEntity)
    return ret.data
  })
  getBy = Promise.coroutine(function* (id) {
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
  getQuestionsBy = Promise.coroutine(function*(id) {
    let ret = yield axios.get(`${pathEntity}/${id}/questions`)
    return ret.data.map(x => {
      x.content = x.content || ''
      x.description = x.description || ''
      return x
    })
  })

}
