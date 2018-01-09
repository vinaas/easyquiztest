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

module.exports = function (Container) {
    Container.parse = function (fileName, cb) {
        // post_data(req, res)    
        var path = "./server/storage";
        var file = path + "/xlsx/" + fileName; 
        console.log('fileName', file)
        
        if (fs.existsSync(file)) {
            var jsonData = load_data(file);
            cb(null, jsonData);
        }else {
            var error = new Error("File not  found!");
            error.status = 404;
            cb(error);    
        }
    }

    Container.remoteMethod('parse', {
        accepts: { arg: 'fileName', type: 'string' },
        returns: { arg: 'data', type: 'string' }
    });
};
