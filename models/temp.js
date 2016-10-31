var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tempSchema = new Schema ({
  name: Number
})

module.exports = mongoose.model('Temp', tempSchema)
