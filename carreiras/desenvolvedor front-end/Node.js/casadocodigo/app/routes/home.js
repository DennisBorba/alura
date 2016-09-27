module.exports = function(app) {
  app.get('/', function(request, response) {
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.lista(function(err, result) {
      response.render('home/index', {livros: result});
    });
    connection.end();
  });
}