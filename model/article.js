const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  price: {type: String, required: true}
});

module.exports = mongoose.model('Article', articleSchema);