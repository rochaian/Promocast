var app = require('./app_config.js');
var db = require('./db_config.js');
var http = require('http').createServer(app);
var auth = require('./middleware/auth.js')();

var io = require('socket.io').listen(http);
var fs = require('fs');

var validator = require('validator');
var userRouter = require('./routes/userRouter');
var businessRouter = require('./routes/businessRouter');

// var passport = require('passport');
// require('./passport')(passport);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  var userId = socket.id;
  console.log("Usuário logado com o ID:"+userId);

  //Mostra para o usuario que ele entrou
  socket.emit('Welcome');

  //Mostra pra todos os usuarios que ele entrou
  socket.broadcast.emit('user in ',{'userId': userId});

});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

// app.get('/', function(req, res){
//   res.end('Bem vindo ao promocast');
// });

app.use(auth.initialize());

app.use('/users',userRouter);

app.use('/business',businessRouter);

// app.get('/auth/facebook', passport.authenticate('facebook'));
//
// app.get('/auth/facebook/callback', passport.authenticate('facebook',
//   {successRedirect:'/', failureRedirect:'/login'}));

// app.get('/users', function(req, res){
//   res.end('aham');
// });
