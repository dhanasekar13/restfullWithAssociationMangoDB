var mongoose = require('mongoose')
var campground = require('./models/camp')

function deletecollection () {
  campground.campground.remove({},function (err, data){
    if(err) { console.log(err) }
    else {
      console.log(data);
    }
  })
}

module.exports = deletecollection
