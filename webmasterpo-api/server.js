const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const errorHandler = require('./_middleware/error-handler');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get('/',(req,res) => {
  res.json('Welcome to API')
})

//router
app.use('/user', require('./users/user.controller'));

// global error handler
app.use(errorHandler);

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});