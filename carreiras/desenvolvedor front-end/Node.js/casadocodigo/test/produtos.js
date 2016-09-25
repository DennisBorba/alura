var express = require('../config/express')();
var supertest = require('supertest')(express);

describe('#ProdutosController', function() {
  beforeEach(function(done) {
    var conn = express.infra.connectionFactory();
    conn.query("delete from livros", function(err, result) {
      if(!err) {
        done();
      }  
    });
  });
  
  it('#listagem json', function(done) {
    supertest.get('/produtos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  
  it('#cadastro de novo produto com dados invalidos', function(done) {
    supertest.post('/produtos')
      .send({titulo: '', descricao: 'novo livro'})
      .expect(400, done);
  }); 
  
  it('#cadastro de novo produto com dados validos', function(done) {
    supertest.post('/produtos')
      .send({titulo: 'titulo', descricao: 'novo livro', preco: 0.50})
      .expect(302, done);
  }); 
});

/* for run mocha in windows refer to: http://stackoverflow.com/questions/9722407/how-do-you-install-and-run-mocha-the-node-js-testing-module-getting-mocha-co */
/* npm install supertest --save-dev */

/*
 To run the test in a test base:
 Windows: set NODE_ENV=test && node node_modules/mocha/bin/mocha
 
 Or once:
 set NODE_ENV=test
 
 After:
 node node_modules/mocha/bin/mocha
 
*/