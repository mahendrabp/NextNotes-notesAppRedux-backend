const express = require('express'); // must be there
const bodyParser = require('body-parser');
const cors = require('cors');
const configs = require('./src/configs/configs'); // import cofiguration file
// const logger = require('./src/helpers/logger');
const passport = require('passport');
// require('./src/helpers/auth')(passport);
const multer = require('multer');

const app = express(); // init app express
app.use('/public', express.static('public'));
//start use body-parser
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// use body parser from json
app.use(bodyParser.json());
// use body parser from url-encoded
app.use(bodyParser.urlencoded({ extended: true }));
// end use body-parser
const port = configs.port; // take port
const routerNav = require('./src/index'); // this is for Route
require('colors');

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(logger); // use logger

//root route yanng atas
// app.use('/', routerNav);

//listen port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`.yellow.bold);
});

module.exports = app;
