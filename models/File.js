const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  filename: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
