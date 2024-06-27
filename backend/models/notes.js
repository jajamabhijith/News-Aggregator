const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// Define the schema for the user notes
const userNotesSchema = mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  notes: [
    {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// Create the model for user notes
const UserNotes = mongoose.model('UserNotes', userNotesSchema);

module.exports = UserNotes;
