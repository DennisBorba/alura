var mysql = require('mysql');

function createDBConnection() {
  var env = '' + process.env.NODE_ENV + '';
  
  if(!process.env.NODE_ENV) {
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
  
  if (process.env.NODE_ENV == 'production') {
    /* after deploy on heroku */
    var url = process.env.CLEARDB_DATABASE_URL;
    var environmentVars = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
    
    return mysql.createConnection({
      host: environmentVars[3],
      user: environmentVars[1],
      password: environmentVars[2],
      database: environmentVars[4]
    });
  }
};

module.exports = function() {
  return createDBConnection;	
};