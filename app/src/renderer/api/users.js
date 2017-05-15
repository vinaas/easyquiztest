export default {
    getAll() {
        return Promise.resolve(_users)
    },
    getBy(id) {

        return Promise.resolve(_users.filter(x => x.id == id))
    }
}
const _users = [{
    id: 1,
    userName: 'aabb',
    fname: 'tung',
    lname: 'pham',
    exams: [{
        id: 1,
        examId: 1,
        quizId:1,
        answers: [{
                questionId: 1,
                answer: [1],
                result:true
            },
            {
                questionId: 2,
                answer: [1,2],
                result:false
            }
        ]

    }]
}]