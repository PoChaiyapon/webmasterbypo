const express = require('express');
const Joi = require('joi')
const router = express.Router();
const userSevice = require('./user.service');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');

router.post('/authenticate', authenticateSchema, authenticate);
router.get('', getUsers);
router.get('/username/:name', authorize(), getUserByName);
router.post('/register', registerSchema, register);
router.put('/:id', authorize(), registerSchema, update)
router.delete('/:id', authorize(), deleteUser)

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    Username: Joi.string().required(),
    Password: Joi.string().required()
  });
  //validateRequest
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userSevice.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function registerSchema(req, res, next){
  const schema = Joi.object({
    Username: Joi.string().required(),
    FirstName: Joi.string().required(),
    LastName: Joi.string(),
    Email: Joi.string(),
    BirthDate: Joi.string(),
    Password: Joi.string().min(4).required()
  });
  //validateRequest
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userSevice.create(req.body)
    .then(()=> res.json({ message: 'Registration Successful'}))
    .catch(next);
}

function update(req, res, next) {
  userSevice.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next);
}

function getUsers(req, res, next) {
  // res.json({status:400, message: 'OK 5555'});
  userSevice.getUsers().then(result => {
    res.json(result);
  })
  .catch(next);
}

function getUserByName(req, res, next) {
  // res.json({status:400, message: 'OK 5555'});
  userSevice.getUserByName(req.params.name).then(result => {
    res.json(result);
  })
  .catch(next);
}

function deleteUser(req, res, next) {
  userSevice.delete(req.params.id)
    .then(()=> res.json({ message: 'User delete successful' }))
    .catch(next);
}