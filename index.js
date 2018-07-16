var requirenpm = require('./requirefile')

requirenpm.app.get('/', function (req,resp) {
  resp.redirect('/camp')
})
requirenpm.app.get('/camp',function (req,resp) {
  requirenpm.campground.campground.find({},function (err, data) {
    if(err) {  console.log(err);  }
    else {
      console.log(data);
      resp.render('camphompage', {camp:data})
    }
  })
})
requirenpm.app.get('/camp/new', function (req,resp) {
  resp.render('campnew')
})
requirenpm.app.post('/camp', function (req, resp) {
  console.log(req.body)
  requirenpm.campground.campground.create({
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
requirenpm.app.get('/camp/:id/edit', function (req, resp) {
  requirenpm.campground.campground.findById(req.params.id, function (err,data) {
    if(err) { console.log(err)
    resp.redirect('/camp/'+ req.params.id)
  }
    else {
      console.log(data)
      resp.render('campedit', {camp:data})
    }
  })
})
requirenpm.app.get('/camp/:id', function (req,resp){
  requirenpm.campground.campground.findById(req.params.id).populate('posts').exec(function (err,data) {
    if(err) { console.log(err)
      console.log("0");
    resp.redirect('/camp')
  }
    else {
      console.log(data)
          resp.render('campshow', {camp:data})
    }
  })
})
requirenpm.app.put('/camp/:id', function (req, resp) {
  requirenpm.campground.campground.findByIdAndUpdate(req.params.id, req.body.camp, function (err, data){
    if (err) { console.log(err) }
    else {
      console.log(data)
    }
  })
  resp.redirect('/camp')
})
requirenpm.app.delete('/camp/:id', function (req, resp) {
  requirenpm.campground.campground.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) { console.log(err)}
    else{
      console.log(data)
    }
    resp.redirect('/camp')
  })
})
requirenpm.app.get('/delete/campall', function (req, resp) {
  requirenpm.deletedb()
  resp.redirect('/camp')
})
requirenpm.app.post('/comment', function (req, resp) {
  console.log(req.body)
console.log(req.body.comment.title);
  requirenpm.campground.comments.create({
    title:req.body.comment.title,
    author:req.body.comment.author
  },function (err, data) {
    if (err) { console.log(err) }
    else {
      requirenpm.campground.campground.findById(req.body.comment.id, function (err, values) {
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
requirenpm.app.get('/comment/:id', function (req, resp) {
  requirenpm.campground.comments.findById(req.params.id, function (err,data) {
    if(err) { console.log(err)
      console.log("0");
    resp.redirect('/camp')
  }
    else {
      resp.render('commentshow', {comment:data})
    }
  })
})
requirenpm.app.put('/comment/:id', function (req, resp) {
  requirenpm.campground.comments.findByIdAndUpdate(req.params.id, req.body.comm, function (err, data){
    if (err) { console.log(err) }
    else {
      console.log(data)
    }
  })
  resp.redirect('/camp')
})
requirenpm.app.delete('/comment/:id', function (req, resp) {
  requirenpm.campground.comments.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) { console.log(err)}
    else{
      console.log(data)
    }
    resp.redirect('/camp')
  })
})
requirenpm.app.listen(1234,function (){
  console.log('THE PORT 1234 IS RUNNING THE APPLICATION');
})
