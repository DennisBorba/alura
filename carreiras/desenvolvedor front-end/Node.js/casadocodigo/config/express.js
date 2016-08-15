var express = require('express');
var load = require('express-load');

module.exports = function() {    	
  var app = express();

  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  
  /** Carrega os modulos automaticamente das pastas informadas, à partir da pasta app. **/
  load('routes', {cwd: 'app'})
  	.then('infra')
	.into(app);
	
  return app;
};
