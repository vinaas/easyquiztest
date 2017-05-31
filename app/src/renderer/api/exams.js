export default {
  getAll () {

  },
  getBy (id) {

  }
}
const exams = [{
  'id': '1', // mã kì thi
  'startTime': 'xxx', // thời gian bắt đầu kì thi
  'endTime': 'xxx', // thời gian kết thúc thi

  'quizStatus': 'available', // trạng thái kì thi: available :đang diễn ra | notstart: sắp diễn ra | completed đã kết thúc. Trạng thái có thể dựa vào startTime, endTime để tính, hoặc thiết lập bằng tay, ví dụ ngưng kì thi khi vẫn chưa tới thời gian kết thúc

  'quizInfo': { // Thông tin kì thi
    'quizName': 'kiểm tra 60 phút', // "tên kì thi",
    'quizTime': '6/5/2017' // "khóa thi"
  }
}]
