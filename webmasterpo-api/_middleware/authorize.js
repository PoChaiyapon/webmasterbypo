const jwt = require('express-jwt');
const { secret } = require('../config.json');
const userService = require('../users/user.service');

function authorize() {
  return [
    // authenticate JWT token and attach decoded token to request as req.user
    jwt({ secret, algorithms: ['HS256']}),

    // attach full user record to request object
    async (req, res, next) => {
      // get user with id from token 'sub' (subject) property
      const user = await userService.getUserById(req.user.sub);

      // console.log(user);
      // check user still exists
      if(!user) 
        return res.status(401).json({ message: 'Unauthorized' });

      // authorization successful
      req.user = user;
      next();
    }
  ]
}

module.exports = authorize;