
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

   "userInfo" : {   //Block: Thông tin thí sinh
       "userId" : "xxx", //duy nhất theo thí sinh
       "sbd" : "001", //số báo danh của thí sinh
       "userName" : "Nguyễn Văn A",
       "birthday" : "20/04/2000", //ngày sinh
   }
   "totalTime" : 1800, //thời gian thi, countdown về 0, tính theo giây, 1800s = 30 phút
   "numberOfQuestions" : 20, //tổng số câu hỏi 
   "questions" : [ //danh sách câu hỏi == numberOfQuestions, có thể fix cứng theo kì thi, được lựa chọn từ ngân hàng câu hỏi cho riêng thí sinh này
       {
          "id" : "001",  // mã câu hỏi: duy nhất trong ngân hàng câu hỏi
          "type" : "ratio | checkbox", //để hiển thị loại đáp án
          "description" : "xxx", //nội dung câu hỏi,
        
          "answers" : [  //danh sách câu trả lời để users lựa chọn, cho phép hoán đổi vị trí hiển thị, nhưng vẫn giữ id như cũ
              {
                  "id" : "A"
                  "content" : "Nội dung đáp án A"
              },
              {
                  "id" : "B"
                  "content" : "Nội dung đáp án B"
              },
              {
                  "id" : "C"
                  "content" : "Nội dung đáp án C"
              },
              {
                  "id" : "D"
                  "content" : "Nội dung đáp án D"
              }
          ]
          "correctAnswers" : ["A"], //danh sách đáp án đúng dựa theo Id, nếu chỉ có 1 phần tử là ratio 
       },
       {
          "id" : "002",  
          "type" : "checkbox", 
          ...
       }
   ],
 
   "beginTime" : "xxxx", //thời gian bắt đầu thi, sau khi users bấm nút "Bắt Đầu" 
   "answeredHistory" : [  //đây là số câu hỏi mà người dùng đã trả lời
      {
          "id" : "001",   //khi user trả lời
          "correctAnswers" : ["A"], //copy từ phần questions bên trên
          "answers" : ["C"]       //câu trả lời mà người dùng chọn
          "result" : true | false //được tính toán dựa trên câu trả lời, đối chiếu với correctAnswers bên trên  
          "answeredTime" : "xxxx", //thời điểm trả lời câu hỏi
      }
   ],
   
   "userStatus" : "prepare", //trạng thái của users đăng nhập,  prepare: chưa thi | started : đang thi | completed : đã thi xong

   "summary" : { // sử dụng để hiển thị kết quả
       "result" : "Pass | Failt" //kết quả 
       "answeredPeriod" : "xxxx", //thời gian làm bài, tính đến lúc bấm "kết thúc thi" hoặc khi hết giờ
       "correct" : 4, //số câu trả lời đúng tính dựa vào answeredHistory
       "total" : 20,  // == numberOfQuestions
   }

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
