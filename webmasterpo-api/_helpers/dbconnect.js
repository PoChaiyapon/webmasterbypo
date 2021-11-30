const sql = require('mssql');
const pool = require('./dbpool');

module.exports = {
  execQuery: execQuery
}

async function execQuery(query, parameter) {
  await pool.connect();
  try{
    //create request
    const request = pool.request();

    // loop through params JSON and add them as input
    Object.keys(parameter).forEach(key => {
      request.input(key, parameter[key]);
    })

    //transaction
    const result = await request.query(query);

    //console query
    console.log(query);
    console.log(parameter);

    return result.recordset;

  }
  catch(err) {
    console.log('SQL Error: ', err);
    return null;
  }
}