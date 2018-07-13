var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-Parser')
var campground = require('./models/camp')
var methodOverride = require('method-override')
var deletedb = require('./seed')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
mongoose.connect('mongodb://localhost/camp')

app.get('/', function (req,resp) {
  resp.send(' this is the home page ')
})

app.get('/camp',function (req,resp) {
  campground.campground.find({},function (err, data) {
    if(err) {
       console.log(err);
    }
    else {
      console.log(data);
      resp.render('camphompage', {camp:data})
    }
  })
})

app.get('/camp/new', function (req,resp) {
  resp.render('campnew')
})

app.post('/camp', function (req, resp) {
  console.log(req.body)
  campground.campground.create({
    name:req.body.camp.title,
    image:req.body.camp.img,
    description:req.body.camp.des
  },function (err, data) {
    if (err) { console.log(err) }
    else {
      console.log(data)
    }
  })
  resp.redirect('/camp')
})

app.get('/camp/:id/edit', function (req, resp) {
  campground.campground.findById(req.params.id, function (err,data) {
    if(err) { console.log(err)
    resp.redirect('/camp')
  }
    else {
      console.log(data)
      resp.render('campedit', {camp:data})
    }
  })
})
app.get('/camp/:id', function (req,resp){
  campground.campground.findById(req.params.id, function (err,data) {
    if(err) { console.log(err)
      console.log("0");
    resp.redirect('/camp')
  }
    else {
          resp.render('campshow', {camp:data})
    }
  })
})
app.put('/camp/:id', function (req, resp) {
  campground.campground.findByIdAndUpdate(req.params.id, req.body.camp, function (err, data){
    if (err) { console.log(err) }
    else {
      console.log(data)
    }
  })
  resp.redirect('/camp')
})

app.delete('/camp/:id', function (req, resp) {
  campground.campground.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) { console.log(err)}
    else{
      console.log(data)
    }
    resp.redirect('/camp')
  })
})

app.get('/delete/campall', function (req, resp) {
  deletedb()
  resp.redirect('/camp')
})
app.post('/comment', function (req, resp) {
  console.log('------------------------');
  console.log(req.body)
console.log(req.body.comment.title);
  campground.comments.create({
    title:req.body.comment.title,
    author:req.body.comment.author
  },function (err, data) {
    if (err) { console.log(err) }
    else {
      console.log('=====================================================');
      campground.campground.findById(req.body.comment.id, function (err, values) {
        if(err) { console.log(err); }
        else {
          console.log(values)
          values.posts.push(data)
          values.save(function (err, saved){
            if (err) { console.log(err); }
            else {
              resp.redirect('/camp/'+ req.body.comment.id)
            }
          })
        }
      })
    }
  })
})
app.listen(1234,function (){
  console.log('THE PORT 1234 IS RUNNING THE APPLICATION');
})
