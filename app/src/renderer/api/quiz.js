/**
 * Mocking client-server processing
 */
const _quizs = [{
        "id": 1,
        "type": "checkbox",
        "description": "what ???",
        "answers": [{
                "id": "A",
                "content": "Nội dung đáp án A",
                "isUserChecked": false
            },
            {
                "id": "B",
                "content": "Nội dung đáp án B",
                "isUserChecked": false
            },
            {
                "id": "C",
                "content": "Nội dung đáp án C",
                "isUserChecked": false
            },
            {
                "id": "D",
                "content": "Nội dung đáp án D",
                "isUserChecked": false
            }
        ],
        "isAnswered": false,
        "correctAnswers": ["A"]
    },
    {
        "id": 2,
        "type": "radio",
        "description": "what 2???",
        "answers": [{
                "id": "A",
                "content": "Nội dung đáp án A",
                "isUserChecked": true
            },
            {
                "id": "B",
                "content": "Nội dung đáp án B",
                "isUserChecked": false
            },
            {
                "id": "C",
                "content": "Nội dung đáp án C",
                "isUserChecked": false
            },
            {
                "id": "D",
                "content": "Nội dung đáp án D",
                "isUserChecked": false
            }
        ],
        "isAnswered": false,
        "correctAnswers": ["A"]

    },
    {
        "id": 3,
        "type": "radio",
        "description": "what 3???",
        "answers": [{
                "id": "A",
                "content": "Nội dung đáp án A",
                "isUserChecked": false
            },
            {
                "id": "B",
                "content": "Nội dung đáp án B",
                "isUserChecked": false
            },
            {
                "id": "C",
                "content": "Nội dung đáp án C",
                "isUserChecked": false
            },
            {
                "id": "D",
                "content": "Nội dung đáp án D",
                "isUserChecked": false
            }
        ],
        "isAnswered": false,
        "correctAnswers": ["A"]

    }


]

export default {
    getQuizs() {
        return Promise.resolve(_quizs)
    }
}