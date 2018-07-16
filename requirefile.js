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


module.exports = {
  app:app,
  mongoose:mongoose,
  bodyParser:bodyParser,
  campground:campground,
  methodOverride:methodOverride,
  deletedb:deletedb
}
