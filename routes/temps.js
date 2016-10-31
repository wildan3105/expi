var express = require('express')
var app     = express()
var Temp = require('../models/temp')
var router = express.Router()

//middleware to use for all requests
router.use(function(req, res, next){
  // console out
  console.log('something is happening')
  next() // go to next route and not stop here
})

router.get('/', function(req,res){
  res.json({message: 'Welcome to Simple API!'})
})

router.get('/temps/create', function(req,res){
  res.render('temps-create', {title:'Create temp'})
})

router.get('/temps/update', function(req,res){
  res.render('temps-update', {title:'Update temp'})
})

router.route('/temps')
  // create a temp (accessed at POST http://localhost:4000/api/temps)
  .post(function(req,res){
    var temp = new Temp()
    temp.name = req.body.name

    // save the temp and check for error
    temp.save(function(err){
      if(err){
        res.send(err)
      }
      // if success
      res.json({message: 'Temp created is : ' + temp.name})
    })
  })

  // get all temps (accessed at GET http://localhost:4000/api/temps)
  .get(function(req,res){
    Temp.find(function(err, temps){
      if(err){
        res.send(err)
      }
      console.log(temps)
      res.format({
        html: function(){
          res.render('temps', {
                  title: 'All temps',
                  message: temps
              });
        },
        json: function(){
            res.json(temps);
        }
      });
    })
  })

// single routes
router.route('/temps/:temp_id')
  // get temp with id (GET http://localhost:4000/api/temps/:temp_id)
  .get(function(req, res){
    Temp.findById(req.params.temp_id, function(err, temp){
      if(err){
        res.send(err)
      }
      res.json(temp)
    })
  })

  // update (PUT http://localhost:4000/api/temps/:temp_id)
  .put(function(req, res){
    Temp.findById(req.params.temp_id, function(err, temp){
      if(err){
        res.send(err)
      }
      temp.name = req.body.name; // new temp's name

      // save the temp
      temp.save(function(err){
        if(err){
          res.send(err)
        }
        res.json({message: 'Temp updated to : '+ temp.name})
        console.log('temp updated')
      })
    })
  })

  // delete temp with id (DELETE http://localhost:4000/api/temps)
  .delete(function(req,res){
    Temp.remove({
      _id: req.params.temp_id
      },
      function(err, temp){
        if(err){
          res.send(err)
        }
        res.json({message: 'Successfull delete'})
      }
    )
  })

  module.exports = router;
