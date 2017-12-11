<!-- TOC -->

- [EasyQuiz](#easyquiz)
    - [API backend](#api-backend)
    - [AdminCP](#admincp)
    - [EasyQuiz software](#easyquiz-software)
    - [Mối quan hệ:](#mối-quan-hệ)
        - [Xây dựng ngân hàng đề thi (1000 câu)](#xây-dựng-ngân-hàng-đề-thi-1000-câu)
        - [Xây dựng kỳ thi (100 câu)](#xây-dựng-kỳ-thi-100-câu)
        - [Diễn ra Kỳ thi](#diễn-ra-kỳ-thi)
            - [Thí Sinh tham gia thi.](#thí-sinh-tham-gia-thi)
            - [Thông Tin kỳ thi (dành cho Admin)](#thông-tin-kỳ-thi-dành-cho-admin)
        - [Kết quả Kỳ thi](#kết-quả-kỳ-thi)
        - [Thống kê theo nhiều kỳ thi.](#thống-kê-theo-nhiều-kỳ-thi)
    - [Kế hoạch thực hiện](#kế-hoạch-thực-hiện)
        - [Bản demo dùng thử: khoảng 10/05/2017](#bản-demo-dùng-thử-khoảng-10052017)
        - [Bản chính thức:  khoảng 10/06/2017](#bản-chính-thức--khoảng-10062017)
        - [Requirement](#requirement)
        - [Cài đặt để build app](#cài-đặt-để-build-app)
            - [1. Cài đặt client](#1-cài-đặt-client)
            - [2. Cài đặt backend](#2-cài-đặt-backend)
        - [Chạy ứng dụng](#chạy-ứng-dụng)
            - [1.Chạy backend](#1chạy-backend)
            - [2.Chạy client](#2chạy-client)
        - [Build to software (Win, Mac, Linux)](#build-to-software-win-mac-linux)

<!-- /TOC -->
# EasyQuiz
> gồm 3 phần 

## API backend
> thư mục /backend
> http://45.77.45.94:7000/explorer/#/
- Công nghệ sử dụng framework: Loopback, database: memory db, Mongodb 
- dev: localhost, tham khao [1.Chạy backend](#1chạy-backend)

## AdminCP
> vào thư mục /easycms
> nằm ở repo https://gitlab.com/vinaas/easyquiz-cms.git 
> deploy: http://easyquiz-cms.vinaas.com

- Công nghệ sử dụng: Aurelia + Pages Admin theme, kế thừa Core source của EIC
- chạy dev: xem `README.md`
## EasyQuiz software
> nằm ở thư mục /app

- Công nghệ sử dụng: Electron, VueJS, SemanticUI 
- chạy dev: tham khảo [2.Chạy client](#2chạy-client)
## Mối quan hệ:

- AdminCP sử dụng API backend
- EasyQuiz sử dụng API backend
- API backend: 



### Xây dựng ngân hàng đề thi (1000 câu)

- Import danh sách Câu Hỏi từ file Word

- Thêm câu hỏi thủ công

### Xây dựng kỳ thi (100 câu)

- Chọn câu hỏi từ ngân hàng Đề thi.

  - Random câu hỏi từ Đề thi
  - Chọn thủ công dựa theo Danh Mục.

- Thiết lập kỳ thi
  - Số câu hỏi cho 1 bài thi (20 câu)

  - Câu trả lời được xáo trộn.

  - Thời gian bắt đầu, thời gian kết thúc.

  - Thời gian thi.

- Phân quyền thí sinh sẽ tham gia vào kỳ thi này

  - Lựa chọn từ Danh Sách Thí Sinh có sẵn.

  - Import Danh Sách từ file word, excel

    - Tạo User từ dữ liệu import.

  -  Có thể gửi email hoặc tin nhắn để thông báo Thí Sinh.

### Diễn ra Kỳ thi

 

#### Thí Sinh tham gia thi.

  - Dữ liệu theo từng Thí sinh.
  
  - Trạng thái thi
    - Chưa thi 
    - Đang thi (Thông tin thời gian thi, thi lúc nào, thi trong bao lâu, số câu hỏi để trả lời)
    - Đã Thi (thời gian kết thúc, kết quả thi)
      - Trạng thái đã thi
      - Kết thúc trước thời gian quy định
      - Mất mạng khi đang thi.
      - Hoàn thành đúng thời gian.

#### Thông Tin kỳ thi (dành cho Admin)

  - Số thi sinh đang thi.
  - Số thi sinh đã thi.
  - Số thí sinh chưa thi.

### Kết quả Kỳ thi

  - Số thi đã thi, chưa thi.
  - Thống kê phân tích theo thời gian.
  - Thống kê theo thí sinh.
  - Thống kê kết quả thi
    - Điểm trung bình/thí sinh


### Thống kê theo nhiều kỳ thi.
  - Xếp hạng theo thí sinh.
  - Xếp hạng theo kỳ thi.
  - 



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
#### 2. Cài đặt backend
``` bash
# cài đặt các thư viện cho backend (loopback)
cd backend #vào thư mục backend
npm install
cd ..
```

### Chạy ứng dụng
#### 1.Chạy backend
```bash
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
