'use strict';


//Sử dụng https://github.com/vinaas/js-xlsx/
// tham khảo từ : https://github.com/vinaas/js-xlsx/blob/master/demos/server/express.js#L1
var fs = require('fs'), path = require('path'), URL = require('url');
var express = require('express'), app = express();
// var sprintf = require('printj').sprintf;
// var logit = require('./_logit');
// var cors = require('./_cors');
var data = "a,b,c\n1,2,3".split("\n").map(function (x) { return x.split(","); });
var XLSX = require('xlsx');

function load_data(file) {
  var wb = XLSX.readFile(file);
  /* generate array of arrays */
  data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
  return data;
}

function post_data(req, res) {
  var keys = Object.keys(req.files), k = keys[0];
  console.log('post_data', keys)
  var jsonData = load_data(req.files[k].path);
  res.send(jsonData);
  // res.status(200).send(jsonData);
}

module.exports = function (app) {
  
  
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function (req, res) {
    res.send('pong');
  });
  app.use(require('express-formidable')());
  app.post('/parse', function (req, res, next) {
    // var url = URL.parse(req.url, true);
    //   if(url.query.f) return post_file(req, res, url.query.f);
    return post_data(req, res);
  });
};

