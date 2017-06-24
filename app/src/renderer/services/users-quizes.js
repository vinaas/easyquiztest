import Promise from 'bluebird';
const pathEntity = '/api/UsersQuizs';
import { QuestionService } from './question'
const questionSrv =  new QuestionService();

export class UsersQuizsService {

    getAll = Promise.coroutine(function* () {
        let ret = yield axios.get(pathEntity)
        return ret.data
    })
    getBy = Promise.coroutine(function* (id) {
        let ret = yield axios.get(`${pathEntity}/${id}`)
        return ret.data
    })
    /**
     * getOne with ( userId, quizId)
     * @param userId, quizId
     * @return {UsersQuizs}
     * @memberof UsersQuizsService
     */
    getOne = Promise.coroutine(function* (userId, quizId) {
        let filter = {
            fields: {
                quizId: quizId,
                applicationUserId: userId
            }
        }
        let ret = yield axios.get(`${pathEntity}/findOne`, {
            params: filter
        })
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
    userAnswerQuestion = Promise.coroutine(function* (id, question) {
        let usersQuizs = yield this.getBy(id)
        let answerDetail = usersQuizs.answerDetail
        let mapAnserDetail = answerDetail.map(x => {
            if (x.id == question.id) {
                return question
            } else return x
        })
        let entity = Object.assign({}, usersQuizs, {
            answerDetail: mapAnserDetail
        })
        let rec = yield this.save(entity)
        return rec.data

    }).bind(this)

    

    getUserAnserQuestion = Promise.coroutine(function* (id, questionId) {
        let entity = yield this.getBy(id)
        let answerDetail = entity.answerDetail
        let questionEntity = yield questionSrv.getBy(questionId)
        let question = answerDetail.filter(x => x.id == questionId)
        return Object.assign({}, questionEntity, question)
    }).bind(this)

}