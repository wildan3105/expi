var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');
var port            = process.env.PORT || 4000;
var http            = require('http')

// routes
var Temp    = require('./models/temp');
var temps   = require('./routes/temps');
var Humid   = require('./models/humid');
var humids  = require('./routes/humids');

mongoose.connect('mongodb://127.0.0.1:27017/api');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'jade');
app.set('views', './views');
app.use('/api', temps);
app.use('/api', humids);

app.get('/', function (req, res) {
  res.json({message:"Welcome to our API"});
});

app.listen(port)
console.log('Server running at http://127.0.0.1:4000/');
