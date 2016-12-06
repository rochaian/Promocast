var express = require('express');
var app = module.exports = express();

var passport = require('passport');
// require('./passport')(passport);
// require('./models/user');


var bodyParser = require('body-parser');

app.listen(5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(express.cookieParser());
// app.use(express.methodOverride());

// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.session({secret:'lollllo'}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
