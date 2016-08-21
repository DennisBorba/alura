module.exports = function(app) {
  app.get('/produtos', function(request, response) {
	var connection = app.infra.connectionFactory();	
	var produtosDAO = new app.infra.ProdutosDAO(connection);
	  
	produtosDAO.lista(function(err, result) {
      response.format({
        html: function() {
          response.render('produtos/lista', {lista: result});
        },
        json: function() {
          response.json(result);
        }
      });
	});
	  
	connection.end();
  });
  
  app.get('/produtos/form', function(request, response) {
    response.render('produtos/form');
  });
  
  app.post('/produtos', function(request, response) {
    var produto = request.body;
    
    var validatorTitulo = request.assert('titulo', 'Título é obrigatório');
    validatorTitulo.notEmpty();
    
    var errors = request.validationErrors();
    
    if(errors) {
      request.render('produtos/form');
      return;
    }
    
    var connection = app.infra.connectionFactory();	
	var produtosDAO = new app.infra.ProdutosDAO(connection);
    
    produtosDAO.salva(produto, function(error, result) {
      response.redirect('/produtos');  
    });
    
    connection.end();
  });
};
