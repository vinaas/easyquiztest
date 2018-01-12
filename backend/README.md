 **EasyQuiz API backend**

# Tính năng

## Reporting Services
> sử dụng Jsreport https://jsreport.net

### Mô tả:
- mở report file trong tab riêng
- link download report, dưới dạng excel hoặc pdf
- Tích hợp vào Aurelia 

### Tài liệu: 
- http://www.c-sharpcorner.com/article/generate-reports-using-jsreport-and-browser-client/
- https://jsreport.net/learn/browser-client

### Thực hiện
> chưa có

## Parse Excel files

### Mô tả:
1. Upload file excel cần parse, nhận kết quả trả về là data đã parse dưới dạng json
1. Hiển thị kết quả ở frontend
    - cho phép điều chỉnh 
1. Submit kết quả, lưu vào trong database

### Thực hiện
> Sử dụng thư viện : https://github.com/SheetJS/js-xlsx

- tham khảo: https://github.com/vinaas/js-xlsx/blob/master/demos/server/express.js#L1

- cài đặt: 
    - `express-formidable` : tiếp nhận file upload và xử lý 
    - `xlsx`: thư viện parse file excel 

- bổ sung ở file `/route.js`
    - `POST  /parse` : input là file upload

- thực hiện ở commit https://github.com/vinaas/easyquiztest/commit/3dc690fa7086a9aab01035f05dfc136fdfeaa3be

- Test parse file trên postman
    - [parseexcel-postman](https://user-images.githubusercontent.com/10808157/34399544-c8b19948-ebba-11e7-8269-0c6bec99df2b.png)

# Lệnh 
## Cài Đăt
```
npm install
```

## Chạy 
```
node .
```
## Tóm lượt kiến thức
- programming languages: js (typescript: ts), php, java, c#, vb, 
- Web servers: nginx (php, static files) | IIS 7,8 (microsoft: c#, vb.net, vb6, ) | apache (php)  | express (nodejs | js)  | tomcat (java)
- database: RMDS: mssql server, mysql, oracle, postgresql | NoSQL: mongodb, couchbase, redis, memorydb 
- backend framworks: microsoft: asp.net mvc, web api | PHP: zend framework, yii | java: spring | nodejs: 
- frontend frameworks: SPA: angularjs | aurelia | react | vuejs | .....
- open source: blog: wordress, joomla, 

## Chạy backend trên server 
- http://45.77.45.94:7000/explorer
- Truy cập vào server sử dụng `WinSCP`
  - Tài khoản `root`
  - Mất khẩu được cung cấp
- Thư mục chưa backend `/var/www/easyquiztest/backend`
- Cài đặt `PuTTY` để sử dụng cmd trong `WinSCP`
- Restart lại khi update file trong `backend`
  - Mở `PuTTY` (Ctrl +P)
  - `forever list` => Xem `pid_number` của `easyquiztest`
  - `forever restart pid_number`

## Xử lý khi gặp lỗi không thể restart
- Sử dụng `PuTTY`
- cd tới `/var/www/easyquiztest/backend`
- Chạy `node .` để xem lỗi và sửa lỗi
- Chạy `forever restart pid_number` lại sau khi sửa xong lỗi