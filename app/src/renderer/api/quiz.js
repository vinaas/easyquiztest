/**
 * Mocking client-server processing
 */
const _quizs = [{
    "id": 1,
    "question": "what 1 ???"
},
{
    "id": 2,
    "question": "what 2???"
},
{
    "id": 3,
    "question": "what 3 ???"
}
 ]

export default {
    getQuizs(cb) {
        cb(_quizs)
    }
}