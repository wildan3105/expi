var express = require('express')
var app     = express()
var Humid = require('../models/humid')
var router = express.Router()

//middleware to use for all requests
router.use(function(req, res, next){
  // console out
  console.log('something is happening')
  next() // go to next route and not stop here
})

router.get('/', function(req,res){
  res.json({message: 'welcome to Simple API!'})
})

router.route('/humids')
  // CREATE
  .post(function(req,res){
    var humid = new Humid()
    humid.name = req.body.name
    humid.date = new Date()

    // save the temp and check for error
    humid.save(function(err){
      if(err){
        res.send(err)
      }
      // if success
      res.json({message: 'Humid created is : ' + humid.name})
    })
  })

  // GET ALL
  .get(function(req,res){
    Humid.find(function(err, humids){
      if(err){
        res.send(err)
      }
      res.json(humids)
    })
  })

// single routes
router.route('/humids/:humid_id')
  // GET ONE
  .get(function(req, res){
    Humid.findById(req.params.humid_id, function(err, humid){
      if(err){
        res.send(err)
      }
      res.json(humid)
    })
  })

  // UPDATE
  .put(function(req, res){
    Humid.findById(req.params.humid_id, function(err, humid){
      if(err){
        res.send(err)
      }
      humid.name = req.body.name; // new temp's name
      humid.date = new Date()

      // save the temp
      humid.save(function(err){
        if(err){
          res.send(err)
        }
        res.json({message: 'Temp updated to : '+ humid.name})
        console.log('temp updated')
      })
    })
  })

  // delete temp with id (DELETE http://localhost:4000/api/temps)
  .delete(function(req,res){
    Humid.remove({
      _id: req.params.humid_id
      },
      function(err, humid){
        if(err){
          res.send(err)
        }
        res.json({message: 'Successfull delete'})
      }
    )
  })

  module.exports = router;
