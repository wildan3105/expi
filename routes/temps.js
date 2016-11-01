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
  Temp.find(function(err, temps){
    if(err){
      res.send(err)
    }
    console.log(temps)
    res.render('temps-update', {title:'Update temp', temps:temps})
  })
})

router.route('/temps')
  // POST is OK
  .post(function(req,res){
    var temp = new Temp()
    temp.name = req.body.name

    temp.save(function(err){
      if(err){
        res.send(err)
      }
      else {
        res.format({
          json: function(){
            res.send({message: 'Temp created : '+ temp.name})
          },
          html: function(){
            res.send('<p> Status : OK </p><a href="">Back to temps</a>')
          }
        })
      }
    })
  })
  // GET ALL is OK
  .get(function(req,res){
    Temp.find(function(err, temps){
      if(err){
        res.send(err)
      } else {
        console.log(temps)
        res.format({
          json: function(){
            res.json(temps)
          },
          html: function(){
          res.render('temps', {
                  title: 'All temps',
                  temps: temps
              });
          },
        });
      }
    })
  })

// SINGLE GET is OK
router.route('/temps/:temp_id')
  .get(function(req, res){
    Temp.findById(req.params.temp_id, function(err, temp){
      if(err){
        res.send(err)
      } else {
        res.format({
          json: function(){
            res.json(temp)
          },
          html: function(){
            res.render('temp_id', {
              title: 'Individual temp',
              temp:temp
            })
          }
        })
      }
    })
  })

  // UPDATE ONE is
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

  // DELETE ONE is 
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
