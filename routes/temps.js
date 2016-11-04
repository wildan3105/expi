var express = require('express')
var app     = express()
var Temp    = require('../models/temp')
var router  = express.Router()

//middleware to use for all requests
// router.use(function(req, res, next){
//   // console out
//   console.log('something is happening')
//   next() // go to next route and not stop here
// })

router.get('/', function(req,res){
  res.json({message: 'Welcome to Simple API!'})
})

router.get('/temps/create', function(req,res){
  res.render('temps-create', {title:'Create temp'})
})

router.use(function(req, res, next){
  // console out
  console.log('something is happening')
  next() // go to next route and not stop here
})

router.route('/temps')
  // POST is OK
  .post(function(req,res){
    var temp = new Temp()
    temp.name     = req.body.name
    temp.category = req.body.category
    temp.safe = req.body.safe

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

// query
router.get('/temp?', function(req,res,next){
  var cat = req.query.category
  var safe = req.query.safe
  if(req.query.category && req.query.safe){
    Temp.find({$and:[{category:cat}, {safe:safe}]}, function(e,f){
      if(e){
        res.send(e)
      }
      res.json(f)
    })
  }
  else if(req.query.category){
    Temp.find({category:cat}, function(e,c){
      if(e){
        res.send(e)
      }
      res.json(c)
    })
  } else if(req.query.safe){
    Temp.find({safe:safe}, function(e,s){
      if(e){
        res.send(e)
      }
      res.json(s)
    })
  } else {
    next()
  }
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
  .put(function(req, res){
    Temp.findById(req.params.temp_id, function(err, temp){
      if(err){
        res.send(err)
      } else {
        console.log('update one')
        temp.name = req.body.name
        temp.category = req.body.category
        temp.safe = req.body.safe
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

  // DELETE ONE is OK
  .delete(function(req,res){
    Temp.remove({
        _id: req.params.temp_id
        },
        function(err, temp){
          if(err){
            res.send(err)
          }
          res.format({
            json: function(){
              res.send({message: 'Temp deleted : '})
            },
            html: function(){
              res.redirect('/api/temps')
            }
          })
        }
      )
  })

  module.exports = router;
