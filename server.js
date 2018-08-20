var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express()
var execPhp = require('exec-php');

app.use(cors())
// must specify options hash even if no options provided!
/*var phpExpress = require('php-express')({

  // assumes php is in your PATH
  binPath: 'C://wamp64//bin//php//php7.2.4//php'
});*/

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

app.post('/addproduct', function(req,res){
  execPhp(__dirname+'/views/add.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    console.log('php: ', php );
    console.log('req.body::', req.body);
    php.addproduct(req.body.data, function(err, result, output1 ){
      console.log('result: ',result);
      res.send(result);
    });
  });
});

app.post('/editproduct', function(req,res){
  execPhp(__dirname+'/views/edit.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    console.log('php: ', php );
    console.log('req.body::', req.body);
    php.editproduct(req.body.data, function(err, result, output1 ){
      console.log('result: ',result);
      res.send(result);
    });
  });
});

app.delete('/deleteproduct', function(req,res){
  execPhp(__dirname+'/views/delete.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    console.log('php: ', php );
    console.log('req.query::', req.query);
    php.deleteproduct(req.query.id, function(err, result){
        res.send(result);
    });
  });
});

app.get('/fetchproducts', function(req,res){
  execPhp(__dirname+'/views/select.php', 'C://wamp64//bin//php//php7.2.4//php', function(error, php, output){
    console.log('php: ', php );
    php.getproducts(function(err, result ){
      console.log('result: ', result )
      res.send(result);
    });
  });
});

// set view engine to php-express
// app.set('views', './views');
// app.engine('php', phpExpress.engine);
// app.set('view engine', 'php');

/*
// routing all .php file to php-express
function phpExpress_dorouter(req,res) {
  req['php_environment_variables'] = {};
  console.log('post req:', req.body)
  phpExpress.router(req,res);
}

app.all(/(.+\.php|\/)$/, phpExpress_dorouter);*/

// routing all .php file to php-express
// app.all(/.+\.php$/, phpExpress.router);

// app.post('/row', function(req, res) {
//   console.log('post req:', req.body)
// })

var server = app.listen(4000, function () {
  console.log('PHPExpress app listening at %s', 4000);
});