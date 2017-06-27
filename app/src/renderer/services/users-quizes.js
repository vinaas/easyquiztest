import Promise from 'bluebird'
const co = Promise.coroutine
const pathEntity = '/api/UsersQuizs'
import {    QuestionService} from './question'
import {    QuizService} from './quiz'
import Logger from '../../common/logger'
const logger = Logger('UsersQuizsService')
import _ from 'lodash'
const questionSrv = new QuestionService()
const quizSrv = new QuizService()

export class UsersQuizsService {

    getAll = co(function* () {
        let ret = yield axios.get(pathEntity)
        return ret.data
    })
    getBy = co(function* (id) {
        let ret = yield axios.get(`${pathEntity}/${id}`)
        return ret.data
    })
    /**
     * getOne with ( userId, quizId)
     * @param userId, quizId
     * @return {UsersQuizs}
     * @memberof UsersQuizsService
     */
    getOne = co(function* (userId, quizId) {
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
    save = co(function* (bindingEntity) {
        let ret = yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity)
        return ret.data
    })
    remove = co(function* (id) {
        let ret = yield axios.delete(`${pathEntity}/${id}`)
        return ret.data
    })
    /**
     * paras  (id, question)    
     * 
     * @memberof UsersQuizsService
     */
    userAnswerQuestion = co(function* (dto) {
        let question = dto.question
        let usersQuizs = dto.usersQuizsRow
        let questions = dto.questions
        let answerDetail = usersQuizs.answerDetail
        let mapthroughtUserAnser = questions.map(x => {
            let extUserAnswer = answerDetail.filter(a => x.id == a.id).shift()
            if (extUserAnswer) {
                return extUserAnswer
            } else return x
        })
        logger.debug('mapthroughtUserAnser', mapthroughtUserAnser)
        let mapthroughtQuestion = mapthroughtUserAnser.map(x => {
            if (x.id == question.id) {
                return question
            } else return x
        })
        logger.debug('mapthroughtQuestion', mapthroughtQuestion)
        let entity = Object.assign({}, usersQuizs, {
            answerDetail: mapthroughtQuestion
        })
        let rec = yield this.save(entity)
        return rec

    }).bind(this)



    getUserAnserQuestion = co(function* (id, questionId) {
        let entity = yield this.getBy(id)
        let answerDetail = entity.answerDetail
        let questionEntity = yield questionSrv.getBy(questionId)
        let question = answerDetail.filter(x => x.id == questionId)
        return Object.assign({}, questionEntity, question)
    }).bind(this)


    calculateResultQuizTest = co(function* (dto) {
        let me = this
        logger.debug('*****Begin calculateResultQuizTest paras', dto)
        let usersQuizsRow = dto.usersQuizsRow
        let questions = dto.questions
        let answerDetail = usersQuizsRow.answerDetail
        logger.debug('answerDetail', answerDetail)
        let mapDetail = answerDetail.map(x => {
            let ret = {}
            let mapAnswer = x.answersForAQuestions.filter(a => a.isCorrect == true).map(a => a.id) 
            let userAnswer = (x.userCheck)? x.userCheck.map(x=>x) : [] // fix mutation vue
            let resultForUserAnswerQuestion = _.isEqual( mapAnswer.sort(), userAnswer.sort())
            ret = Object.assign({}, x, {
                userAnswerResult: resultForUserAnswerQuestion
            })
            return ret
        })

        let entity = Object.assign({}, usersQuizsRow, {
            answerDetail: mapDetail,
            scopes: mapDetail.filter(x => x.userAnswerResult == true).length / questions.length * 10
        })
        entity.scopes = mapDetail.filter( x=>x.userAnswerResult ==true).length / questions.length *10
        entity.scopesPraction = `${ mapDetail.filter( x=>x.userAnswerResult ==true).length }/${questions.length}`
        let rec = yield me.save(entity)
        logger.info("*****end calculateResultQuizTest")
        return rec

    })

}