var express = require('../config/express')();
var supertest = require('supertest')(express);

describe('#ProdutosController', function() {
  it('#Listagem json', function(done) {
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