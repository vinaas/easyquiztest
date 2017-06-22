import Promise from 'bluebird';
const pathEntity = '/api/UsersQuizs';
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
     * getOne with opts
     * @param userId, quizId
     * @return {UsersQuizs}
     * @memberof UsersQuizsService
     */
    getOne = Promise.coroutine(function* (userId, quizId) {
        let ret = yield axios.post(`${pathEntity}/findOne`, {
            quizId: quizId,
            applicationUserId: userId
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

}