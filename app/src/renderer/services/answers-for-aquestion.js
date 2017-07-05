import Promise from 'bluebird'
const pathEntity = '/api/AnswersForAQuestions'
export class AnswersForAQuestionService {
  getAll = Promise.coroutine(function* () {
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

}
