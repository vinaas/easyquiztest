# EasyQuiz API backend

## Tính năng

### Parse Excel files

#### Mô tả:
1. Upload file excel cần parse, nhận kết quả trả về là data đã parse dưới dạng json
1. Hiển thị kết quả ở frontend
    - cho phép điều chỉnh 
1. Submit kết quả, lưu vào trong database

#### Thực hiện
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

Please see LoopBack [Getting started part II](http://loopback.io/doc/en/lb3/Getting-started-part-II.html) for the tutorial that walks you through creating this application.

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ npm install
$ node .
```

---

[More LoopBack examples](https://loopback.io/doc/en/lb3/Tutorials-and-examples.html)
