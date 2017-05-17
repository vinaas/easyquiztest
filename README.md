# easyquiztest

> Easy QuizTest, a product of VinaAS Ltd,.Co
> Công nghệ: Electron, VueJS, SemanticUI 

## Kế hoạch thực hiện
### Bản demo dùng thử: khoảng 10/05/2017
>  Phần mềm cài đặt trên máy con để thi 
  - đăng nhập theo tài khoản
  - tham gia kì thi có sẵn
  - trả lời từng câu hỏi, lựa chọn đáp án trong thời gian giới hạn
  - kết quả sau khi hoàn thành bài thi

### Bản chính thức:  khoảng 10/06/2017
 + Hoàn thiện phần mềm thi cài trên máy con ở bản demo
 
 + Quản lý ngân hàng câu hỏi
      - thêm câu hỏi, đáp án, cho phép nhiều đáp án đúng
      - điều chỉnh nội 
 + Quản lý kì thi:
   - tạo ra kì thi, thiết lập rules: số câu hỏi, thời gian thi, ...
   - lựa chọn danh sách câu hỏi từ ngân hàng có sẵn
 + Quản lý kết quả
   - cho phép điều chỉnh kết quả một số tài khoản
   - thống kê kết quả thi
 + Quản lý tài khoản 
   - tạo tài khoản: thí sinh, giáo viên,...
   - phân quyền 
   - phân thí sinh tham gia kì thi 

### Build Setup

``` bash
# install dependencies
npm install
## Khởi động API phía server

npm run server
## Cài đặt những package để chạy app (bổ sung)
cd app
npm install
cd ..
```

### Run software

```
# serve with hot reload at localhost:9080
npm run dev
```

### Build to software (Win, Mac, Linux)

```bash
# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
