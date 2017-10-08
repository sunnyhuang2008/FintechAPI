'use strict';
var mongoose = require('mongoose'),
  request = require('request'),
  Schema = mongoose.Schema,
  dataModel = require('../models/fintechModel.js'),
  config = require('../config.js');

//mongoose.connect(config.db.uri);

exports.list_ticker_price = function(req, res) {
 request('https://www.quandl.com/api/v3/datasets/WIKI/WMT.json?start_date=1985-05-01&end_date=2010-07-01&order=asc&column_index=4&collapse=daily&transformation=rdiff',
  function(err, response, body){
    if(!err && response.statusCode == 200){
      res.json(body);
    }
  }).end();
};

//Turn this into an internal function that takes in the value, currency and the portfolio name 
exports.save_portfolio_value = function(req, res){

  var portfolio_value = mongoose.model('portfolio_value', dataModel.portfolio_value);
  var testPortfolio_value = new portfolio_value({
    name : "testPortfolio",
    value : 34783.46,
    currency : "USD",
    time : null
 });

 testPortfolio_value.save(function(err){
    if(err) throw err;
    res.status(200).send('Succesfully created an entry in portfolio collection!');
 });
};

exports.get_realtime_stock_data = function(req, res) {
  var ticker = req.params.ticker;

  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ ticker +'&apikey=04G9FLWCWQG6NRJO', function(err, response, body){
    if(!err && response.statusCode == 200){
      var jsonRes = JSON.parse(body);
      var timeSeries = jsonRes[Object.keys(jsonRes)[1]];
      var latest = timeSeries[Object.keys(timeSeries)[0]];
      res.json(latest[Object.keys(latest)[3]]);
    }
  }).end();
};

function get_stock_data(ticker) {
  var res = 0;
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ ticker +'&apikey=04G9FLWCWQG6NRJO', function(err, response, body){
    if(!err && response.statusCode == 200){
      var jsonRes = JSON.parse(body);
      var timeSeries = jsonRes[Object.keys(jsonRes)[1]];
      var latest = timeSeries[Object.keys(timeSeries)[0]];
      console.log("test+");
      res = latest[Object.keys(latest)[3]];      
    } 
    // else {
    //   callback(error);
    // }
  }).end();
  return res;
}

exports.get_porfolio_sum = function(req, res) {
  var portfolio = new Map();
  portfolio.set('BABA', 5);
  portfolio.set('AAPL', 10);

  var sum = 0;
  
  portfolio.forEach(function(value, key){
    get_stock_data(key)
    .then(function(result){
      var stockValue = result * value;
      console.log("p: " + result + " v: " + key);
      sum += stockValue;
    });
  })
  .then(function(){
    console.log("jason");
    res.json("sum: " + sum);
  }).end();
  // for (var [key, value] of portfolio) {
  //   get_stock_data(key, function(err, result) {
  //     if(err){
  //       res.send(500, { error: 'something blew up' });
  //     } else {
  //       var stockValue = result * value;
  //       console.log("p: " + result + " v: " + key);
  //       sum += stockValue;
  //     }
  //   });   
  // }

  // console.log("jason");
  // res.json("sum: " + sum);
}
