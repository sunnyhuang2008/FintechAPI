'use strict';


var mongoose = require('mongoose'),
  request = require('request');

exports.list_ticker_price = function(req, res) {
 request('https://www.quandl.com/api/v3/datasets/WIKI/WMT.json?start_date=1985-05-01&end_date=2010-07-01&order=asc&column_index=4&collapse=daily&transformation=rdiff',
  function(err, response, body){
    if(!err && response.statusCode == 200){
      res.json(body);
    }
  }).end();
};






