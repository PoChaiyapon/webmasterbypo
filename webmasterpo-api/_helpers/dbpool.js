const sql = require('mssql');
const config = {
  user: 'sa',
  password: 'utaxthailand',
  server: 'localhost\\SQLEXPRESS',
  database: 'UXWEB',
  options: {
    encrypt: false,
    enableArithAbort: true
  }
}

// //connect to database
// sql.connect(config, function(err) {
//   if(err) {
//     console.log(err);
//   }else {
//     console.log('Connected');
//   }
// })

const pool = new sql.ConnectionPool(config);

module.exports =  pool;