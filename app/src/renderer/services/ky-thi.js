import Promise from 'bluebird'
const pathEntity = '/api/quizzes'
const co = Promise.coroutine

export class KyThiService {
  getAll = co(function* () {
    let ret = yield axios.get(pathEntity)
    return ret.data
  })
  getBy = co(function* (id) {
    let ret = yield axios.get(`${pathEntity}/${id}`)

    return ret.data
  })
  save = co(function* (bindingEntity) {
    let ret = yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity)
    return ret.data
  })
  remove = co(function* (id) {
    let ret = yield axios.delete(`${pathEntity}/${id}`)
    return ret.data
  })
}
