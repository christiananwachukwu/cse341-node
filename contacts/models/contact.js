const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  favoriteColor: {
    type: String,
    required: [true, 'Favorite color is required']
  },
  birthday: {
    type: String,
    required: [true, 'Birthday is required']
  }
});

module.exports = mongoose.model('Contact', contactSchema);