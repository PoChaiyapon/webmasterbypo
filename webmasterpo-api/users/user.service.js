const db = require('../_helpers/dbconnect');
const config = require('../config.json')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  authenticate,
  getUsers,
  getUserById,
  getUserByName,
  create,
  update,
  delete: _delete
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}

/****************** authentication *****************/
async function authenticate({Username, Password}) {
  const user = await getUserByName(Username);

  if(!user || !(await bcrypt.compare(Password, user.PasswordHash))){
    throw `Username or Password is incorrect`
  }
  
  // authentication successful
  const token = jwt.sign({ sub: user.Id }, config.secret, { expiresIn: '1d'});

  return { ...omitHash(user), token };
}

/****************** Get user all *****************/
async function getUsers() {
  // const params = [];
  const query = "exec UXWEB..SP_SYSTEM_LOGIN @TYPE = @P_TYPE";
  const params = {
    P_TYPE: 'GET_USER_ALL'
  };
  return db.execQuery(query, params);
}

/****************** Get user by Name *****************/
async function getUserByName(name) {
  // const params = [];
  const query = "exec UXWEB..SP_SYSTEM_LOGIN @TYPE = @P_TYPE, @UNAME = @P_NAME"
  const params = {
    P_TYPE: 'GET_USER_ONE',
    P_NAME: name
  };
  // return db.execQuery(query, params); // return top 1
  const data = await db.execQuery(query, params);
  const dataJson = data[0];
  return dataJson; // return 1 item by json
}

/****************** Get user by ID *****************/
async function getUserById(id) {
  // const params = [];
  const query = "exec UXWEB..SP_SYSTEM_LOGIN @TYPE = @P_TYPE, @ID = @P_ID"
  const params = {
    P_TYPE: 'GET_USER_ID',
    P_ID: id
  };
  // return db.execQuery(query, params); // return top 1
  const data = await db.execQuery(query, params);
  const dataJson = data[0];
  return dataJson; // return 1 item by json
}

/****************** Create *****************/
async function create(params) {
  // validation
  if(await getUserByName(params.Username)) {
    throw `Username ${params.Username} is already taken`;
  }

  //hash password
  if(params.Password) {
    params.Hash = await bcrypt.hash(params.Password, 10);
  }

  const query = "exec UXWEB..SP_SYSTEM_LOGIN @TYPE = @P_TYPE, @UNAME = @P_UNAME, @FNAME = @P_FNAME, @LNAME = @P_LNAME, @EMAIL = @P_EMAIL, @BIRTHDATE = @P_BDATE, @PASSWORD = @P_PASS";

  const store_param = {
    P_TYPE: 'ADD_USER',
    P_UNAME: params.Username,
    P_FNAME: params.FirstName,
    P_LNAME: params.LastName,
    P_EMAIL: params.Email,
    P_BDATE: params.BirthDate,
    P_PASS: params.Hash
  };

  // console.log(store_param);

  //save
  await db.execQuery(query, store_param);
}


/****************** Update *****************/
async function update(id, params) {
  const user = await getUserById(id);

  // validate
  if(!user) throw 'User not found'
  
  const usernameChanged = params.Username && user.Username !== params.Username;
  if(usernameChanged && await getUserByName(params.Username)) {
    throw `Username ${params.Username} is alread taken`;
  }

  // Hash Password if it was entered
  if(params.Password) {
    params.Hash = await bcrypt.hash(params.Password, 10);
  }

  const query = "exec UXWEB..SP_SYSTEM_LOGIN @TYPE = @P_TYPE, @UNAME = @P_UNAME, @FNAME = @P_FNAME, @LNAME = @P_LNAME, @EMAIL = @P_EMAIL, @BIRTHDATE = @P_BDATE, @PASSWORD = @P_PASS, @ID = @P_ID";

  const store_param = {
    P_TYPE: 'EDIT_USER',
    P_UNAME: params.Username,
    P_FNAME: params.FirstName,
    P_LNAME: params.LastName,
    P_EMAIL: params.Email,
    P_BDATE: params.BirthDate,
    P_PASS: params.Hash,
    P_ID: id
  };

  // save and return
  await db.execQuery(query, store_param);
  const usernew = await getUserById(id);

  return omitHash(usernew);
}

/****************** Delete *****************/
async function _delete(id) {

  const user = await getUserById(id);
  if(!user) throw 'User not found'

  const query = "exec UXWEB..SP_SYSTEM_LOGIN @TYPE = @P_TYPE, @ID = @P_ID";

  const store_param = {
    P_TYPE: 'DELETE_USER',
    P_ID: id
  }; 

  // delete
  await db.execQuery(query, store_param);

}