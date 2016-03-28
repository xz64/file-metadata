var express = require('express');
var multer = require('multer');

var UPLOAD_LIMIT_MB = 5;

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: {
    fileSize: UPLOAD_LIMIT_MB * 1024 * 1024
  }
}).single('file');

var port = +process.env.PORT || 8080;
var app = express();

app.post('/api/upload', function(req, res) {
  upload(req, res, function(err)  {
    if(err) {
      return res.json({error: 'Exceeded file limit size of ' + UPLOAD_LIMIT_MB
        + ' MB.'});
    }
    res.json({size: req.file.size});
  });
});

app.use(express.static('public'));

app.listen(port);
