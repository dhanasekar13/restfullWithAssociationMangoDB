var express        = require('express')
var app            = express()
var mongoose       = require('mongoose')
var bodyParser     = require('body-Parser')
var campground     = require('./models/camp')
var methodOverride = require('method-override')
var deletedb       = require('./seed')
var LocalStrategy  = require('passport-local')
var User           = require('./models/user')
var passport   = require('passport')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(require('express-session')({
  secret: 'yemp camp secret syncronization',
  resave: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
mongoose.connect('mongodb://localhost/camp')


module.exports = {
  app:        app,
  mongoose:   mongoose,
  bodyParser: bodyParser,
  campground: campground,
  methodOverride:methodOverride,
  deletedb:   deletedb,
  User:       User,
  passport:   passport
}
