import Promise from 'bluebird'
import {
  QuestionService
} from './question'

const questionSrv = new QuestionService()
const pathEntity = '/api/AnswersForAQuestions'
const co = Promise.coroutine

import _ from 'lodash'
export class AnswersForAQuestionService {
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

  updateAnswers = co(function* (question) {
    let questionId = question.questionId
    let rec;
    if (_isEmpty(question.answersForAQuestions) == true) {
        rec = yield this.save(question);
    } else {
      let oldAnswers = yield questionSrv.removeAnswersBy(questionId)
      let tasks = question.answersForAQuestions.map(x => this.save(x))
      rec = yield Promise.all(tasks)
    }
    return rec;
  })
}