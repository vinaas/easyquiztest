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

## Chạy chương trình
## Cài đặt
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

