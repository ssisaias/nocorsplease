const express = require('express')
const request = require('request')
var methodOverride = require('method-override')
const app = express()

app.use(methodOverride())

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);


app.get('/q', function (req, res) {
  const url = req.param('url')
  console.log(url)
    request({
        uri: url,
        headers: {}
    }).pipe(res)
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})