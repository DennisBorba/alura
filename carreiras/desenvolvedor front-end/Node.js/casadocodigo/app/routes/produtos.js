module.exports = function(app) {
  app.get('/produtos', function(request, response) {
	var connection = app.infra.connectionFactory();	
	var produtosDAO = new app.infra.ProdutosDAO(connection);
	  
	produtosDAO.lista(function(err, result) {
	  response.render('produtos/lista', {lista: result});
	});
	  
	connection.end();
  });	
};
