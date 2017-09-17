'use strict';
var mongoose = require('mongoose'),
  request = require('request'),
  Schema = mongoose.Schema,
  dataModel = require('../models/fintechModel.js'),
  config = require('../config.js');

mongoose.connect(config.db.uri);

exports.list_ticker_price = function(req, res) {
 request('https://www.quandl.com/api/v3/datasets/WIKI/WMT.json?start_date=1985-05-01&end_date=2010-07-01&order=asc&column_index=4&collapse=daily&transformation=rdiff',
  function(err, response, body){
    if(!err && response.statusCode == 200){
      res.json(body);
    }
  }).end();
};

exports.save_portfolio = function(req, res){

	var portfolio = mongoose.model('portfolio', dataModel.portfolio);
	var testPortfolio = new portfolio({
		name : "testPortfolio",
		marketValue : [],
		historicalOptimization :[]
	});

	var currentTime = new Date;
	var marketValue ={
		"value" : 387987.98,
		"currency" : "USD",
		"time" : currentTime
	}

	testPortfolio.marketValue.push(marketValue);

	testPortfolio.save(function(err){
		if(err) throw err;
		res.status(200).send('Succesfully created an entry in portfolio collection!');
	});
};





