# easyquiztest

> Easy QuizTest, a product of VinaAS Ltd,.Co

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

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
## Cài đặt những package để chạy app
```bash 
# Install dependencies and run your app
cd app
npm install
npm run dev
```

More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/en/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
