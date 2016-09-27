module.exports = function(app) {
  app.get('/promocoes/form', function(request, response) {
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.lista(function(err, resultSet) {
      response.render('promocoes/form', {lista: resultSet});
    });
    connection.end();
  });
  
  app.post('/promocoes', function(request, response) {
    response.redirect('promocoes/form');
  });
}