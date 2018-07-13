var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
  title: String,
  author: String
})

var comment = mongoose.model('Comment', commentSchema)

var campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  posts:[commentSchema]
})
var camp = mongoose.model('Campground1', campSchema)


module.exports = {
  campground : camp,
  comments: comment
}
