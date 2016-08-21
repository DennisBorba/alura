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
    response.render('produtos/form', {validationErrors: {}});
  });
  
  app.post('/produtos', function(request, response) {
    var produto = request.body;
    
    request.assert('titulo', 'Título é obrigatório').notEmpty();
    request.assert('preco', 'Formato inválido').isFloat();
        
    var errors = request.validationErrors();
    
    if(errors) {
      request.render('produtos/form', {validationErrors: errors});
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
