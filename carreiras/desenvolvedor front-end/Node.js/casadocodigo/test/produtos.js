var http = require('http');
var assert = require('assert');

describe('#ProdutosController', function() {
  it('#Listagem json', function(done) {
    var config = {
      hostname: 'localhost',
      port: 3000,
      path: '/produtos',
      headers: {
        'Accept': 'application/json'
      }
    };
    
    http.get(config, function(res) {
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
      done();
    });
  });
});
/* for run mocha in windows refer to: http://stackoverflow.com/questions/9722407/how-do-you-install-and-run-mocha-the-node-js-testing-module-getting-mocha-co */