var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express()
var execPhp = require('exec-php');

app.use(cors())

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: false
}));

// /**bodyParser.json(options)
// * Parses the text as JSON and exposes the resulting object on req.body.
// */
app.use(bodyParser.json());

app.get('/',(req, res) => {
  res.status(200).send('ok')
})
/*
// you need to update PHP path where you have installed PHP.
// In my case, It was C://wamp64//bin//php//php7.2.4//php.
// Replace with your PHP path wherever applicable in this file.
//*/
app.post('/addproduct', function(req,res){
  execPhp(__dirname+'/views/add.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    php.addproduct(req.body.data, function(err, result, output1 ){
      res.send(result);
    });
  });
});

app.post('/editproduct', function(req,res){
  execPhp(__dirname+'/views/edit.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    php.editproduct(req.body.data, function(err, result, output1 ){
      res.send(result);
    });
  });
});

app.delete('/deleteproduct', function(req,res){
  execPhp(__dirname+'/views/delete.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    php.deleteproduct(req.query.id, function(err, result){
        res.send(result);
    });
  });
});

app.get('/fetchproducts', function(req,res){
  execPhp(__dirname+'/views/select.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    php.fetchproducts(function(err, result ){
      res.send(result);
    });
  });
});

var server = app.listen(4000, function () {
  console.log('PHPExpress server listening at %s', 4000);
});