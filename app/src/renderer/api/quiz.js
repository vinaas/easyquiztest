/**
 * Mocking client-server processing
 */
const _quizs = [{
    "id": 1,
    "question": "what ???"
}, ]

export default {
    getQuizs(cb) {
        cb(_quizs)
    }
}