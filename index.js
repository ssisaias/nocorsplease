const express = require('express')
const request = require('request')
var methodOverride = require('method-override')
var apicache = require('apicache')
const app = express()

apicache.options({
  debug: true
})
let cache = apicache.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200

// Init params
var args = process.argv.slice(2);


app.use(methodOverride());

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// Cache de dados de requisicoes
if (args.includes('--cached')) {
  console.log('Middleware is cached. Cache default time is 10 minutes.')
  app.use(cache('10 minutes', onlyStatus200))
}

app.get('/q', function (req, res) {
  const url = req.param('url')
  console.log('\x1b[33m%s\x1b[0m', '[nocors] ', url)
  try {
    request({
      uri: url,
      headers: {}
    }).pipe(res)
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '[nocors] ', err)
  }
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})