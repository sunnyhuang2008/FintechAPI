'use strict';
module.exports = function(app) {
  var fintech = require('../controllers/fintechController');

  // fintech Routes
  app.route('/tickers')
    .get(fintech.list_ticker_price);

  app.route('/testSavePortfolio')
  .get(fintech.save_portfolio_value);

  app.get('/getRealtimeStockData/:ticker',fintech.get_realtime_stock_data);

  app.get('/getPorfolioSum',fintech.get_porfolio_sum);
};
