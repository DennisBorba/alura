var http = require('http');
    
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
      if(res.statusCode == 200) {
        console.log('Status OK');
      }

      if(res.headers['content-type'] == 'application/json; charset=utf-8') {
        console.log('Content type OK');
      }
      
      done();
    });
  });
});
/* for run mocha in windows refer to: http://stackoverflow.com/questions/9722407/how-do-you-install-and-run-mocha-the-node-js-testing-module-getting-mocha-co */