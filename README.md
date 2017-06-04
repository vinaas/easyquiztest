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

### Requirement
- Git
- Nodejs >= v.7.1

### Cài đặt để build app

#### 1. Cài đặt client
``` bash
# Cài đặt electron vue dependencies
npm install

# Cài đặt dependencies cho renderer process (semaintic ui, sweetalert , axios, ...), nếu có cập nhật thêm dependencies trong file app/package.json thì cần cài đặt lại như câu lệnh bên dưới.
cd app # vào thư mực app
npm install
cd ..
``` 
#### 2. Cài đặt server
``` bash
# cài đặt các thư viện cho backend (loopback)
cd backend #vào thư mục backend
npm install
cd ..
```

### Chạy ứng dụng
#### 1.Chạy backend
```bash
# serve with hot reload at localhost:9080
npm run server
# hoặc
cd backend
node .
```
#### 2.Chạy client
```
# chạy ở thư mục gốc
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
