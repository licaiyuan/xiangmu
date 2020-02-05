var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
var scspzp = new Schema({
    title: { type: String },
    jj: { type: String },
    spmz: { type: String },
    zpmz: { type: String },

});
var account = new Schema({
    username: { type: String },
    password: { type: String },


});
let sz=['scspzp','account']

var scspzp2 = mongoose.model('scspzp', scspzp);
var account2 = mongoose.model('account', account);
module.exports = { scspzp2,account2 }
// module.exports = mongoose.model('account', account);