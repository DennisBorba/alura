module.exports = function(app) {
  app.get('/produtos', function(request, response, nextEvent) {
	var connection = app.infra.connectionFactory();	
	var produtosDAO = new app.infra.ProdutosDAO(connection);
	  
	produtosDAO.lista(function(err, result) {
      if(err)
        return nextEvent(err); //Threaten by Express in the next event
      
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
    response.render('produtos/form', {validationErrors: {}, produto: {}});
  });
  
  app.post('/produtos', function(request, response) {
    var produto = request.body;
    
    request.assert('titulo', 'Título é obrigatório').notEmpty();
    request.assert('preco', 'Formato inválido').isFloat();
        
    var errors = request.validationErrors();
    
    if(errors) {
      response.format({
        html: function() {
          response.status(400).render('produtos/form', {validationErrors: errors, produto: produto});
        },
        json: function() {
          response.status(400).json(errors);
        }
      });
      
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
