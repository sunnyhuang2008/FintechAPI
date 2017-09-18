var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var optimization = new Schema({
	covarianceMatrix : [
	   {
			ticker1 : String,
			ticker2 : String,
			volatility1 : Number,
			volatility2 : Number, 
			corrolation : Number,
			covariance : Number
		}
	],
	weights : [
	    {
			ticker : String, 
			weight : Number
		}
	],
	time : {
		optimized_at : Date, 
		updated_at : Date,
		duration : Number
	}
});

optimization.pre('save', function(next){
	var currentTime = new Date;
	this.time.updated_at = currentTime;
	if(!this.time.updated_at){
		this.time.optimized_at = currentTime;
	}
	next();
});

//TBD on alterOptimization Design 
var alterOptimization = new Schema({
	// Entry ID for each optimization object entry
	optimizationID : String, 
	holdings : [
		{
			ticker : String, 
			weight : Number,
			sector : String 
		}
	],
	time : {
		created_at : Date
	}
});

alterOptimization.pre('save', function(next){
	var currentTime = new Date;
	this.time = currentTime;
});

/*
var portfolio = new Schema({
	name : String,
	marketValue : [
	    {
			value : Number,
			currency : String, 
			time : Date
		}
	],
	historicalOptimization : [
		{
			optimizationID : String
		}
	]
// More portfolio meta metrics to be added 
});


portfolio.pre('save', function(next){
	next();
});
*/

var portfolio_value = new Schema({
	name : String, 
	currency : String, 
	value : Number,
	time : Date
});

portfolio_value.pre('save', function(next){
	var currentTime = new Date; 
	this.time = currentTime; 
	next();
});

var ticker = new Schema({
	ticker : String, 
	sector : String
});

var optimization = mongoose.model('optimization', optimization);
var portfolio_value= mongoose.model('portfolio_value',portfolio_value);
var alterOptimization = mongoose.model('alterOptimization', alterOptimization);
var ticker = mongoose.model('ticker', ticker);

module.exports = optimization;
module.exports = portfolio_value;
module.exports = alterOptimization;
module.exports = ticker;