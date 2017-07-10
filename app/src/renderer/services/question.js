import Promise from 'bluebird'
const pathEntity = '/api/questions'
const co = Promise.coroutine

export class QuestionService {
  getAll = co(function* () {
    let ret = yield axios.get(pathEntity)
    return ret.data.map(x => {
      x.content= x.content || '';
      x.description = x.description || '';
      return x
    })
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
  removeAnswersBy = co ( function* (id){
    let ret = yield axios.delete(`${pathEntity}/${id}/answersForAQuestions`)
    return ret.data
  } ) 
}