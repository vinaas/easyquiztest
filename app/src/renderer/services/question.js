import Promise from 'bluebird'
const pathEntity = '/api/questions'
const co = Promise.coroutine

export class QuestionService {
    getAll = co(function*() {
        let ret = yield axios.get(pathEntity)
        return ret.data.map(x => {
            x.type = x.type || ''
            x.content = x.content || ''
            x.description = x.description || ''
            return x
        })
    })
    search = co(function*(keyword, page, pageSize) {
        let ret = yield axios.get(`${pathEntity}?filter['limit']=${pageSize}&filter['skip']=${page * pageSize}`)

        return ret.data
    })
    getBy = co(function*(id) {
        let ret = yield axios.get(`${pathEntity}/${id}`)

        return ret.data
    })
    save = co(function*(bindingEntity) {
        let ret = yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity)
        return ret.data
    })
    remove = co(function*(id) {
        let ret = yield axios.delete(`${pathEntity}/${id}`)
        return ret.data
    })
    removeAnswersBy = co(function*(id) {
        let ret = yield axios.delete(`${pathEntity}/${id}/answersForAQuestions`)
        return ret.data
    })
    updateAnswers = co(function*(question) {
        yield axios.delete(`${pathEntity}/${question.id}/answersForAQuestions`)
        yield this.save(question)
        return true
    })

}