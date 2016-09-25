var mysql = require('mysql');

function createDBConnection() {
  var env = '' + process.env.NODE_ENV + '';
  
  if(!env) {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'casadocodigo_nodejs'
    });
  }
  
  if(env == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'casadocodigo_nodejs_test'
    });
  }
};

module.exports = function() {
  return createDBConnection;	
};