const mongoose = require('mongoose');
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let editSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    content: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE }
});

let Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;