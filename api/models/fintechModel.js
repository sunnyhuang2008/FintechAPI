var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var optimization = new Schema({
	covarianceMatrix : [
		covarPair : {
			ticker1 : String,
			ticker2 : String,
			volatility1 : Number,
			volatility2 : Number, 
			corrolation : Number,
			covariance : Number
		}
	],
	weights : [
		weight : {
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
	optimizationID : String, 
	holdings : [
		hoiding : {
			ticker : String, 
			weight : Number,
			sector : String 
		}
	]
});

var ticker = new Schema({
	ticker : String, 
	sector : String
});

var optimization = mongoose.model('optimization', optimization);
var alterOptimization = mongoose.model('alterOptimization', alterOptimization);

module.exports = optimization;
module.exports = alterOptimization;