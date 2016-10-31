var mongoose = require('mongoose')
var Schema = mongoose.Schema

var humidSchema = new Schema ({
  name: Number,
  date: Date
})

module.exports = mongoose.model('Humid', humidSchema)
