var express = require('express')
var app     = express()
var Temp    = require('../models/temp')
var router  = express.Router()

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
            res.redirect('/api/temps')
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

  // UPDATE ONE is OK
  .post(function(req, res){
    Temp.findById(req.params.temp_id, function(err, temp){
      if(err){
        res.send(err)
      } else {
        console.log('update one')
        temp.name = req.body.name;
        temp.save(function(err){
          if(err){
            res.send(err)
          }
          res.format({
            json: function(){
              res.send({message: 'Temp updated : '+ temp.name})
            },
            html: function(){
              res.redirect('/api/temps')
            }
          })
        })
      }
    })
  })

  // DELETE ONE is
  .delete(function(req,res){
    Temp.findById(req.params.temp_id, function(err, temp){
      if(err){
        res.send(err)
      } else {
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
      }
    })
  })

  module.exports = router;
