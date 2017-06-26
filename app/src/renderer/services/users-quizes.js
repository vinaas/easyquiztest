import Promise from 'bluebird';
const pathEntity = '/api/UsersQuizs';
import { QuestionService } from './question'
import { QuizService } from './quiz'
const questionSrv =  new QuestionService()
const quizSrv = new QuizService();

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
    /**
     * paras  (id, question)    
     * 
     * @memberof UsersQuizsService
     */
    userAnswerQuestion = Promise.coroutine(function* (dto) {
        let question =  dto.question
        let usersQuizs = dto.usersQuizsRow
        let questions = dto.questions
        let answerDetail = usersQuizs.answerDetail
        let mapthroughtUserAnser = questions.map(x => {
            let extUserAnswer =  answerDetail.filter(a => x.id == a.id).shift()
            if(extUserAnswer){
                return extUserAnswer
            }
            else return x           
        })
        console.log('mapthroughtUserAnser',mapthroughtUserAnser)
        let mapthroughtQuestion = mapthroughtUserAnser.map(x=> {
            if(x.id == question.id){
                return question
            }
            else return x
        })
        console.log('mapthroughtQuestion',mapthroughtQuestion)
        let entity = Object.assign({}, usersQuizs, {
            answerDetail: mapthroughtQuestion
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

    exists = Promise.coroutine( function*(userId, quizId){
        
    })

}