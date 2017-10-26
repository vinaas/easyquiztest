
### Json schema theo User cho Bài Thi
> Khi Thi, kết quả sẽ được cập nhật tự động 15s lần

> Lúc kết thúc thi, có rất nhiều cập nhật từ người thi. Có thể delay để cập nhật 

```javascript
{
    //Lấy thông tin từ quizId
   "quizId" : "", //mã kì thi
   "startTime": "xxx", //thời gian bắt đầu kì thi
   "endTime" : "xxx",  //thời gian kết thúc thi
  
   "quizStatus" : "available", //trạng thái kì thi: available :đang diễn ra | notstart: sắp diễn ra | completed đã kết thúc. Trạng thái có thể dựa vào startTime, endTime để tính, hoặc thiết lập bằng tay, ví dụ ngưng kì thi khi vẫn chưa tới thời gian kết thúc
   
   "quizInfo" : { //Thông tin kì thi 
       "quizName": "kiểm tra 60 phút", //"tên kì thi",
       "quizTime" : "6/5/2017",  // "khóa thi" 
   },

   "totalTime" : 1800, //thời gian thi, countdown về 0, tính theo giây, 1800s = 30 phút
   "numberOfQuestions" : 20, //tổng số câu hỏi 
   "listQuestions" : [ //danh sách câu hỏi == numberOfQuestions,
    //thiết lập khi Gán Thí Sinh Tham gia kì thi 
    // => lựa chọn từ ngẫu nhiên từ danh sách câu hỏi thiết lập cho kì thi 
       {
          "id" : "001",  // mã câu hỏi: duy nhất trong ngân hàng câu hỏi
          "questionType" : "ratio | checkbox", //để hiển thị loại đáp án
          "description" : "xxx", //nội dung câu hỏi,
          "difficultLevel" : 1 => 10
          "categories" : []  //chuyên mục của câu hỏi
          "isRandom" : true | false, //Có xáo trộn câu trả lời hay không
          "listAnswers" : [  //danh sách câu trả lời để users lựa chọn, 
          //cho phép hoán đổi vị trí hiển thị, nhưng vẫn giữ id như cũ
              {
                  "id" : "1"
                  "content" : "Nội dung đáp án A",
                  "isCorrect" : true,
                  "answerByUser" : false //khi users chọn câu trả lời, lưu lựa chọn ở đây | Mặc định false
            },
              {
                  "id" : "2"
                  "content" : "Nội dung đáp án B",
                  "isCorrect" : false,
                  "answerByUser" : false //cập nhật khi user trả lời
              },
              {
                  "id" : "3"
                  "content" : "Nội dung đáp án C",
                  "isCorrect" : true,
                  "answerByUser" : true  //cập nhật khi user trả lời
              },
              {
                  "id" : "4"
                  "content" : "Nội dung đáp án D",
                  "isCorrect" : false,
                  "answerByUser" : false //cập nhật khi user trả lời
              }
          ],
          "correctAnswers" : true | false // answers.forEach(x => { if (x.isCorrect !== x.answerByUser) return false});
       },
       {
          "id" : "002",  
          "type" : "checkbox", 
          ...
       }
   ],

    //Query thông tin dựa trên userId
   "userInfo" : {   //Block: Thông tin thí sinh
       "userId" : "xxx", //duy nhất theo thí sinh
       "sbd" : "001", //số báo danh của thí sinh
       "userName" : "Nguyễn Văn A",
       "birthday" : "20/04/2000", //ngày sinh
   }

    //Cập nhật lúc thi
   "beginTime" : "xxxx", //thời gian bắt đầu thi, sau khi users bấm nút "Bắt Đầu" 
   "userStatus" : "prepare", //trạng thái của users đăng nhập,  prepare: chưa thi | started : đang thi | completed : đã thi xong

    "minPoint" : 1 - 10, //1 số thí sinh được ưu tiên ĐẬU, sẽ được gán điểm tối thiểu từ 1->10
    // minPoint: 8 điểm, với bài thi 20 câu, thì số câu trả lời đúng là 16 câu
    //nếu kết quả nhỏ hơn 16 câu đúng, thì sửa kết quả các câu SAI cho tổng số câu đúng được là 16

    //Cập nhật sau khi user kết thúc bài thi
   "summary" : { // sử dụng để hiển thị kết quả
       "result" : "Pass | Failt" //kết quả 
       "answeredPeriod" : "xxxx", //thời gian làm bài, tính đến lúc bấm "kết thúc thi" hoặc khi hết giờ
       "correct" : 4, //số câu trả lời đúng tính dựa vào answeredHistory
       "total" : 20,  // == numberOfQuestions
   }
}
```

### Json schema cho kì thi

```javascript
{
   "quizId" : "", //mã kì thi
   "startTime": "xxx", //thời gian bắt đầu kì thi
   "endTime" : "xxx",  //thời gian kết thúc thi
  
   "quizStatus" : "available", //trạng thái kì thi: available :đang diễn ra | notstart: sắp diễn ra | completed đã kết thúc. Trạng thái có thể dựa vào startTime, endTime để tính, hoặc thiết lập bằng tay, ví dụ ngưng kì thi khi vẫn chưa tới thời gian kết thúc
   
   "quizInfo" : { //Thông tin kì thi 
       "quizName": "kiểm tra 60 phút", //"tên kì thi",
       "quizTime" : "6/5/2017",  // "khóa thi" 
   },

   "totalTime" : 1800, //thời gian thi, countdown về 0, tính theo giây, 1800s = 30 phút
   "numberOfQuestions" : 20, // số câu hỏi cho 1 thí sinh
   "totalQuestions" : 100, // tổng số câu hỏi của kì thi
   "listQuestions" : [ //danh sách câu hỏi == totalQuestions,
   //chọn lựa từ Ngân Hàng Câu Hỏi: ngẫu nhiên | thủ công bởi Admin
       {
          "id" : "001",  // mã câu hỏi: duy nhất trong ngân hàng câu hỏi
          "questionType" : "ratio | checkbox", //để hiển thị loại đáp án
          "description" : "xxx", //nội dung câu hỏi,
          "difficultLevel" : 1 => 10
          "categories" : []  //chuyên mục của câu hỏi
          "isRandom" : true | false, //Có xáo trộn câu trả lời hay không
          "listAnswers" : [  //danh sách câu trả lời để users lựa chọn, 
          //cho phép hoán đổi vị trí hiển thị, nhưng vẫn giữ id như cũ
              {
                  "id" : "1"
                  "content" : "Nội dung đáp án A",
                  "isCorrect" : true,
                //  "answerByUser" : false //khi users chọn câu trả lời, lưu lựa chọn ở đây | Mặc định false
            },
              {
                  "id" : "2"
                  "content" : "Nội dung đáp án B",
                  "isCorrect" : false,
                //  "answerByUser" : false //cập nhật khi user trả lời
              },
              {
                  "id" : "3"
                  "content" : "Nội dung đáp án C",
                  "isCorrect" : true,
                //  "answerByUser" : true  //cập nhật khi user trả lời
              },
              {
                  "id" : "4"
                  "content" : "Nội dung đáp án D",
                  "isCorrect" : false,
                //  "answerByUser" : false //cập nhật khi user trả lời
              }
       },
       {
          "id" : "002",  
          "type" : "checkbox", 
          ...
       }
   ],

}
```


### Mô tả actions
- hiển thị thời gian thi ngay lúc ban đầu
- Đồng hồ CountDown sẽ bắt đầu khi users bấm "Bắt Đầu Thi"
- `Kết thúc Thi`:
   - "userStatus" : "prepare" :  hiển thị  "Bắt Đầu Thi"    => chuyển userStatus = started
   - "userStatus" : "started" : hiển thị "Kết Thúc Thi"  => chuyển userStatus = completed  
   - "userStatus" : "completed" : hiển thị "Xem Kết Quả" 

- progressBar: dựa theo câu hỏi trả lời / số câu hỏi
- danh sách câu hỏi chia thành 2 hàng bằng nhau, hiển thị theo chiều
ngang
- nội dung câu hỏi khi quá dài thì cho phép scroll
