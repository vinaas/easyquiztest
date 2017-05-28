_data = {
  scoresDecimal: '',
  scoresFraction: '6/10',
  detail: [{
    answer: 1,
    userCheck: ['A', 'B']
  }, {
    answer: 2,
    userCheck: ['A']
  }]
}
export default {
  getBy (userId, quizId) {
    return Promise.resolve(_data)
  }
}
