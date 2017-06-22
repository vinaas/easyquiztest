import {
    UsersQuizsService
} from '../../../app/src/renderer/services/users-quizes'
const srv = new UsersQuizsService();

describe('test findOne UsersQuizs', function () {
    it('should ret data', function () {
        srv.getOne( "592ff76d5fc5ed23ec231333","592e41ea5420803fec1137a8").then(data => {
            assert.equal(data.quizId , "592e41ea5420803fec1137a8", "equivalent quizId")
        })
    })
})