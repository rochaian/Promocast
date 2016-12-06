var db_string = 'mongodb://127.0.0.1/promocast';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados!'));

// db.once('open', function(){
//   var UserSchema = mongoose.Schema({
//     name: String,
//     password: String,
//     token: String
//   })
//
//   exports.User = mongoose.model('User', UserSchema);
//})
